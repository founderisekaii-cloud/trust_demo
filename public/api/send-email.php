<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.inc.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? 'N/A';
$email = $input['email'] ?? '';
$subject = $input['subject'] ?? 'New Inquiry from Website';
$message = $input['message'] ?? '';
$isSubscription = $input['isSubscription'] ?? false;

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email address is required.']);
    exit;
}

$resend = Resend::client(RESEND_API_KEY);

$htmlBody = $isSubscription
    ? "<p>A new user has subscribed to the newsletter: <strong>{$email}</strong></p>"
    : <<<EOD
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Subject:</strong> {$subject}</p>
        <p><strong>Message:</strong></p>
        <p>{$message}</p>
EOD;

try {
    $result = $resend->emails->send([
        'from' => SENDER_NAME . ' <' . SENDER_EMAIL . '>',
        'to' => [RECIPIENT_EMAIL],
        'subject' => $subject,
        'html' => $htmlBody,
        'reply_to' => $email,
    ]);

    if ($result->id) {
        echo json_encode(['message' => 'Email sent successfully!']);
    } else {
        throw new Exception('Resend API did not return an ID.');
    }
} catch (Exception $e) {
    http_response_code(500);
    error_log('Resend Error: ' . $e->getMessage());
    echo json_encode(['error' => 'Failed to send email.', 'details' => $e->getMessage()]);
}
?>
