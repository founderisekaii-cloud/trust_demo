<?php

declare(strict_types=1);

namespace Resend\Resources;

use Resend\Concerns\MakesHttpRequests;
use Resend\Contracts\Resources\EmailsContract;
use Resend\Responses\Email\Email;
use Resend\Responses\Email\EmailSent;
use Resend\ValueObjects\Transporter\Payload;

final class Emails implements EmailsContract
{
    use MakesHttpRequests;

    /**
     * {@inheritdoc}
     */
    public function send(array $parameters): EmailSent
    {
        $payload = Payload::create('emails', $parameters);

        $result = $this->client->request($payload);

        return EmailSent::from($result->data());
    }

    /**
     * {@inheritdoc}
     */
    public function get(string $id): Email
    {
        $payload = Payload::retrieve('emails', $id);

        $result = $this->client->request($payload);

        return Email::from($result->data());
    }
}
