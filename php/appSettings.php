<!DOCTYPE html>
<html lang="en-US">
<head>
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
    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>In The Dark Timer Settings</title>
</head>
<body>
    <main>
        <form method="POST" action="updateData.php" enctype="multipart/form-data">
            
        </form>
        <button id="back">Back</button>
    </main>
</body>
</html>  