<?php
/**
 * Response object
 *
 * @package Requests
 * @subpackage Response
 */

/**
 * Response object
 *
 * @package Requests
 * @subpackage Response
 */
class Requests_Response {
	/**
	 * Response body
	 *
	 * @var string
	 */
	public $body = '';

	/**
	 * Raw HTTP data
	 *
	 * @var string
	 */
	public $raw = '';

	/**
	 * Headers, as an associative array
	 *
	 * @var Requests_Response_Headers
	 */
	public $headers = array();

	/**
	 * Status code, false if no status code was set
	 *
	 * @var integer|boolean
	 */
	public $status_code = false;

	/**
	 * Protocol version, false if no version was set
	 *
	 * @var float|boolean
	 */
	public $protocol_version = false;

	/**
	 * Whether the request was successful
	 *
	 * @var boolean
	 */
	public $success = false;

	/**
	 * URL requested
	 *
	 * @var string
	 */
	public $url = '';

	/**
	 * Previous requests (from redirects)
	 *
	 * @var array Array of Requests_Response objects
	 */
	public $history = array();

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->headers = new Requests_Response_Headers();
	}

	/**
	 * Throws an exception if the request was not successful
	 *
	 * @param boolean $allow_redirects Set to false to not allow redirects
	 * @throws Requests_Exception On non-successful status code
	 */
	public function throw_for_status($allow_redirects = true) {
		if ($this->status_code >= 400) {
			if (!$allow_redirects || !$this->is_redirect()) {
				throw new Requests_Exception_HTTP($this->status_code);
			}
		}
	}

	/**
	 * Is the response a redirect?
	 *
	 * @return boolean
	 */
	public function is_redirect() {
		return in_array($this->status_code, array(300, 301, 302, 303, 307));
	}
}
