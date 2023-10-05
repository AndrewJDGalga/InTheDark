<?php 
    $env = file_get_contents('.env');
    $sploded_env = explode("\n", $env);
    $cookienameRaw = explode("=", $sploded_env[2]);
    $cookievalRaw = explode("=", $sploded_env[3]);
    $cookiename = trim($cookienameRaw[1]);
    $cookieval = trim($cookievalRaw[1]);

    if(!isset($_COOKIE[$cookiename]) || !$_COOKIE[$cookiename] === $cookieval){
        header("Location: ../index.html");
        die();
    }

    $readData = json_decode(file_get_contents("../config.json"), false);

    function processAudioFile($file, $customName, $readData) {
        $result = 1;
        if($file["error"] != 0 || $file["size"] > 50000000) return $result;

        $fileName = $file["name"];
        $fileTmpLocation = $file["tmp_name"];
        $fileExtensionSlice = explode(".", $fileName);
        $fileExtension = strtolower(end($fileExtensionSlice));
        $allowedExtensions = array("mp3", "wav", "ogg");

        if(in_array($fileExtension, $allowedExtensions)) {
            $trackName = $customName . "." . $fileExtension;
            $destination = "../assets/audio/" . $trackName;
            $configDestination = "assets/audio/" . $trackName;
            $readData->mainAudio = $configDestination;

            unlink("../" . $readData->mainAudio); //strictly for mismatching extensions

            move_uploaded_file($fileTmpLocation, $destination);
            $result = 0;
        }

        return $result;
    }

    if(isset($_POST["timerLength"])) {
        $processingResult = [];

        if(isset($_FILES["stingFile"]) && $_FILES["stingFile"]["name"] != "") {
            if(processAudioFile($_FILES["stingFile"], "sting", $readData) !== 0) {
                $processingResult['stingAudio'] = ['Failed to upload sting audio track. Ensure the size is less than 50 MB.'];
            } else {
                $processingResult['stingAudio'] = ['Sting audio successfully uploaded.'];
            }
        }

        if(isset($_FILES["musicFile"]) && $_FILES["musicFile"]["name"] != "") {
            if(processAudioFile($_FILES["musicFile"], "main", $readData) !== 0) {
                $processingResult['mainAudio'] = ['Failed to upload main audio track. Ensure the size is less than 50 MB.'];
            } else {
                $processingResult['mainAudio'] = ['Main audio successfully uploaded.'];
            }
        }
        

        $readData->timerEndSeconds = htmlspecialchars($_POST["timerLength"]);
        $readData->oscAnimMin = htmlspecialchars($_POST["animOcillationMin"]);
        $readData->oscAnimMax = htmlspecialchars($_POST["animOcillationMax"]);
        $readData->oscillatFreq = htmlspecialchars($_POST["animCheckTimeframe"]);

        $json_package = json_encode($readData, JSON_PRETTY_PRINT|JSON_PRESERVE_ZERO_FRACTION|JSON_UNESCAPED_SLASHES);
        $fp = fopen("../config.json", "w");
        fwrite($fp, $json_package);
        fclose($fp);

        $processingResult['dataChanged'] = ['Values successfully uploaded.'];
        
        echo json_encode($processingResult);
    } else {
        echo json_encode('Critical data update error.');
    }

    die();