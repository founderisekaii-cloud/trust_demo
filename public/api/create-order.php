<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

use Razorpay\Api\Api;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 0;

if ($amount < 50000) { // Minimum amount of 500 INR (50000 paise)
    http_response_code(400);
    echo json_encode(['error' => 'Donation amount must be at least ₹500.']);
    exit;
}

$api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

$orderData = [
    'receipt'         => 'rcptid_' . uniqid(),
    'amount'          => $amount,
    'currency'        => 'INR',
    'payment_capture' => 1 // Auto capture
];

try {
    $razorpayOrder = $api->order->create($orderData);
    echo json_encode(['order_id' => $razorpayOrder['id']]);
} catch (Exception $e) {
    http_response_code(500);
    error_log('Razorpay Error: ' . $e->getMessage());
    echo json_encode(['error' => 'Failed to create Razorpay order.', 'details' => $e->getMessage()]);
}
?>
