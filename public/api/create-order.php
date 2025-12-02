<?php
error_reporting(0);
require_once 'config.php';

// Set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);
$amount = $data['amount']; // Amount in paise

if (empty($amount) || !is_numeric($amount)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid amount provided."]);
    exit();
}

$key_id = RAZORPAY_KEY_ID;
$key_secret = RAZORPAY_KEY_SECRET;

// Prepare order data
$order_data = [
    'receipt'         => 'rcptid_' . time(),
    'amount'          => $amount,
    'currency'        => 'INR',
    'payment_capture' => 1 // Auto-capture payment
];

$order_payload = json_encode($order_data);

// Initialize cURL session
$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $order_payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($order_payload)
]);
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ':' . $key_secret);

// Execute cURL session
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Check response
if ($http_code === 200 || $http_code === 201) {
    $response_data = json_decode($response, true);
    http_response_code(200);
    echo json_encode(["order_id" => $response_data['id']]);
} else {
    http_response_code(500);
    $response_data = json_decode($response, true);
    $error_message = $response_data['error']['description'] ?? 'An unknown error occurred with Razorpay.';
    if ($curl_error) {
        $error_message = "cURL Error: " . $curl_error;
    }
    echo json_encode(["success" => false, "error" => $error_message, "details" => $response]);
}
?>
