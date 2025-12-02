<?php
/**
 * SSL utility class
 *
 * @package Requests
 * @subpackage Utilities
 */

/**
 * SSL utility class
 *
 * @package Requests
 * @subpackage Utilities
 */
class Requests_SSL {
	/**
	 * Verify the certificate against the given name
	 *
	 * @param string $name Name to verify (usually hostname)
	 * @param array $cert Certificate data from openssl_x509_parse()
	 * @return boolean
	 */
	public static function verify_certificate($name, $cert) {
		// Support for RFC 2818 Section 3.1
		// "If a subjectAltName extension of type dNSName is present, that MUST
		// be used as the identity."
		if (!empty($cert['extensions']) && !empty($cert['extensions']['subjectAltName'])) {
			$altnames = explode(',', $cert['extensions']['subjectAltName']);
			foreach ($altnames as $altname) {
				$altname = trim($altname);
				if (strpos($altname, 'DNS:') !== 0) {
					continue;
				}

				$altname = substr($altname, 4);
				// Check for wildcards
				if (self::match_domain($name, $altname)) {
					return true;
				}
			}
		}

		// Fallback to checking the common name
		if (!empty($cert['subject']) && !empty($cert['subject']['CN'])) {
			if (self::match_domain($name, $cert['subject']['CN'])) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Match a hostname against a certificate
	 *
	 * @param string $host Host name to verify
	 * @param string $cert Host name from certificate
	 * @return boolean
	 */
	public static function match_domain($host, $cert) {
		// Exact match?
		if (strtolower($host) === strtolower($cert)) {
			return true;
		}

		// Wildcard match
		if (preg_match('/^(.+)\.([^\.]+\.[^\.]+)$/', $host, $matches)) {
			$subdomain = $matches[1];
			$domain = $matches[2];
			// Only one wildcard is allowed
			if (substr_count($cert, '*') === 1 && strpos($cert, '*.') === 0) {
				$cert_domain = substr($cert, 2);
				if (strtolower($domain) === strtolower($cert_domain)) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Get the path to the CA certificate bundle
	 *
	 * @return string Path to certificate bundle
	 */
	public static function get_default_certificate_path() {
		return dirname(dirname(__FILE__)) . '/library/Requests/Transport/cacert.pem';
	}
}
