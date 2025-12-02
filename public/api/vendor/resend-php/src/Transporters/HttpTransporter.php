<?php

namespace Resend\Transporters;

use Exception;
use JsonException;
use Psr\Http\Client\ClientExceptionInterface;
use Psr\Http\Client\ClientInterface;
use Psr\Http\Message\RequestFactoryInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Resend\Contracts\Transporter;
use Resend\Exceptions\ErrorException;
use Resend\Exceptions\TransporterException;
use Resend\Exceptions\UnserializableResponse;
use Resend\ValueObjects\Transporter\BaseUri;
use Resend\ValueObjects\Transporter\Headers;
use Resend\ValueObjects\Transporter\Payload;

class HttpTransporter implements Transporter
{
    /**
     * The HTTP client.
     */
    private readonly ClientInterface $client;

    /**
     * The request factory.
     */
    private readonly RequestFactoryInterface $requestFactory;

    /**
     * The stream factory.
     */
    private readonly StreamFactoryInterface $streamFactory;

    /**
     * Create a new HTTP transporter instance.
     */
    public function __construct(
        private readonly BaseUri $baseUri,
        private readonly Headers $headers,
        ?ClientInterface $client = null,
        ?RequestFactoryInterface $requestFactory = null,
        ?StreamFactoryInterface $streamFactory = null
    ) {
        $this->client = $client ?? \Resend\Discovery\ClientDiscovery::find();
        $this->requestFactory = $requestFactory ?? \Resend\Discovery\RequestFactoryDiscovery::find();
        $this->streamFactory = $streamFactory ?? \Resend\Discovery\StreamFactoryDiscovery::find();
    }

    /**
     * {@inheritDoc}
     */
    public function request(Payload $payload): array
    {
        $request = $this->requestFactory->createRequest(
            $payload->method(),
            $this->baseUri->toString() . $payload->uri()
        );

        foreach ($this->headers->toArray() as $name => $value) {
            $request = $request->withHeader($name, $value);
        }

        if ($payload->method() === 'POST') {
            $body = $this->streamFactory->createStream(
                json_encode($payload->parameters(), JSON_THROW_ON_ERROR)
            );

            $request = $request->withBody($body);
        }

        try {
            $response = $this->client->sendRequest($request);
        } catch (ClientExceptionInterface $clientException) {
            throw new TransporterException($clientException);
        }

        $contents = $response->getBody()->getContents();

        try {
            $response = json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $jsonException) {
            throw new UnserializableResponse($jsonException);
        }

        if (isset($response['error'])) {
            throw new ErrorException($response['error']);
        }

        if (isset($response['message'])) {
            throw new Exception($response['message']);
        }

        return $response;
    }
}
