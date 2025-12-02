<?php

namespace Resend\Responses\Domain;

use Resend\Contracts\Response;
use Resend\Responses\Concerns\ArrayAccessible;

class DomainRecord implements Response
{
    use ArrayAccessible;

    /**
     * @param  string  $type
     * @param  string  $name
     * @param  string  $value
     * @param  string  $status
     * @param  int|null  $ttl
     * @param  int|null  $priority
     */
    public function __construct(
        public readonly string $type,
        public readonly string $name,
        public readonly string $value,
        public readonly string $status,
        public readonly ?int $ttl,
        public readonly ?int $priority
    ) {
        //
    }

    /**
     * {@inheritDoc}
     */
    public static function from(array $attributes): self
    {
        return new self(
            $attributes['type'],
            $attributes['name'],
            $attributes['value'],
            $attributes['status'],
            $attributes['ttl'] ?? null,
            $attributes['priority'] ?? null,
        );
    }

    /**
     * {@inheritDoc}
     */
    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'name' => $this->name,
            'value' => $this->value,
            'status' => $this->status,
            'ttl' => $this->ttl,
            'priority' => $this->priority,
        ];
    }
}
