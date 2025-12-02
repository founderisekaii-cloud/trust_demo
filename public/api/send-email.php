<?php
// Include the central configuration file
require_once 'config.inc.php';

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Read the incoming JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Basic validation
if (!$data || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input. Missing required fields."]);
    exit;
}

// Extract data from the request
$from_name = $data['name'] ?? 'Anonymous';
$from_email = $data['email'];
$subject = $data['subject'];
$message_body = $data['message'];
$is_subscription = isset($data['isSubscription']) && $data['isSubscription'];

$to_email = $is_subscription ? SUBSCRIBE_TO_EMAIL : CONTACT_FORM_TO_EMAIL;

// --- Construct the email payload for Resend API ---
$payload = [
    'from' => 'Vikhyat Foundation <' . SENDER_EMAIL . '>',
    'to' => [$to_email],
    'subject' => $subject,
    'html' => nl2br(htmlspecialchars($message_body)),
    'reply_to' => $from_email // So you can reply directly to the user
];

// --- Initialize cURL session ---
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . RESEND_API_KEY
]);

// --- Execute cURL session and get the response ---
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- Handle the response ---
if ($http_code >= 200 && $http_code < 300) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
} else {
    http_response_code($http_code);
    // Return the error from Resend if available, otherwise a generic error
    $error_details = json_decode($response, true);
    echo json_encode([
        "error" => "Failed to send email.",
        "details" => $error_details['message'] ?? 'An unknown error occurred with the email service.',
        "statusCode" => $http_code
    ]);
}
?>
