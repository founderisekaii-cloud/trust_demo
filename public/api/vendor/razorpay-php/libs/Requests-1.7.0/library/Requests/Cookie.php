<?php
/**
 * Cookie object
 *
 * @package Requests
 * @subpackage Cookies
 */

/**
 * Cookie object
 *
 * @package Requests
 * @subpackage Cookies
 */
class Requests_Cookie {
	/**
	 * Cookie name.
	 *
	 * @var string
	 */
	public $name;

	/**
	 * Cookie value.
	 *
	 * @var string
	 */
	public $value;

	/**
	 * Cookie attributes
	 *
	 * @var Requests_Utility_CaseInsensitiveDictionary|null
	 */
	public $attributes;

	/**
	 * Reference time for relative calculations
	 *
	 * @var int
	 */
	public static $reference_time = null;

	/**
	 * Create a new cookie object
	 *
	 * @param string $name
	 * @param string $value
	 * @param array|Requests_Utility_CaseInsensitiveDictionary $attributes
	 */
	public function __construct($name, $value, $attributes = array()) {
		$this->name = $name;
		$this->value = $value;
		$this->attributes = new Requests_Utility_CaseInsensitiveDictionary($attributes);

		if (self::$reference_time === null) {
			self::$reference_time = time();
		}
	}

	/**
	 * Check if a cookie is valid for a given URI
	 *
	 * @param Requests_IRI $uri
	 * @return boolean
	 */
	public function is_valid_for_uri($uri) {
		if (!$this->domain_matches($uri->host)) {
			return false;
		}

		if (!$this->path_matches($uri->path)) {
			return false;
		}

		if ($this->attributes->offsetExists('secure') && $uri->scheme !== 'https') {
			return false;
		}

		return true;
	}

	/**
	 * Check if a cookie has expired.
	 *
	 * @return boolean True if the cookie is expired, false otherwise.
	 */
	public function is_expired() {
		// RFC6265 S. 4.1.2.2 The expires-av
		// If a cookie has both the Max-Age and the Expires attribute, the Max-
		// Age attribute has precedence and controls the expiration date of the
		// cookie.
		if ($this->attributes->offsetExists('max-age')) {
			$max_age = $this->attributes['max-age'];
			if (is_numeric($max_age)) {
				return (int) $max_age < 0 || (int) $max_age < (self::$reference_time - $this->get_creation_time());
			}
		}

		if ($this->attributes->offsetExists('expires')) {
			$expires = $this->attributes['expires'];
			if (is_numeric($expires)) {
				return (int) $expires < self::$reference_time;
			}
			else {
				return strtotime($expires) < self::$reference_time;
			}
		}

		return false;
	}

	/**
	 * Check if a cookie's domain matches a host
	 *
	 * @param string $host Host to check
	 * @return boolean
	 */
	public function domain_matches($string) {
		if (! $this->attributes->offsetExists('domain')) {
			// No domain, so it's always a match
			return true;
		}

		$domain_string = $this->attributes['domain'];
		if ($domain_string === $string) {
			return true;
		}

		// Check for subdomains
		// A . in front of the domain is superfluous, remove it
		if (substr($domain_string, 0, 1) === '.') {
			$domain_string = substr($domain_string, 1);
		}
		return (substr($string, -strlen($domain_string)) === $domain_string);
	}

	/**
	 * Check if a cookie's path matches a path
	 *
	 * @param string $path Path to check
	 * @return boolean
	 */
	public function path_matches($request_path) {
		if (empty($request_path)) {
			$request_path = '/';
		}
		if (!$this->attributes->offsetExists('path')) {
			// No path, so it's always a match
			return true;
		}

		$cookie_path = $this->attributes['path'];

		if ($cookie_path === $request_path) {
			return true;
		}
		if (strpos($request_path, $cookie_path) !== 0) {
			return false;
		}
		if (substr($cookie_path, -1) !== '/') {
			$cookie_path .= '/';
		}
		if (substr($request_path, strlen($cookie_path), 1) !== '/') {
			return true;
		}

		return true;
	}

	/**
	 * Get the creation time for the cookie
	 *
	 * @return int
	 */
	protected function get_creation_time() {
		if ($this->attributes->offsetExists('creation-time')) {
			return (int) $this->attributes['creation-time'];
		}

		return (int) self::$reference_time;
	}

	/**
	 * Format a cookie for a Cookie header
	 *
	 * @return string
	 */
	public function format() {
		return $this->name . '=' . $this->value;
	}

	/**
	 * Parse a cookie string (e.g. returned in a `Set-Cookie` header)
	 *
	 * @param string $string
	 * @return Requests_Cookie
	 */
	public static function parse($string, $name = '', $reference_time = null) {
		$parts = explode(';', $string);
		if (strpos($parts[0], '=') === false) {
			// Does not have key-value separator, probably not a valid cookie
			// (and would be a pain to parse)
			throw new Requests_Exception('Invalid cookie value', 'cookie.invalid');
		}
		list($name, $value) = explode('=', array_shift($parts), 2);
		$name = trim($name);
		$value = trim($value);

		$attributes = array();

		foreach ($parts as $part) {
			$part = trim($part);
			if (strpos($part, '=') === false) {
				$key = $part;
				$part_value = true;
			}
			else {
				list($key, $part_value) = explode('=', $part, 2);
				$key = trim($key);
				$part_value = trim($part_value);
			}

			$attributes[$key] = $part_value;
		}

		if ($reference_time !== null) {
			$attributes['creation-time'] = $reference_time;
		}
		elseif (self::$reference_time !== null) {
			$attributes['creation-time'] = self::$reference_time;
		}

		return new Requests_Cookie($name, $value, $attributes);
	}

	/**
	 * Parse all `Set-Cookie` headers from a response
	 *
	 * @param Requests_Response_Headers $headers
	 * @return array
	 */
	public static function parse_from_headers(Requests_Response_Headers $headers) {
		$cookies = array();
		$cookie_headers = $headers->getValues('Set-Cookie');

		if (empty($cookie_headers)) {
			return $cookies;
		}

		foreach ($cookie_headers as $header) {
			try {
				$cookie = self::parse($header, '', $headers->getDate());
				$cookies[$cookie->name] = $cookie;
			}
			catch (Requests_Exception $e) {
				// Ignore invalid cookies
			}
		}

		return $cookies;
	}

	/**
	 * Get the cookie value.
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->value;
	}
}
