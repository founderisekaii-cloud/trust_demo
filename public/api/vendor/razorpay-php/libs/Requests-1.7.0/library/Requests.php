<?php
/**
 * Requests for PHP
 *
 * Inspired by Requests for Python.
 *
 * @package Requests
 */

/**
 * Requests for PHP
 *
 * Inspired by Requests for Python.
 *
 * @package Requests
 */
class Requests {
	/**
	 * POST'd data in {@see get} and {@see request} will be sent as `multipart/form-data`.
	 *
	 * @var string
	 */
	const FORM = 'application/x-www-form-urlencoded';

	/**
	 * POST'd data in {@see get} and {@see request} will be sent as `application/json`.
	 *
	* @var string
	 */
	const JSON = 'application/json';

	/**
	 * Current version of Requests
	 *
	 * @var string
	 */
	const VERSION = '1.7.0';

	/**
	 * Registered transport classes
	 *
	 * @var array
	 */
	protected static $transports = array();

	/**
	 * Selected transport name
	 *
	 * @var string
	 */
	protected static $transport = '';

	/**
	 * This is a static class, do not instantiate it
	 *
	 * @codeCoverageIgnore
	 */
	private function __construct() {}

	/**
	 * Autoloader for Requests
	 *
	 * @param string $class Class name
	 */
	public static function autoloader($class) {
		// Check that the class starts with "Requests"
		if (strpos($class, 'Requests_') !== 0) {
			return;
		}

		$file = str_replace('_', '/', $class);
		if (file_exists(__DIR__ . '/' . $file . '.php')) {
			require_once(__DIR__ . '/' . $file . '.php');
		}
	}

	/**
	 * Register the autoloader
	 */
	public static function register_autoloader() {
		spl_autoload_register(array('Requests', 'autoloader'));
	}

	/**
	 * Get a transport, based on a given string
	 *
	 * @param string $transport Transport name
	 * @return Requests_Transport
	 */
	protected static function get_transport($transport = '') {
		if (!empty(self::$transport) && empty($transport)) {
			$transport = self::$transport;
		}

		if (is_object($transport)) {
			return $transport;
		}

		// If no transport is requested, try to autodetect
		if (empty($transport)) {
			// Previously found transport, use that
			if (!empty(self::$transport)) {
				$transport = self::$transport;
			}
			elseif (function_exists('curl_init')) {
				$transport = 'curl';
			}
			elseif (function_exists('fsockopen')) {
				$transport = 'fsockopen';
			}
		}

		if (isset(self::$transports[$transport])) {
			return self::$transports[$transport];
		}

		$class = 'Requests_Transport_' . $transport;
		if (!class_exists($class)) {
			if ($transport !== 'curl' && $transport !== 'fsockopen') {
				throw new Requests_Exception('Invalid transport', 'invalidtransport');
			}

			$file = str_replace('_', '/', $class);
			require_once(__DIR__ . '/' . $file . '.php');
		}

		self::$transports[$transport] = new $class();
		return self::$transports[$transport];
	}

	/**
	 * Set a default transport
	 *
	 * @param string $transport Transport name
	 */
	public static function set_transport($transport) {
		self::$transport = $transport;
	}

	/**
	 * Send a HEAD request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function head($url, $headers = array(), $options = array()) {
		return self::request($url, $headers, null, Requests_Transport_HEAD, $options);
	}

	/**
	 * Send a GET request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function get($url, $headers = array(), $options = array()) {
		return self::request($url, $headers, null, Requests_Transport_GET, $options);
	}

	/**
	 * Send a POST request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $data Data to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function post($url, $headers = array(), $data = array(), $options = array()) {
		return self::request($url, $headers, $data, Requests_Transport_POST, $options);
	}

	/**
	 * Send a PUT request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $data Data to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function put($url, $headers = array(), $data = array(), $options = array()) {
		return self::request($url, $headers, $data, Requests_Transport_PUT, $options);
	}

	/**
	 * Send a DELETE request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function delete($url, $headers = array(), $options = array()) {
		return self::request($url, $headers, null, Requests_Transport_DELETE, $options);
	}

	/**
	 * Send a TRACE request
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function trace($url, $headers = array(), $options = array()) {
		return self::request($url, $headers, null, Requests_Transport_TRACE, $options);
	}

	/**
	 * Send a PATCH request
	 *
	 * Note: Unlike {@see post} or {@see put}, `$data` is required.
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array $data Data to send with the request
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function patch($url, $headers, $data, $options = array()) {
		return self::request($url, $headers, $data, Requests_Transport_PATCH, $options);
	}

	/**
	 * Main interface for HTTP requests
	 *
	 * This method is a conglomerate of all of the other methods. You can probably
	 * use it for 99% of your needs.
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array|null $data Data to send with the request, or null if no data
	 * @param string $type HTTP request type (use Requests constants)
	 * @param array $options Options for the request
	 * @return Requests_Response
	 */
	public static function request($url, $headers = array(), $data = null, $type = Requests_Transport_GET, $options = array()) {
		if (empty($options['type'])) {
			$options['type'] = self::FORM;
		}

		if (is_array($data) && $options['type'] === self::JSON) {
			$data = json_encode($data);
		}

		$options = array_merge(self::get_default_options(), $options);

		self::set_defaults($url, $headers, $data, $type, $options);

		$options['hooks']->dispatch('requests.before_request', array(&$url, &$headers, &$data, &$type, &$options));

		$transport = self::get_transport($options['transport']);
		$response = $transport->request($url, $headers, $data, $options);

		$options['hooks']->dispatch('requests.before_parse', array(&$response, $url, $headers, $data, $type, $options));

		return self::parse_response($response, $url, $headers, $data, $options);
	}

	/**
	 * Send multiple HTTP requests simultaneously
	 *
	 * @param array $requests Requests to send
	 * @param array $options Global options
	 * @return array Responses
	 */
	public static function request_multiple($requests, $options = array()) {
		$options = array_merge(self::get_default_options(true), $options);

		if (!empty($options['hooks'])) {
			$options['hooks']->dispatch('requests.before_request_multiple', array(&$requests, &$options));
		}

		foreach ($requests as $key => &$request) {
			if (empty($request['options'])) {
				$request['options'] = array();
			}

			// We need to merge the global options into the request-specific options,
			// but this is a bit tricky. We want request-specific options to override
			// the global options, but this is the opposite of array_merge.
			$request['options'] = array_merge($options, $request['options']);

			if (empty($request['options']['type'])) {
				$request['options']['type'] = self::FORM;
			}
			if (is_array($request['data']) && $request['options']['type'] === self::JSON) {
				$request['data'] = json_encode($request['data']);
			}

			self::set_defaults($request['url'], $request['headers'], $request['data'], $request['type'], $request['options']);

			// Disallow starting the hooks again
			$request['options']['hooks'] = false;
		}

		$transport = self::get_transport($options['transport']);

		if (!$transport->supports('request_multiple')) {
			$responses = array();
			$class = get_class($transport);
			trigger_error("Transport $class does not support multiple requests", E_USER_WARNING);

			foreach ($requests as $key => $request) {
				try {
					$responses[$key] = $transport->request($request['url'], $request['headers'], $request['data'], $request['options']);

					// We're going to be parsing this manually, so we need to
					// do the same as is done in {@see request}
					$request['options']['hooks'] = $options['hooks'];
					$options['hooks']->dispatch('requests.before_parse', array(&$responses[$key], $request['url'], $request['headers'], $request['data'], $request['type'], $request['options']));
				}
				catch (Requests_Exception $e) {
					$responses[$key] = $e;
				}
			}
		}
		else {
			$responses = $transport->request_multiple($requests, $options);
		}


		foreach ($responses as $key => &$response) {
			// As above, we're going to be parsing this manually
			if (!empty($options['hooks'])) {
				$requests[$key]['options']['hooks'] = $options['hooks'];
			}
			else {
				$requests[$key]['options']['hooks'] = new Requests_Hooks();
			}

			// If we got an exception, don't parse it
			if ($response instanceof Requests_Exception) {
				continue;
			}

			if (!empty($options['hooks'])) {
				$options['hooks']->dispatch('requests.before_parse', array(&$response, $requests[$key]['url'], $requests[$key]['headers'], $requests[$key]['data'], $requests[$key]['type'], $requests[$key]['options']));
			}

			$responses[$key] = self::parse_response($response, $requests[$key]['url'], $requests[$key]['headers'], $requests[$key]['data'], $requests[$key]['options']);
		}

		if (!empty($options['hooks'])) {
			$options['hooks']->dispatch('requests.after_request_multiple', array(&$responses, &$options));
		}

		return $responses;
	}

	/**
	 * Get the default options
	 *
	 * @see self::request() for values
	 * @param boolean $multirequest Is this a multirequest?
	 * @return array Default option values
	 */
	protected static function get_default_options($multirequest = false) {
		$defaults = array(
			'timeout' => 10,
			'connect_timeout' => 10,
			'useragent' => 'php-requests/' . self::VERSION,
			'protocol_version' => 1.1,
			'blocking' => true,
			'filename' => false,
			'auth' => false,
			'proxy' => false,
			'hooks' => null,
			'transport' => null,
			'verify' => true,
			'verifyname' => true,
		);
		if ($multirequest) {
			$defaults['follow_redirects'] = false;
		}
		else {
			$defaults['follow_redirects'] = true;
			$defaults['redirects'] = 10;
		}
		return $defaults;
	}

	/**
	 * Set the default values
	 *
	 * @param string $url URL to request
	 * @param array $headers Extra headers to send with the request
	 * @param array|null $data Data to send with the request, or null if no data
	 * @param string $type HTTP request type
	 * @param array $options Options for the request
	 * @return void
	 */
	protected static function set_defaults(&$url, &$headers, &$data, &$type, &$options) {
		if (is_array($data) && strtoupper($type) === 'POST') {
			if ($options['type'] === self::FORM) {
				$data = http_build_query($data, null, '&');
			}
		}

		if (empty($headers)) {
			$headers = array();
		}

		if (is_array($data) && strtoupper($type) === 'POST') {
			if ($options['type'] === self::FORM) {
				$headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				$headers['Content-Length'] = strlen($data);
			}
			elseif ($options['type'] === self::JSON) {
				$headers['Content-Type'] = 'application/json';
				$headers['Content-Length'] = strlen($data);
			}
		}

		if (empty($headers['Accept'])) {
			$headers['Accept'] = 'application/json';
		}
		if (empty($options['hooks'])) {
			$options['hooks'] = new Requests_Hooks();
		}
		if (empty($headers['Accept-Encoding'])) {
			$headers['Accept-Encoding'] = self::get_encoding_from_server();
		}
	}

	/**
	 * Get the default Accept-Encoding header from the server
	 *
	 * @return string
	 */
	private static function get_encoding_from_server() {
		if (isset($_SERVER['HTTP_ACCEPT_ENCODING'])) {
			return $_SERVER['HTTP_ACCEPT_ENCODING'];
		}
		else {
			return '';
		}
	}

	/**
	 * Parse a response
	 *
	 * @param string $response Full response text
	 * @param string $url Original request URL
	 * @param array $headers Original request headers
	 * @param array $data Original request data
	 * @param array $options Original request options
	 * @return Requests_Response
	 */
	protected static function parse_response($response, $url, $headers, $data, $options) {
		$resp = new Requests_Response();
		if ( ($options['filename'] !== false) && ($response !== '') ) {
			$resp->body = '';
			return $resp;
//			throw new Requests_Exception('Improper response value', 'requests.no_response_header');
		}

		$parts = explode("\r\n\r\n", $response, 2);
		$resp->headers = new Requests_Response_Headers();

		$header_part = $parts[0];

		// If we get a 100 Continue header, just ignore it
		if (preg_match('/^HTTP\/1.\d 100 Continue/i', $header_part)) {
			$parts = explode("\r\n\r\n", $parts[1], 2);
			$header_part = $parts[0];
		}

		$resp->headers->parse($header_part);
		$resp->status_code = $resp->headers->get_status_code();

		if (isset($parts[1])) {
			$resp->body = $parts[1];
		}
		else {
			$resp->body = '';
		}

		// Use per-request timeout if set, otherwise use default
		$timeout = isset($options['timeout']) ? $options['timeout'] : 10;

		// Handle redirects
		if ($options['follow_redirects'] === true && $resp->is_redirect()) {
			$options['redirects']--;
			if ($options['redirects'] >= 0) {
				$redirected_url = $resp->headers['Location'];

				// See https://github.com/rmccue/Requests/issues/66
				// The base URL for the redirect is the original URL, unless the
				// Location header has a valid scheme
				$redirect_base = $url;
				$redirect_parts = parse_url($redirected_url);
				if (!empty($redirect_parts['scheme'])) {
					$redirect_base = null;
				}

				$redirected = Requests_IRI::absolutize($redirect_base, $redirected_url);
				$redirected = $redirected->uri;

				$options['hooks']->dispatch('requests.before_redirect', array(&$redirected, &$headers, &$data, &$type, &$options));
				$redirect_options = $options;
				$redirect_options['follow_redirects'] = false;
				$resp = self::request($redirected, $headers, $data, $type, $redirect_options);
				$resp->history[] = $resp;
			}
			else {
				throw new Requests_Exception_HTTP($resp->status_code, 'Too many redirects');
			}
		}

		$resp->url = $url;
		$resp->raw = $response;

		// If our encodings don't match, decode the body
		if (isset($resp->headers['Content-Encoding']) && $resp->body !== '') {
			$resp->body = self::decode_body($resp->body, $resp->headers['Content-Encoding']);
		}

		$options['hooks']->dispatch('requests.after_request', array(&$resp, $headers, $data, $options));
		return $resp;
	}

	/**
	 * Decodes a compressed body
	 *
	 * @param string $body Full response body
	 * @param string|array $encoding Encoding type
	 * @return string Decoded body
	 */
	public static function decode_body($body, $encoding) {
		if (!is_callable('gzinflate')) {
			//throw new Requests_Exception('Gzip decompression is not supported on this system', 'gzip');
			return $body;
		}

		if (is_array($encoding)) {
			$encoding = $encoding[0];
		}
		if ($encoding === 'gzip' || $encoding === 'deflate') {
			$body = self::compatible_gzinflate($body);
		}
		return $body;
	}

	/**
	 * Gzip Inflate
	 *
	 * From {@link http://php.net/manual/en/function.gzinflate.php#70875}
	 *
	 * @param string $gzData String to decompress
	 * @return string Decompressed string
	 */
	public static function compatible_gzinflate($gzData) {
		if (substr($gzData, 0, 3) == "\x1f\x8b\x08") {
			$i = 10;
			$flg = ord(substr($gzData, 3, 1));
			if ($flg > 0) {
				if ($flg & 4) {
					list($xlen) = unpack('v', substr($gzData, $i, 2));
					$i = $i + 2 + $xlen;
				}
				if ($flg & 8)
					$i = strpos($gzData, "\0", $i) + 1;
				if ($flg & 16)
					$i = strpos($gzData, "\0", $i) + 1;
				if ($flg & 2)
					$i = $i + 2;
			}
			return gzinflate(substr($gzData, $i, -8));
		}
		else {
			return $gzData;
		}
	}
}

final class Requests_Transport_HEAD extends Requests_Transport_GET {}
final class Requests_Transport_GET {
	const METHOD = 'GET';
}
final class Requests_Transport_POST {
	const METHOD = 'POST';
}
final class Requests_Transport_PUT {
	const METHOD = 'PUT';
}
final class Requests_Transport_DELETE {
	const METHOD = 'DELETE';
}
final class Requests_Transport_TRACE {
	const METHOD = 'TRACE';
}
final class Requests_Transport_PATCH {
	const METHOD = 'PATCH';
}
