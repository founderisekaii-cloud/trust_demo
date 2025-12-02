<?php

declare(strict_types=1);

namespace Resend\Exceptions;

use Exception;
use Resend\ValueObjects\Transporter\Response;

final class ErrorException extends Exception
{
    /**
     * Create a new exception.
     */
    public function __construct(private readonly Response $response)
    {
        $message = $response->error()->message;
        $code = $response->error()->type;

        parent::__construct($message, 0);
    }

    /**
     * Get the response.
     */
    public function getResponse(): Response
    {
        return $this->response;
    }
}
