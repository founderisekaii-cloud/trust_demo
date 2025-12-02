<?php
error_reporting(0);
include 'config.inc.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-control-allow-headers: content-type, access-control-allow-headers, authorization, x-requested-with");

// Read the incoming JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

$resend_api_key = RESEND_API_KEY;

// Check if it's a subscription or a contact form submission
$is_subscription = isset($data['isSubscription']) && $data['isSubscription'];
$from_email = 'onboarding@resend.dev';

if ($is_subscription) {
    $to_email = SUBSCRIBE_TO_EMAIL;
    $subject = $data['subject'] ?? 'New Newsletter Subscription';
    $html_body = "A new person has subscribed: <strong>" . htmlspecialchars($data['email']) . "</strong>";
} else {
    $to_email = CONTACT_FORM_TO_EMAIL;
    $subject = 'Contact Form: ' . htmlspecialchars($data['subject']);
    $html_body = "<h1>New Contact Form Submission</h1>" .
                 "<p><strong>Name:</strong> " . htmlspecialchars($data['name']) . "</p>" .
                 "<p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>" .
                 "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($data['message'])) . "</p>";
}


$payload = [
    'from' => $from_email,
    'to' => [$to_email],
    'subject' => $subject,
    'html' => $html_body,
];

if (!$is_subscription && isset($data['email'])) {
    $payload['reply_to'] = htmlspecialchars($data['email']);
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resend_api_key,
]);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    curl_close($ch);
    echo json_encode(['error' => 'cURL Error sending email: ' . $error_msg]);
    exit;
}

curl_close($ch);

if ($http_status >= 200 && $http_status < 300) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully!']);
} else {
    $response_data = json_decode($response, true);
    $error_message = $response_data['message'] ?? 'Unknown error occurred.';
    echo json_encode(['error' => 'Failed to send email. API responded with status ' . $http_status . ': ' . $error_message]);
}
?>
