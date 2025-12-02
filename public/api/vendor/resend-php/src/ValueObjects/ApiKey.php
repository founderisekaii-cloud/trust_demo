<?php

namespace Resend\ValueObjects;

use Stringable;

final class ApiKey implements Stringable
{
    /**
     * Create a new API Key value object.
     */
    private function __construct(
        private readonly string $apiKey
    ) {
        //
    }

    /**
     * Create a new API Key value object from the given API key.
     */
    public static function from(string $apiKey): self
    {
        return new self($apiKey);
    }

    /**
     * Get the string representation of the API key.
     */
    public function toString(): string
    {
        return $this->apiKey;
    }

    /**
     * Get the string representation of the API key.
     */
    public function __toString(): string
    {
        return $this->toString();
    }
}
