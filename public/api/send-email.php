<?php
// Disable error reporting for production
error_reporting(0);
ini_set('display_errors', 0);

// Allow POST requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include the configuration and the new autoloader
require_once 'config.inc.php';
require_once 'vendor/autoload.php';

// Check if the required constants are defined
if (!defined('RESEND_API_KEY') || !defined('SENDER_EMAIL') || !defined('CONTACT_FORM_TO_EMAIL')) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: API keys or email constants are not defined.']);
    exit;
}

// Get the POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Basic validation
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Required fields: email, subject, message.']);
    exit;
}

$name = $data['name'] ?? 'No name provided';
$email = $data['email'];
$subject = $data['subject'];
$message = $data['message'];
$isSubscription = isset($data['isSubscription']) && $data['isSubscription'];

try {
    // Initialize Resend client
    $resend = Resend::client(RESEND_API_KEY);

    $toEmail = $isSubscription ? SUBSCRIBE_TO_EMAIL : CONTACT_FORM_TO_EMAIL;
    $fromAddress = 'Vikhyat Foundation <' . SENDER_EMAIL . '>';
    
    $resend->emails->send([
        'from' => $fromAddress,
        'to' => [$toEmail],
        'subject' => $subject,
        'html' => nl2br(htmlspecialchars($message)),
        'reply_to' => $email,
        'headers' => [
            'X-Entity-Ref-ID' => 'Vikhyat-Contact-Form-Submission',
        ],
    ]);
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $e->getMessage()]);
}

?>
