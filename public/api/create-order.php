<?php
error_reporting(0);
include 'config.inc.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Read the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);
$amount = $data['amount'];

if (empty($amount)) {
    echo json_encode(['error' => 'Amount is required.']);
    exit;
}

$key_id = RAZORPAY_KEY_ID;
$key_secret = RAZORPAY_KEY_SECRET;

$url = 'https://api.razorpay.com/v1/orders';
$receipt_id = 'receipt_' . time();
$data = [
    'receipt' => $receipt_id,
    'amount' => $amount,
    'currency' => 'INR',
    'payment_capture' => 1
];
$json_data = json_encode($data);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ':' . $key_secret);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    curl_close($ch);
    echo json_encode(['error' => 'cURL Error: ' . $error_msg]);
    exit;
}

curl_close($ch);

$order_data = json_decode($response, true);

if ($http_status != 200) {
    echo json_encode(['error' => 'Razorpay API Error: ' . ($order_data['error']['description'] ?? 'Unknown error')]);
    exit;
}

echo json_encode(['order_id' => $order_data['id']]);
?>
