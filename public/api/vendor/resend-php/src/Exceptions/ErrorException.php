<?php

namespace Resend\Exceptions;

use Exception;

final class ErrorException extends Exception
{
    /**
     * Create a new exception.
     *
     * @param  array<array-key, mixed>  $error
     * @return void
     */
    public function __construct(private readonly array $error)
    {
        $message = $error['message'] ?? 'Unknown error';

        parent::__construct($message);
    }

    /**
     * Get the error message.
     */
    public function getErrorMessage(): ?string
    {
        return $this->error['message'];
    }

    /**
     * Get the error type.
     */
    public function getErrorType(): ?string
    {
        return $this->error['type'];
    }
}
