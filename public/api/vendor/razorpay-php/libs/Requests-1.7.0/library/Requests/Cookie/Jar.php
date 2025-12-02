<?php
/**
 * Cookie Jar object
 *
 * @package Requests
 * @subpackage Cookies
 */

/**
 * Cookie Jar object
 *
 * @package Requests
 * @subpackage Cookies
 */
class Requests_Cookie_Jar implements ArrayAccess, IteratorAggregate {
	/**
	 * Actual cookies
	 *
	 * @var array
	 */
	protected $cookies = array();

	/**
	 * Create a new cookie jar
	 *
	 * @param array $cookies Existing cookie values
	 */
	public function __construct($cookies = array()) {
		$this->cookies = $cookies;
	}

	/**
	 * Get the cookie jar's iterator
	 *
	 * @return ArrayIterator
	 */
	public function getIterator() {
		return new ArrayIterator($this->cookies);
	}

	/**
	 * Set a cookie
	 *
	 * @param string|Requests_Cookie $name
	 * @param string $value
	 */
	public function offsetSet($name, $value) {
		if ($name instanceof Requests_Cookie) {
			$this->cookies[$name->name] = $name;
			return;
		}
		$this->cookies[$name] = $value;
	}

	/**
	 * Check if a cookie exists
	 *
	 * @param string $name
	 * @return boolean
	 */
	public function offsetExists($name) {
		return isset($this->cookies[$name]);
	}

	/**
	 * Unset a cookie
	 *
	 * @param string $name
	 */
	public function offsetUnset($name) {
		unset($this->cookies[$name]);
	}

	/**
	 * Get a cookie
	 *
	 * @param string $name
	 * @return string|null
	 */
	public function offsetGet($name) {
		if (isset($this->cookies[$name]))
			return $this->cookies[$name];

		return null;
	}

	/**
	 * Register the cookie handler with the request's hooking system
	 *
	 * @param Requests_Hooks $hooks
	 */
	public function register(Requests_Hooks &$hooks) {
		$hooks->register('requests.before_request', array(&$this, 'before_request'));
		$hooks->register('requests.after_request', array(&$this, 'after_request'));
	}

	/**
	 * Add Cookie header to a request
	 *
	 * @param string $url
	 * @param array $headers
	 * @param array $data
	 * @param string $type
	 * @param array $options
	 */
	public function before_request($url, &$headers, $data, $type, $options) {
		if ($this->cookies) {
			$uri = new Requests_IRI($url);
			$cookies = array();
			foreach ($this->cookies as $cookie) {
				if ($cookie instanceof Requests_Cookie && !$cookie->is_expired() && $cookie->is_valid_for_uri($uri)) {
					$cookies[] = $cookie->format();
				}
				elseif (is_array($cookie)) {
					$cookies[] = $cookie['name'] . '=' . $cookie['value'];
				}
				else {
					$cookies[] = (string) $cookie;
				}
			}
			$headers['Cookie'] = implode('; ', $cookies);
		}
	}

	/**
	 * Parse cookies from a response
	 *
	 * @param Requests_Response $response
	 */
	public function after_request(Requests_Response &$response) {
		$cookies = Requests_Cookie::parse_from_headers($response->headers);
		$this->cookies = array_merge($this->cookies, $cookies);
	}
}
