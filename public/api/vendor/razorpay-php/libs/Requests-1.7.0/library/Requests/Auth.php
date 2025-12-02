<?php
/**
 * Authentication provider
 *
 * @package Requests
 * @subpackage Auth
 */

/**
 * Authentication provider
 *
 * This is a stub interface that doesn't do anything, but allows for simpler
 * type hinting.
 *
 * @package Requests
 * @subpackage Auth
 */
interface Requests_Auth {
	/**
	 * Register hooks as needed
	 *
	 * This method is called in {@see Requests::request} when the user has set
	 * an instance as the 'auth' option. Use this callback to register all the
	 * required hooks into the request lifecycle.
	 *
	 * @see Requests_Hooks::register
	 * @param Requests_Hooks $hooks Hook system
	 */
	public function register(Requests_Hooks &$hooks);
}
