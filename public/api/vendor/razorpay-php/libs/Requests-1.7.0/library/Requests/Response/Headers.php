<?php
/**
 * Case-insensitive dictionary, suitable for HTTP headers
 *
 * @package Requests
 * @subpackage Utilities
 */

/**
* Case-insensitive dictionary, suitable for HTTP headers
*
* @package Requests
* @subpackage Utilities
*/
class Requests_Response_Headers extends Requests_Utility_CaseInsensitiveDictionary {
	protected $status_code = null;
	protected $protocol_version = null;
	/**
	 * Parse a header string into an array
	 *
	 * @param string $headers
	 */
	public function parse($headers) {
		$this->data = array();
		$headers = preg_split('/\\r\\n/', $headers);
		$this->parse_status_header(array_shift($headers));
		foreach ($headers as $header) {
			if (strpos($header, ':') === false) {
				continue;
			}

			list($key, $value) = explode(':', $header, 2);
			$value = trim($value);
			$this->offsetSet($key, $value);
		}
	}

	protected function parse_status_header($header) {
		if (preg_match('/^HTTP\/(\d\.\d)\s*(\d+)\s*(.*)/i', $header, $matches)) {
			$this->protocol_version = (float) $matches[1];
			$this->status_code = (int) $matches[2];
		}
	}

	/**
	 * Get the status code from the headers
	 *
	 * @return integer|boolean Status code, or false if not set
	 */
	public function get_status_code() {
		return $this->status_code;
	}

	/**
	 * Get the protocol version from the headers
	 *
	 * @return integer|boolean Protocol version, or false if not set
	 */
	public function get_protocol_version() {
		return $this->protocol_version;
	}
}
