<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'vendor/autoload.php';
require_once 'config.inc.php';

use Razorpay\Api\Api;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE || !isset($data['amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Amount is required.']);
    exit;
}

$amount = $data['amount'];
$receiptId = 'receipt_' . time();

try {
    $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

    $order = $api->order->create([
        'receipt'         => $receiptId,
        'amount'          => $amount,
        'currency'        => 'INR',
        'payment_capture' => 1
    ]);

    if (!$order || !isset($order['id'])) {
         throw new Exception("Order creation failed or order ID is missing.");
    }

    $order_id = $order['id'];
    http_response_code(200);
    echo json_encode(['order_id' => $order_id]);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to create Razorpay order: ' . $e->getMessage()
    ]);
}
?>