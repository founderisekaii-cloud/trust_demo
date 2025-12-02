<?php

namespace Resend\Exceptions;

use Exception;
use JsonException;

final class UnserializableResponse extends Exception
{
    /**
     * Create a new exception.
     */
    public function __construct(private readonly JsonException $jsonException)
    {
        parent::__construct($jsonException->getMessage(), $jsonException->getCode());
    }

    /**
     * Get the JSON exception.
     */
    public function getJsonException(): JsonException
    {
        return $this->jsonException;
    }
}
