<?php
// Suppress warnings and notices to ensure clean JSON output
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- IMPORTANT: REPLACE WITH YOUR RAZORPAY KEYS ---
$keyId = 'YOUR_RAZORPAY_KEY_ID';
$keySecret = 'YOUR_RAZORPAY_KEY_SECRET';
// ----------------------------------------------------

$data = json_decode(file_get_contents('php://input'), true);

$amount = $data['amount'] ?? 0;

if ($amount < 50000) { // Assuming minimum 500 INR (50000 paise)
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount. Minimum is 500 INR.']);
    exit;
}

$orderData = [
    'receipt'         => 'rcptid_' . uniqid(),
    'amount'          => $amount,
    'currency'        => 'INR',
    'payment_capture' => 1 // Auto capture
];

$api_url = 'https://api.razorpay.com/v1/orders';

$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($orderData));
curl_setopt($ch, CURLOPT_USERPWD, $keyId . ':' . $keySecret);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error creating order: ' . $curl_error]);
    exit;
}

if ($http_code >= 200 && $http_code < 300) {
    $response_data = json_decode($response, true);
    http_response_code(200);
    echo json_encode(['order_id' => $response_data['id']]);
} else {
    http_response_code($http_code);
    echo json_encode(['error' => 'Failed to create Razorpay order.', 'details' => json_decode($response)]);
}
?>
