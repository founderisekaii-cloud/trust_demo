<?php

namespace Resend\Responses\ApiKey;

use Resend\Contracts\Response;

class ApiKeyList implements Response
{
    /**
     * @var array<int, ApiKey>
     */
    public readonly array $data;

    /**
     * Create a new API Key List response.
     *
     * @param  array<int, ApiKey>  $data
     */
    public function __construct(
        array $data
    ) {
        $this->data = $data;
    }

    /**
     * {@inheritDoc}
     */
    public static function from(array $attributes): self
    {
        $data = array_map(fn ($apiKey) => ApiKey::from(
            $apiKey
        ), $attributes['data']);

        return new self(
            $data
        );
    }

    /**
     * {@inheritDoc}
     */
    public function toArray(): array
    {
        return [
            'data' => array_map(fn (ApiKey $apiKey) => $apiKey->toArray(), $this->data),
        ];
    }
}
