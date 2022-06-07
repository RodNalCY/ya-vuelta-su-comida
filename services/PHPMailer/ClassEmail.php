<?php
// https://github.com/PHPMailer/PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';


class ClassEmail{
    private $email = null;
    function __construct()
    {
        $this->mail = new PHPMailer();
        $this->mail->isSMTP();
        $this->mail->SMTPAuth   = true;
        $this->mail->SMTPSecure = 'tls'; 
        $this->mail->Host       = 'smtp.gmail.com';    
        $this->mail->Port       = 587; 
        //Enable SMTP authentication
        $this->mail->Username   = 'sabrosoonfood@gmail.com';                     
        $this->mail->Password   = 'pigkmgzgxufbqnme';     
    }

    public function sendEnviarEmail(string $header, string $correo, string $nombre, string $asunto, string $bodyHTML){
        $this->mail->setFrom("sabrosoonfood@gmail.com", $header);
        $this->mail->addAddress($correo, $nombre);
        $this->mail->Subject = $asunto;
        $this->mail->Body = $bodyHTML;
        $this->mail->isHTML(true);
        $this->mail->CharSet = "UTF-8";
        return $this->mail->send();
    }
}
