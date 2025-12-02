<?php

// This file loads the necessary PHP libraries for Resend and Razorpay.

// Load Razorpay SDK
require_once __DIR__ . '/razorpay-php/Razorpay.php';

// Load Resend SDK
spl_autoload_register(function ($class) {
    $prefix = 'Resend\\';
    $base_dir = __DIR__ . '/resend-php/src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});
