<?php
/**
 * cURL-based transport
 *
 * @package Requests
 * @subpackage Transport
 */

/**
 * cURL-based transport
 *
 * @package Requests
 * @subpackage Transport
 */
class Requests_Transport_cURL implements Requests_Transport {
	/**
	 * Raw cURL output
	 *
	 * @var string
	 */
	public $response_data;

	/**
	 * Raw cURL headers
	 *
	 * @var string
	 */
	public $response_headers;

	/**
	 * Information on the current request
	 *
	 * @var array cURL information array
	 */
	public $info;

	/**
	 * cURL version data
	 *
	 * @var array
	 */
	protected $version;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->version = curl_version();
	}

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
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$this->set_defaults($ch);

		if ($options['filename'] !== false) {
			$fp = fopen($options['filename'], 'wb');
			curl_setopt($ch, CURLOPT_FILE, $fp);
		}

		if (is_array($data) && !empty($data)) {
			// If we're a POST/PUT/PATCH request, but we have no data, just send it
			// as a GET request.
			switch ($options['type']) {
				case Requests_Transport_POST:
					curl_setopt($ch, CURLOPT_POST, true);
					break;
				case Requests_Transport_PUT:
				case Requests_Transport_PATCH:
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $options['type']);
					break;
			}
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		}
		elseif ($options['type'] !== Requests_Transport_GET) {
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $options['type']);
		}

		if (!empty($headers)) {
			$headers = self::format_get_headers($headers);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		}

		if ($options['blocking'] === false) {
			curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1);
		}
		else {
			curl_setopt($ch, CURLOPT_TIMEOUT, $options['timeout']);
		}
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $options['connect_timeout']);
		curl_setopt($ch, CURLOPT_REFERER, $url);
		curl_setopt($ch, CURLOPT_AUTOREFERER, true);

		// Handle the proxy option
		if ($options['proxy'] instanceof Requests_Proxy) {
			curl_setopt($ch, CURLOPT_PROXY, $options['proxy']->host);
			curl_setopt($ch, CURLOPT_PROXYPORT, $options['proxy']->port);

			if ($options['proxy']->user && $options['proxy']->pass) {
				curl_setopt($ch, CURLOPT_PROXYAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_PROXYUSERPWD, $options['proxy']->user . ':' . $options['proxy']->pass);
			}
		}

		// Handle the authentication option
		if ($options['auth'] !== false) {
			list($user, $pass) = $options['auth'];
			curl_setopt($ch, CURLOPT_USERPWD, $user . ':' . $pass);
		}

		if ($this->version['features'] & CURL_VERSION_SSL) {
			if ($options['verify'] === false) {
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			}
			else {
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

				if (is_string($options['verify'])) {
					curl_setopt($ch, CURLOPT_CAINFO, $options['verify']);
				}
			}

			if ($options['verifyname'] === false) {
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			}
		}

		$this->response_data = curl_exec($ch);

		if (curl_errno($ch) === 23 || curl_errno($ch) === 61) {
			// In cURL 7.10.6, error 23 is "Failed writing received data to disk/application"
			// In cURL 7.16.2, error 23 is "The server understood the request, but cannot fulfill it"
			// In cURL 7.10.6, error 61 is "Unrecognized transfer encoding"
			// Both are typically caused by a server sending an empty body with a Content-Encoding header.
			// The simplest solution is to retry with Zlib support disabled.
			curl_setopt($ch, CURLOPT_ENCODING, '');
			$this->response_data = curl_exec($ch);
		}

		$this->info = curl_getinfo($ch);

		if ($this->response_data === false) {
			throw new Requests_Exception_Transport(curl_error($ch), Requests_Exception_Transport_cURL::EASY);
		}

		$this->process_response($this->response_data, $options);

		curl_close($ch);
		if ($options['filename'] !== false) {
			fclose($fp);
			return '';
		}

		return $this->response_data;
	}

	/**
	 * Send multiple requests simultaneously
	 *
	 * @param array $requests Request data
	 * @param array $options Global options
	 * @return array Array of Requests_Response objects
	 */
	public function request_multiple($requests, $options) {
		$subrequests = array();
		$mh = curl_multi_init();
		// The master handles
		$master = array();

		foreach ($requests as $id => $request) {
			$ch = curl_init();
			$this->set_defaults($ch);

			$url = $request['url'];
			curl_setopt($ch, CURLOPT_URL, $url);

			if (is_array($request['data']) && !empty($request['data'])) {
				// If we're a POST/PUT/PATCH request, but we have no data, just send it
				// as a GET request.
				switch ($request['type']) {
					case Requests_Transport_POST:
						curl_setopt($ch, CURLOPT_POST, true);
						break;
					case Requests_Transport_PUT:
					case Requests_Transport_PATCH:
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $request['type']);
						break;
				}
				curl_setopt($ch, CURLOPT_POSTFIELDS, $request['data']);
			}
			elseif ($request['type'] !== Requests_Transport_GET) {
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $request['type']);
			}

			if (!empty($request['headers'])) {
				$headers = self::format_get_headers($request['headers']);
				curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			}

			curl_setopt($ch, CURLOPT_TIMEOUT, $options['timeout']);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $options['connect_timeout']);
			curl_setopt($ch, CURLOPT_REFERER, $url);
			curl_setopt($ch, CURLOPT_AUTOREFERER, true);

			curl_setopt($ch, CURLOPT_HEADER, true);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

			if ($this->version['features'] & CURL_VERSION_SSL) {
				if ($request['options']['verify'] === false) {
					curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				}
				else {
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
					curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

					if (is_string($request['options']['verify'])) {
						curl_setopt($ch, CURLOPT_CAINFO, $request['options']['verify']);
					}
				}

				if ($request['options']['verifyname'] === false) {
					curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
				}
			}

			curl_multi_add_handle($mh, $ch);
			$master[$id] = $ch;
		}

		$running = null;
		//execute the handles
		do {
			curl_multi_exec($mh, $running);
			// Under CPanel, this can be a problem, so we need to avoid it.
			// See https://github.com/rmccue/Requests/issues/139
			if (isset($options['CPanel_fix'])) {
				usleep(100);
			}
		} while($running > 0);

		$completed = array();
		foreach ($master as $id => $ch) {
			$data = curl_multi_getcontent($ch);
			if (curl_errno($ch) === 23 || curl_errno($ch) === 61) {
				// In cURL 7.10.6, error 23 is "Failed writing received data to disk/application"
				// In cURL 7.16.2, error 23 is "The server understood the request, but cannot fulfill it"
				// In cURL 7.10.6, error 61 is "Unrecognized transfer encoding"
				// Both are typically caused by a server sending an empty body with a Content-Encoding header.
				// The simplest solution is to retry with Zlib support disabled.
				curl_setopt($ch, CURLOPT_ENCODING, '');
				do {
					curl_multi_exec($mh, $running);
					usleep(100);
				} while($running > 0);
				$data = curl_multi_getcontent($ch);
			}
			if ($data === false || $data === '') {
				$completed[$id] = new Requests_Exception_Transport(curl_error($ch), Requests_Exception_Transport_cURL::MULTI);
			}
			else {
				$this->process_response($data, $requests[$id]['options']);
				$completed[$id] = $this->response_data;
			}
			curl_multi_remove_handle($mh, $ch);
			curl_close($ch);
		}

		curl_multi_close($mh);
		return $completed;
	}

	/**
	 * Set the default cURL options
	 *
	 * @param cURL handle $ch
	 */
	protected function set_defaults(&$ch) {
		// Needs to be enabled for a reason I forget
		// See https://github.com/rmccue/Requests/commit/40d43764b18f88722c1d19813c4174304859a6d0
		curl_setopt($ch, CURLOPT_ENCODING, '');
	}

	/**
	 * Process a response
	 *
	 * @param string $response Raw response data
	 * @param array $options
	 */
	protected function process_response(&$response, $options) {
		if ($options['blocking'] === false) {
			$this->response_data = '';
			return;
		}

		if ($options['filename'] !== false) {
			$this->response_data = $response;
		}
	}

	/**
	 * Check if the transport is valid
	 *
	 * @return boolean True if the transport is valid, false otherwise.
	 */
	public static function test() {
		return function_exists('curl_init');
	}

	/**
	 * Format headers for use with cURL
	 *
	 * @param array $headers
	 * @return array
	 */
	protected static function format_get_headers($headers) {
		$return = array();
		foreach ($headers as $key => $value) {
			$return[] = $key . ': ' . $value;
		}
		return $return;
	}

	/**
	 * Does this transport support multiple requests?
	 *
	 * @return boolean
	 */
	public function supports($feature) {
		if ($feature === 'request_multiple') {
			return true;
		}

		return false;
	}
}
