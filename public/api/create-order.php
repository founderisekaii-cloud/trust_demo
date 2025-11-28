<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- IMPORTANT: REPLACE WITH YOUR ACTUAL RAZORPAY KEYS ---
$keyId = 'YOUR_RAZORPAY_KEY_ID';
$keySecret = 'YOUR_RAZORPAY_KEY_SECRET';

// Read the incoming POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if (json_last_error() !== JSON_ERROR_NONE || !isset($input['amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON or missing amount']);
    exit;
}

$amount = $input['amount'];
$receiptId = 'rcpt_' . time();

// Prepare the order data for Razorpay API
$orderData = [
    'receipt'         => $receiptId,
    'amount'          => $amount,
    'currency'        => 'INR',
    'payment_capture' => 1 // Auto-capture the payment
];

$orderDataJson = json_encode($orderData);

// Initialize cURL session
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $orderDataJson);
curl_setopt($ch, CURLOPT_USERPWD, $keyId . ':' . $keySecret);

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Execute cURL and get the result
$result = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

// Get HTTP status code
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Handle Razorpay API response
if ($httpcode >= 200 && $httpcode < 300) {
    $razorpayOrder = json_decode($result, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        http_response_code(200);
        echo json_encode(['order_id' => $razorpayOrder['id']]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to parse Razorpay response']);
    }
} else {
    http_response_code($httpcode);
    echo $result; // Forward Razorpay's error response
}
?>
