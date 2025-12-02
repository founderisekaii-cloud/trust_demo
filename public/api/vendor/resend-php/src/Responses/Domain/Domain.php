<?php

namespace Resend\Responses\Domain;

use Resend\Contracts\Response;
use Resend\Responses\Concerns\ArrayAccessible;

class Domain implements Response
{
    use ArrayAccessible;

    /**
     * @param  string  $id
     * @param  string  $name
     * @param  string  $createdAt
     * @param  string  $status
     * @param  string  $region
     * @param  array<int, DomainRecord>  $records
     */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $createdAt,
        public readonly string $status,
        public readonly string $region,
        public readonly array $records,
    ) {
        //
    }

    /**
     * {@inheritDoc}
     */
    public static function from(array $attributes): self
    {
        $records = array_map(fn (array $record) => DomainRecord::from(
            $record
        ), $attributes['records'] ?? []);

        return new self(
            $attributes['id'],
            $attributes['name'],
            $attributes['created_at'],
            $attributes['status'],
            $attributes['region'],
            $records
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
            'created_at' => $this->createdAt,
            'status' => $this->status,
            'region' => $this->region,
            'records' => array_map(fn (DomainRecord $record) => $record->toArray(), $this->records),
        ];
    }
}
