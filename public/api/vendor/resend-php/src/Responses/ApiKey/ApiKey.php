<?php

namespace Resend\Responses\ApiKey;

use Resend\Contracts\Response;

class ApiKey implements Response
{
    /**
     * @param  string  $id
     * @param  string  $name
     * @param  string|null  $permission
     * @param  string|null  $domainId
     * @param  string  $createdAt
     * @param  string|null  $token
     */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly ?string $permission,
        public readonly ?string $domainId,
        public readonly string $createdAt,
        public readonly ?string $token
    ) {
        //
    }

    /**
     * {@inheritDoc}
     */
    public static function from(
        array $attributes
    ): self {
        return new self(
            $attributes['id'],
            $attributes['name'],
            $attributes['permission'] ?? null,
            $attributes['domain_id'] ?? null,
            $attributes['created_at'],
            $attributes['token'] ?? null,
        );
    }

    /**
     * {@inheritDoc}
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'permission' => $this->permission,
            'domain_id' => $this->domainId,
            'created_at' => $this->createdAt,
            'token' => $this->token,
        ];
    }
}
