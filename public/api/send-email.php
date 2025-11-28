<?php
// Suppress warnings and notices to ensure clean JSON output
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- IMPORTANT: REPLACE WITH YOUR RESEND API KEY ---
$resendApiKey = 'YOUR_RESEND_API_KEY';
// ----------------------------------------------------

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? 'No Name Provided';
$fromEmail = $data['email'] ?? 'no-reply@yourdomain.com';
$subject = $data['subject'] ?? 'No Subject';
$message = $data['message'] ?? 'No message content.';

// Validation
if (empty($name) || empty($fromEmail) || empty($subject) || empty($message) || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Please fill all fields correctly.']);
    exit;
}

$resend_payload = [
    'from' => 'Vikhyat Foundation <onboarding@resend.dev>', // Resend requires a verified domain, 'onboarding' is for testing.
    'to' => ['vikhyatfoundation@gmail.com'],
    'subject' => 'Contact Form Inquiry: ' . $subject,
    'html' => "
        <p>You have received a new message from your website contact form.</p>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$fromEmail}</p>
        <p><strong>Message:</strong></p>
        <p>{$message}</p>
    "
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resendApiKey
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($resend_payload));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $curl_error]);
    exit;
}

if ($http_code >= 200 && $http_code < 300) {
    http_response_code(200);
    echo json_encode(['message' => 'Email sent successfully!']);
} else {
    http_response_code($http_code);
    $response_data = json_decode($response, true);
    $error_message = $response_data['message'] ?? 'Failed to send email due to an unknown API error.';
    echo json_encode(['error' => $error_message, 'details' => $response]);
}
?>
