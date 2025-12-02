<?php

namespace Resend\Contracts;

use Resend\ValueObjects\Transporter\Payload;

interface Transporter
{
    /**
     * Sends a request to the Resend API.
     *
     * @param  \Resend\ValueObjects\Transporter\Payload  $payload
     * @return array<array-key, mixed>
     */
    public function request(Payload $payload): array;
}
