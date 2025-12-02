<?php

namespace Resend;

use Resend\Contracts\Client as ClientContract;
use Resend\ValueObjects\ApiKey;

final class Resend
{
    /**
     * The client to be used for all requests.
     */
    private static ClientContract $client;

    /**
     * The API key to be used for all requests.
     */
    private static ?ApiKey $apiKey = null;

    /**
     * Creates a new client with the given API key.
     */
    public static function client(string $apiKey): ClientContract
    {
        if (! isset(static::$client) || static::$apiKey !== ApiKey::from($apiKey)) {
            static::$apiKey = ApiKey::from($apiKey);
            static::$client = new Client(static::$apiKey);
        }

        return static::$client;
    }
}
