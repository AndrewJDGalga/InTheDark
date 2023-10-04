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
        <form id="itd-settings" method="POST" action="" enctype="multipart/form-data">
        <label for="timerLength">Timer length in seconds: </label>
            <input type="number" name="timerLength" step="0.01" value="<?php echo $readData->timerEndSeconds ?>">
            <label for="animOcillationMin">Animation ocillation minimum in minutes: </label>
            <input type="number" name="animOcillationMin" step="0.01" value="<?php echo $readData->oscAnimMin ?>">
            <label for="animOcillationMax">Animation ocillation maximum in minutes: </label>
            <input type="number" name="animOcillationMax" step="0.01" value="<?php echo $readData->oscAnimMax ?>">
            <label for="animCheckTimeframe">Animation recheck timeframe in seconds: </label>
            <input type="number" name="animCheckTimeframe" step="0.01" value="<?php echo $readData->oscillatFreq ?>">
            <label for="musicFile">Main audio: </label>
            <input type="file" name="musicFile">
            <label for="stingFile">Audio sting: </label>
            <input type="file" name="stingFile">
            <input type="submit" value="Submit">
        </form>
        <div class="itd-interface_container">
            <p id="itd-feedback"></p>
            <button id="itd-back">Back</button>
        </div>
    </main>
    <script>
        const form = document.getElementById('itd-settings');
        const feedback = document.getElementById('itd-feedback');

        const sendForm = (formContent) => {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = () => {
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    const result = xmlhttp.responseText;
                    const jsonConversion = JSON.parse(result);
                    const test = Object.values(jsonConversion);
                    feedback.innerText = "";
                    test.forEach(element => {
                        feedback.innerText += element;
                        feedback.innerText += "\n";
                    });
                } else {
                    feedback.innerText = "Error code: " + xmlhttp.status + ", Error status: " + xmlhttp.readyState;
                }
            }
            xmlhttp.open('POST', 'updateData.php', true);
            xmlhttp.send(formContent);
        }

        document.getElementById('itd-back').addEventListener('click', ()=>{
            window.location.replace('../index.html');
        });

        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            let converted = new FormData(form);
            sendForm(converted);
        });
    </script>
</body>
</html>  