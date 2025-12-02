<?php

namespace Resend\Resources;

use Resend\Responses\Email\Email as EmailResponse;

final class Email extends Resource
{
    /**
     * Send an email.
     *
     * @see https://resend.com/docs/api-reference/emails/send-email
     *
     * @param  array<string, mixed>  $parameters
     */
    public function send(array $parameters): EmailResponse
    {
        $response = $this->transporter->request('POST', 'emails', $parameters);

        return EmailResponse::from($response);
    }

    /**
     * Retrieve a single email.
     *
     * @see https://resend.com/docs/api-reference/emails/get-email
     */
    public function get(string $emailId): EmailResponse
    {
        $response = $this->transporter->request('GET', "emails/$emailId");

        return EmailResponse::from($response);
    }
}
