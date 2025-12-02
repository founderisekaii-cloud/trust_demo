<?php

declare(strict_types=1);

namespace Resend\Client;

use Resend\Contracts\Client as ClientContract;
use Resend\Exceptions\ErrorException;
use Resend\Exceptions\TransporterException;
use Resend\Exceptions\UnprocessableEntityException;
use Resend\ValueObjects\Transporter\BaseUri;
use Resend\ValueObjects\Transporter\Headers;
use Resend\ValueObjects\Transporter\Payload;
use Resend\ValueObjects\Transporter\Response;
use Psr\Http\Client\ClientExceptionInterface;
use Psr\Http\Client\ClientInterface;
use Psr\Http\Message\RequestFactoryInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Psr\Http\Message\ResponseInterface;

final class Client implements ClientContract
{
    /**
     * Create a new HTTP Client instance.
     */
    public function __construct(
        private readonly ClientInterface $client,
        private readonly BaseUri $baseUri,
        private readonly Headers $headers,
        private readonly RequestFactoryInterface $requestFactory,
        private readonly StreamFactoryInterface $streamFactory
    ) {
        //
    }

    /**
     * {@inheritdoc}
     */
    public function request(Payload $payload): Response
    {
        $request = $this->requestFactory->createRequest(
            $payload->method()->value,
            $this->baseUri->toString() . $payload->uri()->toString(),
        );

        $body = json_encode($payload->parameters(), JSON_THROW_ON_ERROR);

        $stream = $this->streamFactory->createStream($body);

        $request = $request->withBody($stream);

        foreach ($this->headers->toArray() as $name => $value) {
            $request = $request->withHeader($name, $value);
        }

        try {
            $response = $this->client->sendRequest($request);
        } catch (ClientExceptionInterface $clientException) {
            throw new TransporterException($clientException);
        }

        $contents = $response->getBody()->getContents();

        $this->throwIfJsonError($response, $contents);

        $response = Response::from($contents);

        if (422 === $response->statusCode()) {
            throw new UnprocessableEntityException($response);
        }

        if ($response->isError()) {
            throw new ErrorException($response);
        }

        return $response;
    }

    /**
     * Throw an exception if the response is a JSON error.
     */
    private function throwIfJsonError(ResponseInterface $response, string $contents): void
    {
        if (str_starts_with($response->getHeaderLine('Content-Type'), 'application/json')) {
            json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
        }
    }
}
