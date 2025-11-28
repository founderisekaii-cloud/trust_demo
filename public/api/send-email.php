<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// --- IMPORTANT: Replace with your Resend API Key ---
$apiKey = 'REPLACE_WITH_YOUR_RESEND_API_KEY';
// ---

// Read raw JSON input from the request body
$input_data = json_decode(file_get_contents('php://input'), true);

// Basic validation
if (json_last_error() !== JSON_ERROR_NONE || !isset($input_data['name']) || !isset($input_data['email']) || !isset($input_data['subject']) || !isset($input_data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input.']);
    exit;
}

$name = $input_data['name'];
$email = $input_data['email'];
$subject = $input_data['subject'];
$message = $input_data['message'];
$admin_email = 'vikhyatfoundation@gmail.com'; // Your email

// Prepare email content
$email_html = "
  <html>
  <body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Subject:</strong> {$subject}</p>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
  </body>
  </html>
";

$payload = [
    'from' => 'Vikhyat Foundation <onboarding@resend.dev>', // Must be a verified domain in Resend
    'to' => [$admin_email],
    'subject' => "New Contact Inquiry: {$subject}",
    'html' => $email_html,
    'reply_to' => $email
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code >= 200 && $http_code < 300) {
    http_response_code(200);
    echo json_encode(['message' => 'Email sent successfully']);
} else {
    http_response_code($http_code);
    echo json_encode(['error' => 'Failed to send email', 'details' => json_decode($response)]);
}
?>
