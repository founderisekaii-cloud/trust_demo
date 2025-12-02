<?php
/**
 * Exception for the Requests library
 *
 * @package Requests
 * @subpackage Exception
 */

/**
 * Exception for the Requests library
 *
 * @package Requests
 * @subpackage Exception
 */
class Requests_Exception extends Exception {
	/**
	 * Type of exception
	 *
	 * For HTTP exceptions, this corresponds to the status code. Otherwise, this
	 * is a Requests-specific error code.
	 *
	 * @var string
	 */
	protected $type;

	/**
	 * Data associated with the exception
	 *
	 * @var mixed
	 */
	protected $data;

	/**
	 * Create a new exception
	 *
	 * @param string $message Exception message
	 * @param string $type Exception type
	 * @param mixed $data Associated data
	 */
	public function __construct($message, $type, $data = null) {
		parent::__construct($message);
		$this->type = $type;
		$this->data = $data;
	}

	/**
	 * Get the type of exception
	 *
	 * @return string
	 */
	public function getType() {
		return $this->type;
	}

	/**
	 * Get the associated data
	 *
	 * @return mixed
	 */
	public function getData() {
		return $this->data;
	}
}
