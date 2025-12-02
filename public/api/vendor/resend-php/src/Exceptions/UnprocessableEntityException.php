<?php

declare(strict_types=1);

namespace Resend\Exceptions;

use Exception;
use Resend\ValueObjects\Transporter\Response;

final class UnprocessableEntityException extends Exception
{
    /**
     * The response.
     */
    private Response $response;

    /**
     * The errors.
     *
     * @var array<int, array<string, string>>
     */
    private array $errors;

    /**
     * Create a new exception.
     */
    public function __construct(Response $response)
    {
        $this->response = $response;
        $this->errors = $response->errors();

        $errors = array_map(fn ($error) => "{$error['field']}: {$error['message']}", $this->errors);

        $message = 'Unprocessable Entity: ' . implode(', ', $errors);

        parent::__construct($message, 0);
    }

    /**
     * Get the response.
     */
    public function getResponse(): Response
    {
        return $this->response;
    }

    /**
     * Get the errors.
     *
     * @return array<int, array<string, string>>
     */
    public function getErrors(): array
    {
        return $this->errors;
    }
}
