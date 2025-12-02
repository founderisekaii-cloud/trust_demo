<?php

namespace Razorpay\Api;

class Utility
{
    public function verifyPaymentSignature($attributes)
    {
        $actualSignature = $attributes['razorpay_signature'];
        
        $paymentId = $attributes['razorpay_payment_id'];

        if (isset($attributes['razorpay_order_id']) === true)
        {
            $orderId = $attributes['razorpay_order_id'];

            $payload = $orderId . '|' . $paymentId;
        }
        else
        {
            $payload = $paymentId;
        }

        $secret = Api::getSecret();

        return self::verifySignature($payload, $actualSignature, $secret);
    }

    public function verifyWebhookSignature($payload, $actualSignature, $secret)
    {
        return self::verifySignature($payload, $actualSignature, $secret);
    }

    private static function verifySignature($payload, $actualSignature, $secret)
    {
        $expectedSignature = hash_hmac('sha256', $payload, $secret);

        // Use lang's built-in hash_equals function to check signatures
        return hash_equals($expectedSignature, $actualSignature);
    }
}
