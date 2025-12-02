<?php
// ============== CONFIGURATION =================
// This is the only file you need to edit.
// =============================================

// Suppress all errors and warnings from being output, to ensure a clean JSON response.
error_reporting(0);
ini_set('display_errors', 0);

// --- RESEND API KEY ---
// Used for the contact form and newsletter subscription.
// Get your key from: https://resend.com/api-keys
define('RESEND_API_KEY', 're_KWBXkpAV_MEpBsmZa6fbzy2QiXkmsQiHT');

// --- RAZORPAY API KEYS ---
// Used for processing donations.
// Get your keys from the Razorpay Dashboard: https://dashboard.razorpay.com/app/keys
define('RAZORPAY_KEY_ID', 'rzp_live_RmhWSJOttVe0m9');
define('RAZORPAY_KEY_SECRET', '6C4dcZlJbRYFTCKH8o5RsW5t');

// --- EMAIL RECIPIENTS ---
// The email address that receives messages from the contact form.
define('CONTACT_FORM_TO_EMAIL', 'vikhyatfoundation@gmail.com');

// The email address that is used to send emails from. This must be a verified domain on Resend.
define('SENDER_EMAIL', 'contact@vikhyatfoundation.com');

// The email address that receives notifications for new newsletter subscribers.
define('SUBSCRIBE_TO_EMAIL', 'vikhyatfoundation@gmail.com');
?>
