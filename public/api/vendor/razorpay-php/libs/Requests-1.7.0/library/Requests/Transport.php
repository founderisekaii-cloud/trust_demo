<?php
/**
 * Transports a request to a remote server
 *
 * @package Requests
 * @subpackage Transport
 */

/**
 * Transports a request to a remote server
 *
 * @package Requests
 * @subpackage Transport
 */
interface Requests_Transport {
	/**
	 * Send a request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $data Data to send with the request
	 * @param array $options Options for the request
	 * @return string Raw HTTP response
	 */
	public function request($url, $headers = array(), $data = array(), $options = array());

	/**
	 * Check if the transport is valid
	 *
	 * @return boolean True if the transport is valid, false otherwise.
	 */
	public static function test();
}
