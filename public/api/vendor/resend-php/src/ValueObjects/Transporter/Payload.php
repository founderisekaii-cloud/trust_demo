<?php

namespace Resend\ValueObjects\Transporter;

use Resend\Enums\Method;

final class Payload
{
    /**
     * Create a new Payload value object.
     *
     * @param  array<string, mixed>  $parameters
     */
    private function __construct(
        private readonly string $method,
        private readonly string $uri,
        private readonly array $parameters
    ) {
        //
    }

    /**
     * Create a new GET request payload.
     */
    public static function get(string $resource, string $id): self
    {
        return new self(
            Method::GET,
            "{$resource}/{$id}",
            []
        );
    }

    /**
     * Create a new LIST request payload.
     */
    public static function list(string $resource): self
    {
        return new self(
            Method::GET,
            $resource,
            [],
        );
    }

    /**
     * Create a new CREATE request payload.
     *
     * @param  array<string, mixed>  $parameters
     */
    public static function create(string $resource, array $parameters): self
    {
        return new self(
            Method::POST,
            $resource,
            $parameters,
        );
    }

    /**
     * Create a new DELETE request payload.
     */
    public static function delete(string $resource, string $id): self
    {
        return new self(
            Method::DELETE,
            "{$resource}/{$id}",
            [],
        );
    }

    /**
     * Get the HTTP method of the payload.
     */
    public function method(): string
    {
        return $this->method;
    }

    /**
     * Get the URI of the payload.
     */
    public function uri(): string
    {
        return $this->uri;
    }

    /**
     * Get the parameters of the payload.
     *
     * @return array<string, mixed>
     */
    public function parameters(): array
    {
        return $this->parameters;
    }
}
