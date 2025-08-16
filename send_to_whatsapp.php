<?php
require __DIR__ . '/vendor/autoload.php'; // Autoload Twilio library

use Twilio\Rest\Client;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Format the message for WhatsApp
    $whatsappMessage = "Name: $name\nEmail: $email\nMessage: $message";

    // Use Twilio API to send WhatsApp message
    $sid = 'your_twilio_sid';
    $token = 'your_twilio_token';
    $twilio = new Client($sid, $token);

    try {
        $twilioMessage = $twilio->messages->create(
            'whatsapp:+your_phone_number', // Replace with your WhatsApp number
            [
                'from' => 'whatsapp:+twilio_whatsapp_number', // Replace with your Twilio WhatsApp number
                'body' => $whatsappMessage
            ]
        );

        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        error_log($e->getMessage()); // Log the error message
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
