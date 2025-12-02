<?php
/**
 * Hooks system
 *
 * @package Requests
 * @subpackage Hooks
 */

/**
 * Hooks system
 *
 * @package Requests
 * @subpackage Hooks
 */
class Requests_Hooks implements Requests_Hooker {
	/**
	 * Registered hooks
	 *
	 * @var array
	 */
	protected $hooks = array();

	/**
	 * Create a new hook system
	 */
	public function __construct() {
		// pass
	}

	/**
	 * Register a hook
	 *
	 * @param string $hook Hook name
	 * @param callback $callback Function/method to call on hook
	 * @param int $priority Priority for the hook
	 */
	public function register($hook, $callback, $priority = 10) {
		if (!isset($this->hooks[$hook])) {
			$this->hooks[$hook] = array();
		}
		if (!isset($this->hooks[$hook][$priority])) {
			$this->hooks[$hook][$priority] = array();
		}

		$this->hooks[$hook][$priority][] = $callback;
	}

	/**
	 * Dispatch a hook
	 *
	 * @param string $hook Hook name
	 * @param array $parameters Parameters to pass to callbacks
	 * @return boolean FALSE on failure
	 */
	public function dispatch($hook, $parameters = array()) {
		if (empty($this->hooks[$hook])) {
			return false;
		}

		$this->sort_hooks($hook);

		foreach ($this->hooks[$hook] as $priority => $hooks) {
			foreach ($hooks as $hook) {
				call_user_func_array($hook, $parameters);
			}
		}

		return true;
	}

	/**
	 * Sort hooks by priority
	 *
	 * @param string $hook
	 */
	protected function sort_hooks($hook) {
		ksort($this->hooks[$hook]);
	}
}
