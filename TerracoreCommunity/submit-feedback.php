<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "terracorehub";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("<script>alert('❌ Connection failed: " . htmlspecialchars($conn->connect_error) . "');</script>");
}

// Validate inputs
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);

if (empty($name) || empty($email) || empty($message)) {
    echo "<script>alert('⚠️ All fields are required.'); window.history.back();</script>";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('⚠️ Invalid email address.'); window.history.back();</script>";
    exit;
}

// Save feedback to database
$stmt = $conn->prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    // Send email
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'itz.haikal11@gmail.com'; // Your Gmail
        $mail->Password   = 'jaeh gkor nvea phiw';   // Your App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('itz.haikal11@gmail.com', 'Terracore Website');
        $mail->addAddress('itz.haikal11@gmail.com', 'DH-Nics'); // Where to receive

        // Content
        $mail->isHTML(true);
        $mail->Subject = "📩 New Feedback from $name";
        $mail->Body    = "
            <h2>New Feedback Received</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong></p>
            <p>$message</p>
        ";

        $mail->send();

    } catch (Exception $e) {
        echo "<script>alert('⚠️ Feedback saved, but email could not be sent: {$mail->ErrorInfo}');</script>";
    }

    echo "<!DOCTYPE html>
    <html>
    <head>
        <title>Feedback Submitted</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; padding: 50px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; display: inline-block; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
            .btn { display: inline-block; margin-top: 15px; padding: 10px 20px; background: #0072ff; color: white; text-decoration: none; border-radius: 5px; }
            .btn:hover { background: #005ace; }
        </style>
    </head>
    <body>
        <div class='message-box'>
            <h2>✅ Feedback Submitted Successfully</h2>
            <p>Thank you for your feedback! We have also sent a notification to the admin.</p>
            <button class='btn' onclick='window.close();'>Close</button>
        </div>
    </body>
    </html>";

} else {
    echo "<script>alert('❌ Error: " . htmlspecialchars($stmt->error) . "'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>