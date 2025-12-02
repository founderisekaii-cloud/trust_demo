<?php

namespace Resend\Responses\Domain;

use Resend\Contracts\Response;
use Resend\Responses\Concerns\ArrayAccessible;

class DomainList implements Response
{
    use ArrayAccessible;

    /**
     * @var array<int, Domain>
     */
    public readonly array $data;

    /**
     * Create a new Domain List response.
     *
     * @param  array<int, Domain>  $data
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
        $data = array_map(fn ($domain) => Domain::from(
            $domain
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
            'data' => array_map(fn (Domain $domain) => $domain->toArray(), $this->data),
        ];
    }
}
