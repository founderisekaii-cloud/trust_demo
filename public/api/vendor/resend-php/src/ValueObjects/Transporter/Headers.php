<?php

namespace Resend\ValueObjects\Transporter;

use Resend\ValueObjects\ApiKey;

final class Headers
{
    /**
     * Create a new Headers value object.
     *
     * @param  array<string, string>  $headers
     */
    private function __construct(
        private readonly array $headers
    ) {
        //
    }

    /**
     * Create a new Headers value object with the given authorization.
     */
    public static function withAuthorization(ApiKey $apiKey): self
    {
        return new self([
            'Authorization' => "Bearer {$apiKey->toString()}",
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ]);
    }

    /**
     * Get the array representation of the headers.
     *
     * @return array<string, string>
     */
    public function toArray(): array
    {
        return $this->headers;
    }
}
