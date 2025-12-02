<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Use the bundled autoloader
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

// Decode the incoming JSON payload
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

// Set a default 'from' name if one isn't provided (for subscriptions)
$fromName = $data['name'] ?? 'Newsletter Subscriber';

$resend = Resend::client(RESEND_API_KEY);

try {
    $result = $resend->emails->send([
        'from' => 'Vikhyat Foundation <' . SENDER_EMAIL . '>',
        'to' => [CONTACT_FORM_TO_EMAIL],
        'subject' => $data['subject'] ?? 'New Newsletter Subscription',
        'reply_to' => $data['email'],
        'html' => '
            <div style="font-family: sans-serif; line-height: 1.6;">
                <h2>New Message via Website Contact Form</h2>
                <p><strong>From:</strong> ' . htmlspecialchars($fromName) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($data['email']) . '</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>' . nl2br(htmlspecialchars($data['message'] ?? 'This user has subscribed to the newsletter.')) . '</p>
            </div>'
    ]);

    if ($result->id) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email. No ID returned.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'An error occurred while sending the email.',
        'details' => $e->getMessage()
    ]);
}
?>
