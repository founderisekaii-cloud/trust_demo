<?php
/**
 * Basic HTTP Proxy
 *
 * @package Requests
 * @subpackage Proxy
 */

/**
 * Basic HTTP Proxy
 *
 * @package Requests
 * @subpackage Proxy
 */
class Requests_Proxy_HTTP implements Requests_Proxy, Requests_Auth {
	/**
	 * Proxy host
	 *
	 * @var string
	 */
	public $host;

	/**
	 * Proxy port
	 *
	 * @var integer
	 */
	public $port;

	/**
	 * Username
	 *
	 * @var string
	 */
	public $user;

	/**
	 * Password
	 *
	 * @var string
	 */
	public $pass;

	/**
	 * Constructor
	 *
	 * @param string $proxy Proxy host and port
	 */
	public function __construct($proxy) {
		if (is_array($proxy)) {
			$this->host = $proxy[0];
			$this->port = $proxy[1];
		}
		else {
			$parts = parse_url($proxy);
			$this->host = $parts['host'];
			if (isset($parts['port'])) {
				$this->port = $parts['port'];
			}
			else {
				$this->port = 8080;
			}
		}
	}

	/**
	 * Register hooks
	 *
	 * @param Requests_Hooks $hooks Hook system
	 */
	public function register(Requests_Hooks &$hooks) {
		// Do nothing, handled by transport
	}

	/**
	 * Set the authentication details
	 *
	 * @param string $user
	 * @param string $pass
	 */
	public function set_auth($user, $pass) {
		$this->user = $user;
		$this->pass = $pass;
	}

	/**
	 * Add authentication to the request
	 *
	 * @param string $url
	 * @param array $headers
	 * @param array $data
	 * @param string $type
	 * @param array $options
	 */
	public function before_request(&$url, &$headers, &$data, &$type, &$options) {
		$headers['Proxy-Authorization'] = 'Basic ' . base64_encode($this->user . ':' . $this->pass);
	}
}
