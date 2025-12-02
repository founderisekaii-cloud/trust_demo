<?php
/**
 * Proxy handler
 *
 * @package Requests
 * @subpackage Proxy
 */

/**
 * Proxy handler
 *
 * @package Requests
 * @subpackage Proxy
 */
interface Requests_Proxy {
	/**
	 * Register hooks as needed
	 *
	 * This method is called in {@see Requests::request} when the user has set
	 * an instance as the 'proxy' option. Use this callback to register all the
	 * required hooks into the request lifecycle.
	 *
	 * @see Requests_Hooks::register
	 * @param Requests_Hooks $hooks Hook system
	 */
	public function register(Requests_Hooks &$hooks);
}
