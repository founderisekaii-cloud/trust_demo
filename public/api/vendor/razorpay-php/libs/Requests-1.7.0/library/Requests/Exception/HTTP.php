<?php
/**
 * Exception for HTTP error codes
 *
 * @package Requests
 * @subpackage Exception
 */

/**
 * Exception for HTTP error codes
 *
 * @package Requests
 * @subpackage Exception
 */
class Requests_Exception_HTTP extends Requests_Exception {
	/**
	 * HTTP status code
	 *
	 * @var integer
	 */
	protected $code = 0;

	/**
	 * Reason phrase
	 *
	 * @var string
	 */
	protected $reason = 'Unknown';

	/**
	 * Create a new exception
	 *
	 * @param integer|null $code HTTP status code
	 * @param string|null $reason Reason phrase
	 */
	public function __construct($code = null, $reason = null) {
		if ($code !== null) {
			$this->code = (int) $code;
		}

		if ($reason !== null) {
			$this->reason = $reason;
			$message = sprintf('%d %s', $this->code, $this->reason);
		}
		else {
			$message = sprintf('%d Unknown', $this->code);
		}

		parent::__construct($message, 'httpresponse');
	}

	/**
	 * Get the status code
	 *
	 * @return integer
	 */
	public function getCode() {
		return $this->code;
	}

	/**
	 * Get the reason phrase
	 *
	 * @return string
	 */
	public function getReason() {
		return $this->reason;
	}
}
