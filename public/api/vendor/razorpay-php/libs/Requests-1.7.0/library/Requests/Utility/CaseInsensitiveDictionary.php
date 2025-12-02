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
class Requests_Utility_CaseInsensitiveDictionary implements ArrayAccess, IteratorAggregate {
	/**
	 * Actual data
	 *
	 * @var array
	 */
	protected $data = array();

	/**
	 * Creates a new case-insensitive dictionary
	 *
	// @param array $data Existing data to use as a base
	 */
	public function __construct($data = array()) {
		foreach ($data as $key => $value) {
			$this->offsetSet($key, $value);
		}
	}

	/**
	 * Get the iterator for the data
	 *
	 * @return ArrayIterator
	 */
	public function getIterator() {
		return new ArrayIterator($this->data);
	}

	/**
	 * Get a value from the dictionary
	 *
	 * @param string $key
	 * @return mixed
	 */
	public function offsetGet($key) {
		$key = strtolower($key);
		if (!isset($this->data[$key]))
			return null;

		return $this->data[$key][1];
	}

	/**
	 * Set a value
	 *
	 * @param string $key
	 * @param string $value
	 */
	public function offsetSet($key, $value) {
		$this->data[strtolower($key)] = array($key, $value);
	}

	/**
	 * Check if a key exists
	 *
	 * @param string $key
	 * @return boolean
	 */
	public function offsetExists($key) {
		return isset($this->data[strtolower($key)]);
	}

	/**
	 * Remove a value
	 *
	 * @param string $key
	 */
	public function offsetUnset($key) {
		unset($this->data[strtolower($key)]);
	}

	/**
	 * Get all values
	 *
	 * @param string $key
	 * @return array
	 */
	public function getValues($key) {
		$key = strtolower($key);
		if (!isset($this->data[$key]))
			return null;

		$values = array();
		if (!is_array($this->data[$key][1]))
			$this->data[$key][1] = array($this->data[$key][1]);

		return $this->data[$key][1];
	}

	/**
	 * Magic __get method
	 *
	 * @param string $key
	 * @return mixed
	 */
	public function __get($key) {
		return $this->offsetGet($key);
	}

	/**
	 * Magic __set method
	 *
	 * @param string $key
	 * @param string $value
	 */
	public function __set($key, $value) {
		$this->offsetSet($key, $value);
	}
}
