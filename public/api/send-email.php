<?php
// Enable full error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include the autoloader and the configuration file
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

// Basic validation
if (!$data || !isset($data->email) || !isset($data->name) || !isset($data->message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad Request: Missing required fields.']);
    exit();
}

// Initialize the Resend client with the API key from config
$resend = Resend::client(RESEND_API_KEY);

// Determine if it's a newsletter subscription
$isSubscription = isset($data->isSubscription) && $data->isSubscription;

$subject = $isSubscription ? 'New Newsletter Subscription' : ($data->subject ?? 'New Contact Form Submission');
$body = $isSubscription ? "Please add {$data->email} to the mailing list." : "Name: {$data->name}<br>Email: {$data->email}<br><br>Message:<br>{$data->message}";
$replyTo = $isSubscription ? SENDER_EMAIL : $data->email;

try {
    $result = $resend->emails->send([
        'from' => SENDER_NAME . ' <' . SENDER_EMAIL . '>',
        'to' => [RECIPIENT_EMAIL],
        'subject' => $subject,
        'html' => $body,
        'reply_to' => $replyTo
    ]);

    // Check if the email was sent successfully
    if ($result->id) {
        http_response_code(200);
        echo json_encode(['message' => 'Email sent successfully.']);
    } else {
        http_response_code(500);
        // Provide a more descriptive error based on Resend's potential response
        $error_message = 'Failed to send email. Resend API did not return a success ID.';
        if (isset($result->error)) {
             $error_message = $result->error->message ?? 'Unknown Resend API error.';
        }
        echo json_encode(['error' => $error_message]);
    }

} catch (\Exception $e) {
    http_response_code(500);
    // Return the actual exception message for debugging
    echo json_encode(['error' => 'An exception occurred: ' . $e->getMessage()]);
}
?>