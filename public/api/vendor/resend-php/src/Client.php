<?php

namespace Resend;

use Resend\Contracts\Client as ClientContract;
use Resend\Transporters\HttpTransporter;
use Resend\ValueObjects\ApiKey;
use Resend\ValueObjects\Transporter\BaseUri;
use Resend\ValueObjects\Transporter\Headers;

final class Client implements ClientContract
{
    /**
     * The transporter to be used by the client.
     */
    private HttpTransporter $transporter;

    /**
     * Create a new client instance.
     */
    public function __construct(ApiKey $apiKey)
    {
        $baseUri = BaseUri::from('api.resend.com');
        $headers = Headers::withAuthorization($apiKey);

        $this->transporter = new HttpTransporter($baseUri, $headers);
    }

    /**
     * {@inheritDoc}
     */
    public function apiKeys(): Resources\ApiKey
    {
        return new Resources\ApiKey($this->transporter);
    }

    /**
     * {@inheritDoc}
     */
    public function domains(): Resources\Domain
    {
        return new Resources\Domain($this->transporter);
    }

    /**
     * {@inheritDoc}
     */
    public function emails(): Resources\Email
    {
        return new Resources\Email($this->transporter);
    }
}
