<?php

namespace Resend\Responses\Email;

use Resend\Contracts\Response;

class Email implements Response
{
    /**
     * @param  string  $id
     */
    public function __construct(
        public readonly string $id,
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
            $attributes['id']
        );
    }

    /**
     * {@inheritDoc}
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
        ];
    }
}
