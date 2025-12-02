<?php

namespace Resend\Contracts;

use Resend\Client as ResendClient;
use Resend\Resources;

interface Client
{
    /**
     * Create a new client instance.
     */
    public function __construct(\Resend\ValueObjects\ApiKey $apiKey);

    /**
     * Get the API Key resource.
     */
    public function apiKeys(): Resources\ApiKey;

    /**
     * Get the Domain resource.
     */
    public function domains(): Resources\Domain;

    /**
     * Get the Email resource.
     */
    public function emails(): Resources\Email;
}
