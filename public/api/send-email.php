<?php
// Enable full error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/config.inc.php';
require_once __DIR__ . '/vendor/autoload.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

$name = $data['name'] ?? 'Anonymous';
$email = $data['email'] ?? '';
$subject = $data['subject'] ?? 'No Subject';
$message = $data['message'] ?? '';

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Email address is required."]);
    exit;
}

// Check for the 'isSubscription' flag for newsletter subscriptions
$isSubscription = $data['isSubscription'] ?? false;
if ($isSubscription) {
    $emailSubject = 'New Newsletter Subscription';
    $emailBody = "<p>A new user has subscribed to the newsletter:</p><p><b>Email:</b> {$email}</p>";
} else {
    $emailSubject = "New Contact Form Message: " . $subject;
    $emailBody = "
        <h1>New Message from Vikhyat Foundation Website</h1>
        <p>You have received a new message through your contact form.</p>
        <hr>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
        <hr>
        <h2>Message:</h2>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    ";
}


try {
    $resend = Resend::client(RESEND_API_KEY);

    $result = $resend->emails->send([
        'from' => SENDER_EMAIL_FROM,
        'to' => [ADMIN_EMAIL],
        'subject' => $emailSubject,
        'html' => $emailBody,
        'reply_to' => $email,
    ]);
    
    // On success, Resend returns an object with an 'id'. If not, something went wrong.
    if (isset($result->id)) {
        http_response_code(200);
        echo json_encode(["message" => "Email sent successfully!"]);
    } else {
        // If there's no ID, something failed silently on Resend's side
        throw new Exception('Failed to send email. Resend API did not return a success ID.');
    }

} catch (\Exception $e) {
    // Catch any exception and return a detailed error
    http_response_code(500);
    echo json_encode([
        "error" => "An error occurred while sending the email.",
        "details" => $e->getMessage(),
        "trace" => $e->getTraceAsString() // Provide a stack trace for deep debugging
    ]);
}
