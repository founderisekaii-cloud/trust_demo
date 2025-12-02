<?php

namespace Razorpay\Api;

class Api
{
    public function __construct($keyId, $keySecret)
    {
        $this->keyId = $keyId;
        $this->keySecret = $keySecret;
        $this->order = new Order($keyId, $keySecret);
    }
}
