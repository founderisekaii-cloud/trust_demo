<?php

declare(strict_types=1);

namespace Resend\Exceptions;

use Exception;
use Throwable;

final class TransporterException extends Exception
{
    /**
     * Create a new exception.
     */
    public function __construct(private readonly Throwable $throwable)
    {
        $message = $this->throwable->getMessage();
        $code = (int) $this->throwable->getCode();

        parent::__construct($message, $code);
    }

    /**
     * Get the throwable.
     */
    public function getThrowable(): Throwable
    {
        return $this->throwable;
    }
}
