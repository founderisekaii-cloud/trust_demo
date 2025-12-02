<?php
// ============== CONFIGURATION =================
// This is the only file you need to edit.
// =============================================

// This file is now named config.inc.php as a security best practice.
// Please ensure your file on the server is renamed to config.inc.php

// --- RESEND API KEY ---
// Used for the contact form and newsletter subscription.
// Get your key from: https://resend.com/api-keys
define('RESEND_API_KEY', 'YOUR_RESEND_API_KEY_HERE');

// --- RAZORPAY API KEYS ---
// Used for processing donations.
// Get your keys from the Razorpay Dashboard: https://dashboard.razorpay.com/app/keys
define('RAZORPAY_KEY_ID', 'YOUR_RAZORPAY_KEY_ID_HERE');
define('RAZORPAY_KEY_SECRET', 'YOUR_RAZORPAY_KEY_SECRET_HERE');

// --- EMAIL RECIPIENTS ---
// The email address that receives messages from the contact form.
define('CONTACT_FORM_TO_EMAIL', 'vikhyatfoundation@gmail.com');

// The email address that receives notifications for new newsletter subscribers.
define('SUBSCRIBE_TO_EMAIL', 'vikhyatfoundation@gmail.com');
?>
