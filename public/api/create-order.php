<?php
// Enable full error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include the autoloader and the configuration file
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

use Razorpay\Api\Api;

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

// Basic validation
if (!$data || !isset($data->amount) || !is_numeric($data->amount)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad Request: Missing or invalid amount.']);
    exit();
}

$amount = (int) $data->amount; // Amount should be in paise
$receipt_id = 'rcpt_' . time();

// Initialize Razorpay API with keys from config
$api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

// Create the order
try {
    $order = $api->order->create([
        'receipt'         => $receipt_id,
        'amount'          => $amount,
        'currency'        => 'INR',
        'payment_capture' => 1 // Auto capture
    ]);

    if (!$order || !isset($order['id'])) {
        throw new Exception("Failed to create order. Razorpay response was invalid.");
    }
    
    $order_id = $order['id'];

    http_response_code(200);
    echo json_encode(['order_id' => $order_id]);

} catch (\Exception $e) {
    http_response_code(500);
    // Return the actual exception message for debugging
    echo json_encode(['error' => 'An exception occurred: ' . $e->getMessage()]);
}
?>