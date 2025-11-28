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

// --- IMPORTANT: REPLACE WITH YOUR ACTUAL RESEND API KEY ---
$resendApiKey = 'YOUR_RESEND_API_KEY';

// Read the incoming POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Basic validation
if (json_last_error() !== JSON_ERROR_NONE || !isset($input['name']) || !isset($input['email']) || !isset($input['subject']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON or missing fields']);
    exit;
}

$name = $input['name'];
$email = $input['email'];
$subject = $input['subject'];
$message = $input['message'];

// Construct email content
$htmlBody = "
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
    <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
    <p><strong>Message:</strong></p>
    <p>" . nl2br(htmlspecialchars($message)) . "</p>
";

// Prepare the data payload for Resend API
$data = [
    'from' => 'Vikhyat Foundation <onboarding@resend.dev>', // Replace with your verified "from" address
    'to' => ['vikhyatfoundation@gmail.com'], // The email address that will receive the form submissions
    'subject' => 'New Message from Website: ' . $subject,
    'html' => $htmlBody,
    'reply_to' => $email
];

$dataJson = json_encode($data);

// Initialize cURL session
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);

// Set headers, including the Authorization header
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resendApiKey,
];
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

// Return success or failure response
if ($httpcode >= 200 && $httpcode < 300) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully!']);
} else {
    http_response_code($httpcode);
    echo $result; // Forward Resend's error response
}
?>
