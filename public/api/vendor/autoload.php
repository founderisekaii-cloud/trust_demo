<?php
/**
 * A simple autoloader that loads class files from the vendor directory.
 * This is a lightweight replacement for Composer's autoloader for shared hosting.
 */
spl_autoload_register(function ($class) {
    // Base directory for the namespace prefix
    $baseDir = __DIR__ . '/';

    // PSR-4 mapping for Resend
    $resendPrefix = 'Resend\\';
    if (strncmp($resendPrefix, $class, strlen($resendPrefix)) === 0) {
        $relativeClass = substr($class, strlen($resendPrefix));
        $file = $baseDir . 'resend-php/src/' . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require $file;
            return;
        }
    }

    // PSR-4 mapping for Razorpay
    $razorpayPrefix = 'Razorpay\\Api\\';
    if (strncmp($razorpayPrefix, $class, strlen($razorpayPrefix)) === 0) {
        $relativeClass = substr($class, strlen($razorpayPrefix));
        $file = $baseDir . 'razorpay-php/src/' . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require $file;
            return;
        }
    }

    $razorpayExceptionPrefix = 'Razorpay\\Errors\\';
     if (strncmp($razorpayExceptionPrefix, $class, strlen($razorpayExceptionPrefix)) === 0) {
        $relativeClass = substr($class, strlen($razorpayExceptionPrefix));
        $file = $baseDir . 'razorpay-php/src/Errors/' . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require $file;
            return;
        }
    }
});

// Manually require the Resend class to make it easily accessible.
require_once __DIR__ . '/resend-php/src/Resend.php';
?>
