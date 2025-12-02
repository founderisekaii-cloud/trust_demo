<?php

// Path to autoload.php
require_once __DIR__.'/libs/Requests-1.7.0/library/Requests.php';

Requests::register_autoloader();

require_once __DIR__ . '/src/Api.php';
require_once __DIR__ . '/src/Utility.php';
require_once __DIR__ . '/src/Errors/Error.php';
require_once __DIR__ . '/src/Errors/ErrorCode.php';
require_once __DIR__ . '/src/Errors/SignatureVerificationError.php';
require_once __DIR__ . '/src/Errors/BadRequestError.php';
require_once __DIR__ . '/src/Errors/GatewayError.php';
require_once __DIR__ . '/src/Errors/ServerError.php';
