<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'vendor/autoload.php';
require_once 'config.inc.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input.']);
    exit;
}

$name = $data['name'] ?? 'N/A';
$email = $data['email'] ?? null;
$subject = $data['subject'] ?? 'No Subject';
$message = $data['message'] ?? '';
$isSubscription = isset($data['isSubscription']) && $data['isSubscription'];

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required.']);
    exit;
}

$resend = Resend::client(RESEND_API_KEY);

try {
    if ($isSubscription) {
        // --- ADMIN NOTIFICATION FOR SUBSCRIPTION ---
        $resend->emails->send([
            'from' => 'Vikhyat Foundation <' . SENDER_EMAIL . '>',
            'to' => [SUBSCRIBE_TO_EMAIL],
            'subject' => 'New Newsletter Subscriber',
            'html' => "<h1>New Subscriber</h1><p>A new person has subscribed to your newsletter: <strong>{$email}</strong></p>",
        ]);
        
        // --- SUBSCRIBER CONFIRMATION ---
        $resend->emails->send([
            'from' => 'Vikhyat Foundation <' . SENDER_EMAIL . '>',
            'to' => [$email],
            'subject' => 'Welcome to the Vikhyat Foundation Newsletter!',
            'html' => '<h1>Thank You for Subscribing!</h1><p>You are now part of our community. We will keep you updated on our latest initiatives.</p>',
        ]);

    } else {
        // --- CONTACT FORM SUBMISSION ---
        $resend->emails->send([
            'from' => 'Vikhyat Foundation <' . SENDER_EMAIL . '>',
            'to' => [CONTACT_FORM_TO_EMAIL],
            'subject' => "New Contact Form Message: {$subject}",
            'reply_to' => $email,
            'html' => "<h1>New Message from {$name} ({$email})</h1><p>{$message}</p>",
        ]);
    }

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email: ' . $e->getMessage()
    ]);
}
?>