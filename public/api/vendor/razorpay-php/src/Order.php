<?php

namespace Razorpay\Api;

class Order
{
    protected $client;
    protected $keyId;
    protected $keySecret;

    public function __construct($keyId, $keySecret)
    {
        $this->keyId = $keyId;
        $this->keySecret = $keySecret;
    }

    public function create(array $attributes)
    {
        $url = 'https://api.razorpay.com/v1/orders';
        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n" .
                            "Authorization: Basic " . base64_encode($this->keyId . ":" . $this->keySecret) . "\r\n",
                'content' => json_encode($attributes),
                'ignore_errors' => true
            ]
        ];

        $context = stream_context_create($options);
        $responseBody = file_get_contents($url, false, $context);
        
        $response = json_decode($responseBody, true);

        if (isset($response['error'])) {
            throw new \Exception($response['error']['description']);
        }
        
        return $response;
    }
}
