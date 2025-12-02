<?php

namespace Resend\ValueObjects\Transporter;

use Stringable;

final class BaseUri implements Stringable
{
    /**
     * Create a new Base URI value object.
     */
    private function __construct(
        private readonly string $baseUri
    ) {
        //
    }

    /**
     * Create a new Base URI value object from the given base URI.
     */
    public static function from(string $baseUri): self
    {
        return new self($baseUri);
    }

    /**
     * Get the string representation of the base URI.
     */
    public function toString(): string
    {
        return "https://{$this->baseUri}/";
    }

    /**
     * Get the string representation of the base URI.
     */
    public function __toString(): string
    {
        return $this->toString();
    }
}
