<?php
// Enable full error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/config.inc.php';
require_once __DIR__ . '/vendor/autoload.php';

use Razorpay\Api\Api;

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Amount is required']);
    exit;
}

$amount = $data['amount'];

try {
    $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

    $orderData = [
        'receipt'         => 'rcptid_' . uniqid(),
        'amount'          => $amount,
        'currency'        => 'INR',
        'payment_capture' => 1 // 1 for automatic capture
    ];

    $razorpayOrder = $api->order->create($orderData);

    if (!isset($razorpayOrder['id'])) {
        throw new Exception('Failed to create Razorpay order.');
    }

    echo json_encode([
        'order_id' => $razorpayOrder['id'],
        'razorpay_key_id' => RAZORPAY_KEY_ID,
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while creating the payment order.', 'details' => $e->getMessage()]);
}
