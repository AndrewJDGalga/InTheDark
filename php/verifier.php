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
    }