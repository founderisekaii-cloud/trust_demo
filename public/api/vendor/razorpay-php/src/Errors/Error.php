<?php

namespace Razorpay\Api\Errors;

use Exception;

class Error extends Exception
{
    public function __construct(
        $message,
        $code,
        $httpStatusCode = null,
        $field = null)
    {
        parent::__construct($message);
        $this->code = $code;
        $this->httpStatusCode = $httpStatusCode;
        $this->field = $field;
    }
    
    public static function create($body, $code)
    {
        $body = json_decode($body, true);
        
        $error = $body['error'];

        $description = $error['description'];

        $field = isset($error['field']) ? $error['field'] : null;

        switch ($code)
        {
            case 400:
                $class = __NAMESPACE__ . '\BadRequestError';
                break;
            case 502:
                $class = __NAMESPACE__ . '\GatewayError';
                break;
            case 500:
            default:
                $class = __NAMESPACE__ . '\ServerError';
                break;
        }

        return new $class($description, $error['code'], $code, $field);
    }
}
