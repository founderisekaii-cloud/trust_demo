<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Use the bundled autoloader
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

use Razorpay\Api\Api;

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

$amount = $data['amount'] ?? 0;

if ($amount < 50000) { // Amount is in paise, so 500 INR = 50000 paise
    http_response_code(400);
    echo json_encode(['error' => 'Donation amount must be at least ₹500.']);
    exit;
}

try {
    $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

    $orderData = [
        'receipt'         => 'rcptid_' . time(),
        'amount'          => $amount,
        'currency'        => 'INR',
        'payment_capture' => 1 // Auto capture
    ];

    $razorpayOrder = $api->order->create($orderData);
    $order_id = $razorpayOrder['id'];

    if ($order_id) {
        http_response_code(200);
        echo json_encode(['order_id' => $order_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create Razorpay order.']);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'An error occurred with the payment gateway.',
        'details' => $e->getMessage()
    ]);
}
?>
