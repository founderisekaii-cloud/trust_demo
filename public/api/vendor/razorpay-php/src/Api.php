<?php

namespace Razorpay\Api;

class Api
{
    protected static $baseUrl = 'https://api.razorpay.com/v1/';

    protected static $key = null;

    protected static $secret = null;

    protected static $headers = array();
    
    public $order;
    public $payment;
    public $refund;
    public $customer;
    public $invoice;
    public $card;
    public $transfer;
    public $virtualAccount;
    public $subscription;
    public $plan;
    public $addon;

    public function __construct($key, $secret)
    {
        self::$key = $key;
        self::$secret = $secret;
        
        $this->order = new Order();
        $this->payment = new Payment();
        $this->refund = new Refund();
        $this->customer = new Customer();
        $this->invoice = new Invoice();
        $this->card = new Card();
        $this->transfer = new Transfer();
        $this->virtualAccount = new VirtualAccount();
        $this->subscription = new Subscription();
        $this->plan = new Plan();
        $this->addon = new Addon();
    }

    public function setAppDetails($title, $version = null)
    {
        $header = 'Razorpay-API';
        
        $app = array();

        $app['title'] = $title;

        if ($version)
        {
            $app['version'] = $version;
        }

        self::addHeader($header, json_encode($app));
    }

    public static function getBaseUrl()
    {
        return self::$baseUrl;
    }

    public static function getKey()
    {
        return self::$key;
    }

    public static function getSecret()
    {
        return self::$secret;
    }

    public static function getHeaders()
    {
        return self::$headers;
    }

    public static function addHeader($key, $value)
    {
        self::$headers[$key] = $value;
    }

    public static function request($method, $url, $data = array())
    {
        $url = self::$baseUrl . $url;

        $headers = self::getHeaders();

        $options = array(
            'auth' => array(self::$key, self::$secret)
        );

        if ($method === 'get')
        {
            $response = \Requests::get($url, $headers, $options);
        }
        else
        {
            $data = json_encode($data);
            $headers['Content-Type'] = 'application/json';
            $response = \Requests::$method($url, $headers, $data, $options);
        }

        return self::processResponse($response);
    }

    protected static function processResponse($response)
    {
        $body = json_decode($response->body, true);
        
        if ($response->status_code >= 200 and $response->status_code < 300)
        {
            return $body;
        }

        $code = $response->status_code;

        if (isset($body['error']) === true)
        {
            $error = $body['error'];

            $code = $error['code'];

            throw Errors\Error::create($response->body, $code);
        }

        //
        // If we don't have an error message from the API, we'll gracefully handle
        // it. All Guzzle exceptions extend from GuzzleHttp\Exception\TransferException.
        // We'll throw a generic server error for any Guzzle exceptions.
        //
        // After this, we will throw a generic server error.
        //
        throw new Errors\ServerError(
            'An unexpected error occurred.',
            Errors\ErrorCode::SERVER_ERROR,
            $response->status_code);
    }
}
