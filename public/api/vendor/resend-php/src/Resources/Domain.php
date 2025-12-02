<?php

namespace Resend\Resources;

use Resend\Responses\Domain\Domain as DomainResponse;
use Resend\Responses\Domain\DomainList;

final class Domain extends Resource
{
    /**
     * Create a Domain.
     *
     * @see https://resend.com/docs/api-reference/domains/create-domain
     *
     * @param  array<string, mixed>  $parameters
     */
    public function create(array $parameters): DomainResponse
    {
        $response = $this->transporter->request('POST', 'domains', $parameters);

        return DomainResponse::from($response);
    }

    /**
     * Retrieve a list of Domains.
     *
     * @see https://resend.com/docs/api-reference/domains/list-domains
     */
    public function list(): DomainList
    {
        $response = $this->transporter->request('GET', 'domains');

        return DomainList::from($response);
    }

    /**
     * Retrieve a single Domain.
     *
     * @see https://resend.com/docs/api-reference/domains/get-domain
     */
    public function get(string $domainId): DomainResponse
    {
        $response = $this->transporter->request('GET', "domains/$domainId");

        return DomainResponse::from($response);
    }

    /**
     * Remove a Domain.
     *
     * @see https://resend.com/docs/api-reference/domains/delete-domain
     */
    public function remove(string $domainId): bool
    {
        $this->transporter->request('DELETE', "domains/$domainId");

        return true;
    }

    /**
     * Verify a Domain.
     *
     * @see https://resend.com/docs/api-reference/domains/verify-domain
     */
    public function verify(string $domainId): bool
    {
        $this->transporter->request('POST', "domains/$domainId/verify");

        return true;
    }
}
