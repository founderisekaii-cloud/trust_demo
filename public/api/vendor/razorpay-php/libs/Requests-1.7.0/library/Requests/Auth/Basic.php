<?php
/**
 * Basic Authentication provider
 *
 * @package Requests
 * @subpackage Auth
 */

/**
 * Basic Authentication provider
 *
 * Provides beautiful pictures of ponies for everyone.
 *
 * @package Requests
 * @subpackage Auth
 */
class Requests_Auth_Basic implements Requests_Auth {
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
	 * @param array|null $auth Existing authentication data
	 */
	public function __construct($auth = null) {
		if (is_array($auth)) {
			list($this->user, $this->pass) = $auth;
		}
	}

	/**
	 * Register hooks
	 *
	 * @param Requests_Hooks $hooks Hook system
	 */
	public function register(Requests_Hooks &$hooks) {
		$hooks->register('requests.before_request', array($this, 'before_request'));
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
		$headers['Authorization'] = 'Basic ' . base64_encode($this->user . ':' . $this->pass);
	}
}
