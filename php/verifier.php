<?php
    if(isset($_POST["itd-uname"])) {
        $env = file_get_contents('.env');
        $sploded_env = explode("\n", $env);
        $unameRaw = explode("=", $sploded_env[0]);
        $upassRaw = explode("=", $sploded_env[1]);
        $uname = trim($unameRaw[1]);
        $upass = trim($upassRaw[1]);

        $enteredName = htmlspecialchars($_POST["itd-uname"]);
        $enteredPass = htmlspecialchars($_POST["itd-upass"]);

        if($enteredName === $uname && $enteredPass === $upass) {
            $cookienameRaw = explode("=", $sploded_env[2]);
            $cookievalRaw = explode("=", $sploded_env[3]);
            $cookiename = trim($cookienameRaw[1]);
            $cookieval = trim($cookievalRaw[1]);

            setcookie($cookiename, $cookieval, time()+3600);
            echo 'valid';
        } else {
            echo 'invalid';
        }
        die();
    } else {
        header("Location: ../index.html");
        die();
    }