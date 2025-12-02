<?php
// Disable error reporting for production
error_reporting(0);
ini_set('display_errors', 0);

// Allow POST requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include the configuration and the new autoloader
require_once 'config.inc.php';
require_once 'vendor/autoload.php';

// Import the Razorpay API class
use Razorpay\Api\Api;

// Check if the required constants are defined
if (!defined('RAZORPAY_KEY_ID') || !defined('RAZORPAY_KEY_SECRET')) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: Razorpay keys are not defined.']);
    exit;
}

// Get the POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Basic validation
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['amount']) || !is_numeric($data['amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Required field: amount (numeric).']);
    exit;
}

$amount = intval($data['amount']);
$receiptId = 'rcpt_' . time();

try {
    // Initialize Razorpay client
    $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
    
    // Create the order
    $order = $api->order->create([
        'receipt' => $receiptId,
        'amount' => $amount,
        'currency' => 'INR',
        'payment_capture' => 1 // Auto-capture payment
    ]);

    if (!$order || !isset($order['id'])) {
        throw new Exception("Failed to create order with Razorpay.");
    }

    http_response_code(200);
    echo json_encode(['order_id' => $order['id']]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create payment order: ' . $e->getMessage()]);
}

?>
