<?php

declare(strict_types=1);

use Resend\Client\Client;
use Resend\Resources\ApiKeys;
use Resend\Resources\Audiences;
use Resend\Resources\Batch;
use Resend\Resources\Contacts;
use Resend\Resources\Domains;
use Resend\Resources\Emails;
use Resend\Resources\Webhooks;
use Resend\Transporters\HttpTransporter;
use Resend\ValueObjects\ApiKey;
use Resend\ValueObjects\Transporter\BaseUri;
use Resend\ValueObjects\Transporter\Headers;

final class Resend
{
    /**
     * The client instance.
     */
    private readonly Client $client;

    /**
     * Create a new Resend instance.
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Creates a new Resend Client with the given API key.
     */
    public static function client(string $apiKey): self
    {
        $apiKey = ApiKey::from($apiKey);
        $baseUri = BaseUri::from('api.resend.com');
        $headers = Headers::withAuthorization($apiKey);

        // A basic PSR-18 client and PSR-17 factory implementation.
        // In a real application, you would use a proper library for this.
        $psr18Client = new class() implements Psr\Http\Client\ClientInterface {
            public function sendRequest(\Psr\Http\Message\RequestInterface $request): \Psr\Http\Message\ResponseInterface
            {
                $options = [
                    'http' => [
                        'method' => $request->getMethod(),
                        'header' => array_reduce(array_keys($request->getHeaders()), function ($carry, $key) use ($request) {
                            return $carry . $key . ': ' . $request->getHeaderLine($key) . "\r\n";
                        }, ''),
                        'content' => (string) $request->getBody(),
                        'ignore_errors' => true,
                    ],
                ];

                $context = stream_context_create($options);
                $responseBody = file_get_contents((string) $request->getUri(), false, $context);
                
                $http_response_header = $http_response_header ?? [];
                
                preg_match('/^HTTP\/[1-2](?:\.\d)?\s+(\d{3})/', $http_response_header[0] ?? '', $matches);
                $statusCode = isset($matches[1]) ? (int) $matches[1] : 500;

                $responseHeaders = [];
                foreach ($http_response_header as $header) {
                    $parts = explode(': ', $header, 2);
                    if (count($parts) === 2) {
                        $responseHeaders[$parts[0]] = $parts[1];
                    }
                }

                $response = new \Resend\Client\BasicResponse($statusCode, $responseHeaders, $responseBody);
                
                return $response;
            }
        };

        $psr17Factory = new \Resend\Client\BasicRequestFactory();

        $transporter = new HttpTransporter($psr18Client, $baseUri, $headers, $psr17Factory, $psr17Factory);
        $client = new Client($transporter);

        return new self($client);
    }

    /**
     * Get the API Keys resource.
     */
    public function apiKeys(): ApiKeys
    {
        return new ApiKeys($this->client);
    }

    /**
     * Get the Audiences resource.
     */
    public function audiences(): Audiences
    {
        return new Audiences($this->client);
    }

    /**
     * Get the Batch resource.
     */
    public function batch(): Batch
    {
        return new Batch($this->client);
    }

    /**
     * Get the Contacts resource.
     */
    public function contacts(): Contacts
    {
        return new Contacts($this->client);
    }

    /**
     * Get the Domains resource.
     */
    public function domains(): Domains
    {
        return new Domains($this->client);
    }

    /**
     * Get the Emails resource.
     */
    public function emails(): Emails
    {
        return new Emails($this->client);
    }

    /**
     * Get the Webhooks resource.
     */
    public function webhooks(): Webhooks
    {
        return new Webhooks($this->client);
    }
}

// Basic PSR-17 and PSR-7 implementations below.
// This is to avoid requiring a full PSR-7/17/18 library for simple use cases.
namespace Resend\Client;

class BasicResponse implements \Psr\Http\Message\ResponseInterface {
    private $statusCode;
    private $headers;
    private $body;
    private $reasonPhrase;

    public function __construct(int $statusCode, array $headers, string $body) {
        $this->statusCode = $statusCode;
        $this->headers = $headers;
        $this->body = new BasicStream($body);
    }
    public function getProtocolVersion() { return '1.1'; }
    public function withProtocolVersion($version) { $clone = clone $this; return $clone; }
    public function getHeaders() { return $this->headers; }
    public function hasHeader($name) { return isset($this->headers[strtolower($name)]); }
    public function getHeader($name) { return $this->hasHeader($name) ? [$this->headers[strtolower($name)]] : []; }
    public function getHeaderLine($name) { return $this->hasHeader($name) ? $this->headers[strtolower($name)] : ''; }
    public function withHeader($name, $value) { $clone = clone $this; $clone->headers[strtolower($name)] = $value; return $clone; }
    public function withAddedHeader($name, $value) { return $this->withHeader($name, $value); }
    public function withoutHeader($name) { $clone = clone $this; unset($clone->headers[strtolower($name)]); return $clone; }
    public function getBody() { return $this->body; }
    public function withBody(\Psr\Http\Message\StreamInterface $body) { $clone = clone $this; $clone->body = $body; return $clone; }
    public function getStatusCode() { return $this->statusCode; }
    public function withStatus($code, $reasonPhrase = '') { $clone = clone $this; $clone->statusCode = $code; $clone->reasonPhrase = $reasonPhrase; return $clone; }
    public function getReasonPhrase() { return $this->reasonPhrase ?? ''; }
}

class BasicRequestFactory implements \Psr\Http\Message\RequestFactoryInterface, \Psr\Http\Message\StreamFactoryInterface {
    public function createRequest(string $method, $uri): \Psr\Http\Message\RequestInterface {
        return new BasicRequest($method, $uri);
    }
    public function createStream(string $content = ''): \Psr\Http\Message\StreamInterface {
        return new BasicStream($content);
    }
    public function createStreamFromFile(string $filename, string $mode = 'r'): \Psr\Http\Message\StreamInterface { throw new \Exception('Not implemented'); }
    public function createStreamFromResource($resource): \Psr\Http\Message\StreamInterface { throw new \Exception('Not implemented'); }
}

class BasicRequest implements \Psr\Http\Message\RequestInterface {
    private $method;
    private $uri;
    private $headers = [];
    private $body;

    public function __construct(string $method, $uri) {
        $this->method = $method;
        $this->uri = is_string($uri) ? new BasicUri($uri) : $uri;
    }
    public function getRequestTarget() { return (string) $this->uri; }
    public function withRequestTarget($requestTarget) { return $this; }
    public function getMethod() { return $this->method; }
    public function withMethod($method) { $clone = clone $this; $clone->method = $method; return $clone; }
    public function getUri() { return $this->uri; }
    public function withUri(\Psr\Http\Message\UriInterface $uri, $preserveHost = false) { $clone = clone $this; $clone->uri = $uri; return $clone; }
    public function getProtocolVersion() { return '1.1'; }
    public function withProtocolVersion($version) { return $this; }
    public function getHeaders() { return $this->headers; }
    public function hasHeader($name) { return isset($this->headers[strtolower($name)]); }
    public function getHeader($name) { return $this->hasHeader($name) ? [$this->headers[strtolower($name)]] : []; }
    public function getHeaderLine($name) { return $this->hasHeader($name) ? $this->headers[strtolower($name)] : ''; }
    public function withHeader($name, $value) { $clone = clone $this; $clone->headers[strtolower($name)] = $value; return $clone; }
    public function withAddedHeader($name, $value) { return $this->withHeader($name, $value); }
    public function withoutHeader($name) { $clone = clone $this; unset($clone->headers[strtolower($name)]); return $clone; }
    public function getBody() { return $this->body; }
    public function withBody(\Psr\Http\Message\StreamInterface $body) { $clone = clone $this; $clone->body = $body; return $clone; }
}

class BasicStream implements \Psr\Http\Message\StreamInterface {
    private $content;
    private $position = 0;
    public function __construct(string $content) { $this->content = $content; }
    public function __toString(): string { return $this->content; }
    public function close() {}
    public function detach() { return null; }
    public function getSize() { return strlen($this->content); }
    public function tell() { return $this->position; }
    public function eof() { return $this->position >= $this->getSize(); }
    public function isSeekable() { return true; }
    public function seek($offset, $whence = SEEK_SET) { $this->position = $offset; }
    public function rewind() { $this->seek(0); }
    public function isWritable() { return false; }
    public function write($string) { return 0; }
    public function isReadable() { return true; }
    public function read($length) { $chunk = substr($this->content, $this->position, $length); $this->position += strlen($chunk); return $chunk; }
    public function getContents() { return $this->read($this->getSize()); }
    public function getMetadata($key = null) { return null; }
}

class BasicUri implements \Psr\Http\Message\UriInterface {
    private $uri;
    public function __construct(string $uri) { $this->uri = $uri; }
    public function getScheme() { return ''; }
    public function getAuthority() { return ''; }
    public function getUserInfo() { return ''; }
    public function getHost() { return ''; }
    public function getPort() { return null; }
    public function getPath() { return ''; }
    public function getQuery() { return ''; }
    public function getFragment() { return ''; }
    public function withScheme($scheme) { return $this; }
    public function withUserInfo($user, $password = null) { return $this; }
    public function withHost($host) { return $this; }
    public function withPort($port) { return $this; }
    public function withPath($path) { return $this; }
    public function withQuery($query) { return $this; }
    public function withFragment($fragment) { return $this; }
    public function __toString(): string { return $this->uri; }
}
