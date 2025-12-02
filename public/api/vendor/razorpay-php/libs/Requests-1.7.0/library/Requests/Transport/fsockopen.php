<?php
/**
 * fsockopen-based transport
 *
 * @package Requests
 * @subpackage Transport
 */

/**
 * fsockopen-based transport
 *
 * @package Requests
 * @subpackage Transport
 */
class Requests_Transport_fsockopen implements Requests_Transport {
	/**
	 * Send a request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $data Data to send with the request
	 * @param array $options Options for the request
	 * @return string Raw HTTP response
	 */
	public function request($url, $headers = array(), $data = array(), $options = array()) {
		$parts = parse_url($url);
		$host = $parts['host'];
		$port = 80;
		$path = '/';

		if (isset($parts['port'])) {
			$port = $parts['port'];
		}
		if (isset($parts['path'])) {
			$path = $parts['path'];
		}

		// Add query string to path
		if (isset($parts['query'])) {
			$path .= '?' . $parts['query'];
		}

		if (strtolower($parts['scheme']) === 'https') {
			$host = 'ssl://' . $host;
			$port = 443;
		}

		// Need to support CURL-style timeouts
		$timeout = $options['timeout'] / 1000;

		$fp = @fsockopen($host, $port, $errno, $errstr, $timeout);
		if (!$fp) {
			throw new Requests_Exception_Transport($errstr, Requests_Exception_Transport_fsockopen::SOCKET_ERROR, null, $errno);
		}

		$request_body = '';
		if (is_array($data)) {
			$request_body = http_build_query($data);
		}
		else {
			$request_body = $data;
		}

		$request = "$options[type] $path HTTP/$options[protocol_version]\r\n";
		$request .= 'Host: ' . $parts['host'] . "\r\n";
		foreach ($headers as $key => $value) {
			$request .= "$key: $value\r\n";
		}
		if ($options['type'] !== Requests_Transport_GET) {
			$request .= 'Content-Length: ' . strlen($request_body) . "\r\n";
		}
		$request .= "Connection: Close\r\n";
		$request .= "\r\n";
		$request .= $request_body;
		fwrite($fp, $request);

		if ($options['filename']) {
			$fp_write = fopen($options['filename'], 'wb');
			$header = '';
			while (!feof($fp)) {
				$this->read_headers($fp, $header);
				$this->read_body($fp, $fp_write, -1);
			}
			fclose($fp_write);
		}
		else {
			$response = '';
			while (!feof($fp)) {
				$response .= fread($fp, 1160);
			}
		}
		fclose($fp);
		return $response;
	}

	protected function read_headers($fp, &$headers) {
		$got_space = false;
		$header = '';
		while (($line = fgets($fp, 1160)) !== false) {
			if ($line === "\r\n") {
				break;
			}
			$headers .= $line;
		}
	}

	protected function read_body($fp, $fp_write, $content_length) {
		$body = '';
		if ($content_length > 0) {
			while (strlen($body) < $content_length) {
				$body .= fread($fp, $content_length - strlen($body));
			}
			fwrite($fp_write, $body);
		}
		return $body;
	}

	/**
	 * Check if the transport is valid
	 *
	 * @return boolean True if the transport is valid, false otherwise.
	 */
	public static function test() {
		return function_exists('fsockopen');
	}

	/**
	 * Does this transport support multiple requests?
	 *
	 * @return boolean
	 */
	public function supports($feature) {
		if ($feature === 'request_multiple') {
			return false;
		}

		return false;
	}
}
