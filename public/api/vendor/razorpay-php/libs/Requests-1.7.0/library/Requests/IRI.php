<?php
/**
 * IRI
 *
 * @package Requests
 * @subpackage Utilities
 */

/**
 * IRI
 *
 * @package Requests
 * @subpackage Utilities
 */
class Requests_IRI {
	/**
	 * Scheme
	 *
	 * @var string
	 */
	public $scheme;

	/**
	 * User Information
	 *
	 * @var string
	 */
	public $iuserinfo;

	/**
	 * Host
	 *
	 * @var string
	 */
	public $ihost;

	/**
	 * Port
	 *
	 * @var int
	 */
	public $port;

	/**
	 * Path
	 *
	 * @var string
	 */
	public $ipath = '';

	/**
	 * Query
	 *
	 * @var string
	 */
	public $iquery;

	/**
	 * Fragment
	 *
	 * @var string
	 */
	public $ifragment;

	/**
	 * ASCII-safe host
	 *
	 * @var string
	 */
	protected $host;

	/**
	 * Is the URI a normal one? (not an IRI)
	 *
	 * @var boolean
	 */
	protected $is_normal = false;

	/**
	 * Create a new IRI object
	 *
	 * @param string $iri
	 */
	public function __construct($iri = null) {
		if ($iri !== null) {
			$this->parse($iri);
		}
	}

	public function __toString() {
		return $this->get_uri();
	}

	/**
	 * Parse an IRI into properties
	 *
	 * @param string $iri
	 */
	protected function parse($iri) {
		$parts = self::parse_uri($iri);

		if ($parts === false) {
			throw new Requests_Exception('Unable to parse URI', 'iri.unable_to_parse');
		}

		$this->scheme = isset($parts['scheme']) ? $parts['scheme'] : null;
		$this->iuserinfo = isset($parts['user']) ? $parts['user'] : null;
		$this->ihost = isset($parts['host']) ? $parts['host'] : null;
		$this->port = isset($parts['port']) ? $parts['port'] : null;
		$this->ipath = isset($parts['path']) ? $parts['path'] : null;
		$this->iquery = isset($parts['query']) ? $parts['query'] : null;
		$this->ifragment = isset($parts['fragment']) ? $parts['fragment'] : null;
	}

	/**
	 * Get the full URI
	 *
	 * @return string
	 */
	public function get_uri() {
		$uri = '';
		if ($this->scheme !== null) {
			$uri .= $this->scheme . ':';
		}
		$authority = $this->get_iauthority();
		if ($authority !== null) {
			$uri .= '//' . $authority;
		}

		if ($this->ipath !== null) {
			$uri .= $this->ipath;
		}

		if ($this->iquery !== null) {
			$uri .= '?' . $this->iquery;
		}

		if ($this->ifragment !== null) {
			$uri .= '#' . $this->ifragment;
		}

		return $uri;
	}

	/**
	 * Get the authority part of the URI
	 *
	 * @return string
	 */
	public function get_iauthority() {
		$authority = '';
		if ($this->iuserinfo !== null) {
			$authority .= $this->iuserinfo . '@';
		}

		if ($this->ihost !== null) {
			$authority .= $this->ihost;
		}

		if ($this->port !== null) {
			$authority .= ':' . $this->port;
		}
		return $authority;
	}

	/**
	 * Get the host
	 *
	 * @param boolean $encoded Should the host be punycode-encoded?
	 * @return string
	 */
	public function get_host($encoded = true) {
		if ($this->host === null) {
			$this->host = $this->ihost;
			if ($encoded) {
				$this->host = self::punycode_encode($this->ihost);
			}
		}

		return $this->host;
	}

	/**

	 * RFC3986-compliant parse_url replacement
	 *
	 * @param string $uri
	 * @return array
	 */
	protected static function parse_uri($uri) {
		$uri = (string) $uri;
		$parts = array();
		preg_match('!^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?!', $uri, $matches);
		if (!empty($matches[2])) {
			$parts['scheme'] = strtolower($matches[2]);
		}
		if (!empty($matches[4])) {
			$authority = $matches[4];
			preg_match('!^([^@]*@)?([^:]*)(:.*)?!', $authority, $matches_authority);
			if (!empty($matches_authority[1])) {
				$parts['user'] = rtrim($matches_authority[1], '@');
			}
			if (!empty($matches_authority[2])) {
				$parts['host'] = $matches_authority[2];
			}
			if (!empty($matches_authority[3])) {
				$parts['port'] = (int) substr($matches_authority[3], 1);
			}
		}
		if (!empty($matches[5])) {
			$parts['path'] = $matches[5];
		}
		if (!empty($matches[7])) {
			$parts['query'] = $matches[7];
		}
		if (!empty($matches[9])) {
			$parts['fragment'] = $matches[9];
		}
		return $parts;
	}

	/**
	 * Punycode-encode a host
	 *
	 * @param string $host
	 * @return string
	 */
	protected static function punycode_encode($host) {
		if (preg_match('/[^a-zA-Z0-9-.]/', $host)) {
			if (defined('INTL_IDNA_VARIANT_UTS46')) {
				return idn_to_ascii($host, 0, INTL_IDNA_VARIANT_UTS46);
			}
			elseif (defined('INTL_IDNA_VARIANT_2003')) {
				return idn_to_ascii($host, 0, INTL_IDNA_VARIANT_2003);
			}
			elseif (function_exists('idn_to_ascii')) {
				return idn_to_ascii($host);
			}
			else {
				throw new Requests_Exception('idna_to_ascii requires the intl extension, which is not installed', 'idna.no_extension');
			}
		}

		return $host;
	}

	/**
	 * Absolutize a URI
	 *
	 * @param Requests_IRI|string $base
	 * @param Requests_IRI|string $relative
	 * @return Requests_IRI
	 */
	public static function absolutize($base, $relative) {
		if (!($relative instanceof Requests_IRI)) {
			$relative = new Requests_IRI($relative);
		}

		if (!empty($relative->scheme)) {
			return $relative;
		}

		if (!($base instanceof Requests_IRI)) {
			$base = new Requests_IRI($base);
		}

		$iri = new Requests_IRI();
		$iri->scheme = $base->scheme;
		if ($relative->get_iauthority() !== null) {
			$iri->iuserinfo = $relative->iuserinfo;
			$iri->ihost = $relative->ihost;
			$iri->port = $relative->port;
			$iri->ipath = self::remove_dot_segments($relative->ipath);
			$iri->iquery = $relative->iquery;
		}
		else {
			$iri->iuserinfo = $base->iuserinfo;
			$iri->ihost = $base->ihost;
			$iri->port = $base->port;
			if ($relative->ipath !== null && $relative->ipath !== '') {
				if ($relative->ipath[0] === '/') {
					$iri->ipath = self::remove_dot_segments($relative->ipath);
				}
				else {
					$path = $base->ipath;
					if (strpos($path, '/') !== false) {
						$path = substr($path, 0, strrpos($path, '/') + 1);
					}
					else {
						$path = '';
					}
					$path .= $relative->ipath;

					$iri->ipath = self::remove_dot_segments($path);
				}
				$iri->iquery = $relative->iquery;
			}
			else {
				$iri->ipath = $base->ipath;
				if ($relative->iquery !== null) {
					$iri->iquery = $relative->iquery;
				}
				else {
					$iri->iquery = $base->iquery;
				}
			}
		}
		$iri->ifragment = $relative->ifragment;
		return $iri;
	}

	/**
	 * Remove dot segments from a path
	 *
	 * @see http://tools.ietf.org/html/rfc3986#section-5.2.4
	 * @param string $path
	 * @return string
	 */
	protected static function remove_dot_segments($path) {
		$output = '';
		while (!empty($path)) {
			// A) If the input buffer begins with a prefix of "../" or "./", then remove that prefix from the input buffer
			if (strncmp($path, '../', 3) === 0) {
				$path = substr($path, 3);
				continue;
			}
			if (strncmp($path, './', 2) === 0) {
				$path = substr($path, 2);
				continue;
			}

			// B) if the input buffer begins with a prefix of "/./" or "/.",
			// where "." is a complete path segment, then replace that prefix
			// with "/" in the input buffer; otherwise,
			if ($path === '/.' || $path === '.') {
				$path = '/';
				continue;
			}
			if (strncmp($path, '/./', 3) === 0) {
				$path = '/' . substr($path, 3);
				continue;
			}

			// C) if the input buffer begins with a prefix of "/../" or "/..",
			// where ".." is a complete path segment, then replace that prefix
			// with "/" in the input buffer and remove the last segment and its
			// preceding "/" (if any) from the output buffer; otherwise,
			if ($path === '/..' || $path === '..') {
				$path = '/';
				$output = substr($output, 0, strrpos($output, '/'));
				continue;
			}
			if (strncmp($path, '/../', 4) === 0) {
				$path = '/' . substr($path, 4);
				$output = substr($output, 0, strrpos($output, '/'));
				continue;
			}

			// D) if the input buffer consists only of "." or "..", then remove
			// that from the input buffer; otherwise,
			// (handled above)

			// E) move the first path segment in the input buffer to the end of
			// the output buffer, including the initial "/" character (if
			// any) and any subsequent characters up to, but not including,
			// the next "/" character or the end of the input buffer.
			if ($path[0] === '/') {
				$has_slash = true;
				$path = substr($path, 1);
			}
			else {
				$has_slash = false;
			}
			$next_slash = strpos($path, '/');
			if ($next_slash === false) {
				$segment = $path;
				$path = '';
			}
			else {
				$segment = substr($path, 0, $next_slash);
				$path = substr($path, $next_slash);
			}

			if ($has_slash) {
				$output .= '/';
			}
			$output .= $segment;
		}

		return $output;
	}
}
