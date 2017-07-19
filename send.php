<?php

$name = $_POST['name'];
$from = $_POST['email'];
$subject = $_POST['subject'];
$message ='Name: ' .$name
    ."<br>" .'Message: ' .$_POST['message'];

$to = "webteam@convergentglobe.com";
// $headers = "From : <$from> \r\n";
$headers= "MINE-VERSION: 1.0" . "\r\n";
$headers .= 'From:' .$from . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8". "\r\n";

$send = mail($to, $subject, $message, $headers);
if (isset($_POST['submit']))
{
  if($send){
    header('Location: /index.html');
    // echo "Thanks for contacting us! We'll get back to you shortly.";
  }
  else{
    echo "Failed to send an email!!";
  }
}
?>