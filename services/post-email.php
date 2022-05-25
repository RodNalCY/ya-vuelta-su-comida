<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

if (isset($_POST["email"])) {

    // Include library file
    require_once 'VerifyEmail.class.php'; 
    // Initialize library class
    $mail = new VerifyEmail();
    // Set the timeout value on stream
    //$mail->setStreamTimeoutWait(20);
    // Set email address for SMTP request
    $mail->setEmailFrom('crodnal07@gmail.com');
    // Email to check
    $email = $_POST["email"];
    // Check if email is valid and exist
    $validated = $mail->check($email);
    echo json_encode(['status' => 'ok', 'email' => $email, 'validated' => $validated]);
}else{

    echo json_encode(['status' => 'error', 'message' => 'Email parameter not found']);
}


?>