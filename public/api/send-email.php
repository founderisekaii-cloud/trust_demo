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

// Basic validation
if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Incomplete data. Please fill out all fields."]);
    exit();
}

$name = $data['name'];
$email = $data['email'];
$subject = $data['subject'];
$message = $data['message'];
$isSubscription = isset($data['isSubscription']) && $data['isSubscription'];

$resend_api_key = RESEND_API_KEY;
$to_email = $isSubscription ? SUBSCRIBE_TO_EMAIL : CONTACT_FORM_TO_EMAIL;
$from_email = 'onboarding@resend.dev'; // Resend requires a verified domain, using their default for now.

// Email content
$html_content = "
  <html>
  <body>
    <h2>New Message via Website</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Subject:</strong> {$subject}</p>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
  </body>
  </html>
";

$payload = [
    'from' => $from_email,
    'to' => [$to_email],
    'subject' => $subject,
    'html' => $html_content,
    'reply_to' => $email
];

// Initialize cURL session
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resend_api_key
]);

// Execute cURL session
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Check response
if ($http_code === 200) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
} else {
    http_response_code(500);
    $response_data = json_decode($response, true);
    $error_message = $response_data['message'] ?? 'An unknown error occurred while sending the email.';
    if ($curl_error) {
        $error_message = "cURL Error: " . $curl_error;
    }
    echo json_encode(["success" => false, "error" => $error_message, "details" => $response]);
}
?>
