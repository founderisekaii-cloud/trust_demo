<?php

namespace Resend\Exceptions;

use Exception;
use Psr\Http\Client\ClientExceptionInterface;

final class TransporterException extends Exception
{
    /**
     * Create a new exception.
     */
    public function __construct(private readonly ClientExceptionInterface $clientException)
    {
        parent::__construct($clientException->getMessage(), $clientException->getCode());
    }

    /**
     * Get the client exception.
     */
    public function getClientException(): ClientExceptionInterface
    {
        return $this->clientException;
    }
}
