<?php

namespace Resend\Resources;

use Resend\Responses\ApiKey\ApiKey as ApiKeyResponse;
use Resend\Responses\ApiKey\ApiKeyList;

final class ApiKey extends Resource
{
    /**
     * Create an API Key.
     *
     * @see https://resend.com/docs/api-reference/api-keys/create-api-key
     *
     * @param  array<string, mixed>  $parameters
     */
    public function create(array $parameters): ApiKeyResponse
    {
        $response = $this->transporter->request('POST', 'api-keys', $parameters);

        return ApiKeyResponse::from($response);
    }

    /**
     * Retrieve a list of API Keys.
     *
     * @see https://resend.com/docs/api-reference/api-keys/list-api-keys
     */
    public function list(): ApiKeyList
    {
        $response = $this->transporter->request('GET', 'api-keys');

        return ApiKeyList::from($response);
    }

    /**
     * Remove an API Key.
     *
     * @see https://resend.com/docs/api-reference/api-keys/delete-api-key
     */
    public function remove(string $apiKeyId): bool
    {
        $this->transporter->request('DELETE', "api-keys/$apiKeyId");

        return true;
    }
}
