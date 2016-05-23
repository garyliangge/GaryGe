<?php
    if(isset($_POST["submit"])) {

        $first_name = $_POST['first_name']; // required
        $last_name = $_POST['last_name']; // required
        $email_from = $_POST['email']; // required
        $human = $_POST['human']; // required
        $message = $_POST['message']; // required

        $email_to = "garyliangge@gmail.com";
        $subject = "Website Contact Form Submission";

        $body = "From: $first_name $last_name\n E-Mail: $email_from\n Message:\n $message";

        // Check if first name has been entered
        if (!$_POST['first_name']) {
        	$errFirstName = 'Please enter your first name';
        }

        // Check if last name has been entered
        if (!$_POST['last_name']) {
        	$errLastName = 'Please enter your last name';
        }

        // Check if email has been entered and is valid
        if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        	$errEmail = 'Please enter a valid email address';
        }

        //Check if message has been entered
        if (!$_POST['message']) {
        	$errMessage = 'Please enter your message';
        }

        //Check if simple anti-bot test is correct
        if ($human != 8) {
        	$errHuman = 'Your anti-spam is incorrect';
        }

        if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
        	if (mail ($email_to, $subject, $body, $email_from)) {
        		$result='<div class="alert alert-success">Thanks! I\'ll be in touch.</div>';
        	} else {
        		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
        	}
        }
    }
?>
