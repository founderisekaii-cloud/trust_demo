<?php
/**
 * Hooking system
 *
 * @package Requests
 * @subpackage Hooks
 */

/**
 * Hooking system
 *
 * @package Requests
 * @subpackage Hooks
 */
interface Requests_Hooker {
	/**
	 * Register a hook
	 *
	 * @param string $hook Hook name
	 * @param callback $callback Function/method to call on hook
	 * @param int $priority Priority for the hook
	 */
	public function register($hook, $callback, $priority = 10);

	/**
	 * Dispatch a hook
	 *
	 * @param string $hook Hook name
	 * @param array $parameters Parameters to pass to callbacks
	 * @return boolean
	 */
	public function dispatch($hook, $parameters = array());
}
