<?php

declare(strict_types=1);

namespace Resend\Contracts;

use Resend\ValueObjects\Transporter\Payload;
use Resend\ValueObjects\Transporter\Response;

interface Client
{
    /**
     * Send a request to the Resend API.
     */
    public function request(Payload $payload): Response;
}
