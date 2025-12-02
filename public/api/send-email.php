<?php
// Suppress warnings and notices to ensure clean JSON output.
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.inc.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use POST.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input.']);
    exit;
}

$name = $data['name'] ?? 'Not provided';
$email = $data['email'] ?? '';
$subject = $data['subject'] ?? 'No Subject';
$message = $data['message'] ?? '';
$isSubscription = $data['isSubscription'] ?? false;

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email address is required.']);
    exit;
}

$to_email = $isSubscription ? SUBSCRIBE_TO_EMAIL : CONTACT_FORM_TO_EMAIL;
$final_subject = $isSubscription ? "New Newsletter Subscription" : "Contact Form: " . $subject;
$from_email_formatted = "Vikhyat Foundation <info@vikhyatfoundation.com>"; // A 'from' address on a verified domain.

// Construct the email body
$html_body = "
  <html>
  <head><title>{$final_subject}</title></head>
  <body>
    <h2>New Message Received</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Subject:</strong> {$subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
  </body>
  </html>
";

$resend_payload = [
    'from' => $from_email_formatted,
    'to' => [$to_email],
    'subject' => $final_subject,
    'html' => $html_body,
    'reply_to' => $email // Set the reply-to header to the user's email
];

if ($isSubscription) {
    // Also send a welcome email to the subscriber
    $welcome_payload = [
        'from' => $from_email_formatted,
        'to' => [$email],
        'subject' => 'Welcome to the Vikhyat Foundation Newsletter!',
        'html' => '<h1>Thank you for subscribing!</h1><p>You will now receive updates on our work and initiatives.</p>'
    ];
    // We will send this in a separate cURL request
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($resend_payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . RESEND_API_KEY
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email due to cURL error: ' . $curl_error]);
    exit;
}

if ($httpcode >= 200 && $httpcode < 300) {
    // Optionally send welcome email if it was a subscription
    if ($isSubscription && isset($welcome_payload)) {
        $ch_welcome = curl_init('https://api.resend.com/emails');
        curl_setopt($ch_welcome, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch_welcome, CURLOPT_POST, true);
        curl_setopt($ch_welcome, CURLOPT_POSTFIELDS, json_encode($welcome_payload));
        curl_setopt($ch_welcome, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . RESEND_API_KEY
        ]);
        curl_exec($ch_welcome);
        curl_close($ch_welcome);
    }
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully!']);
} else {
    http_response_code($httpcode);
    $response_data = json_decode($response, true);
    $error_message = $response_data['message'] ?? 'An unknown error occurred with the email service.';
    echo json_encode(['error' => $error_message, 'details' => $response]);
}
?>
