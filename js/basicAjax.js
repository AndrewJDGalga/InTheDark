
export function sendForm (formContent, targetVerifier, nextLocation, feedback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const response = xmlhttp.responseText;
            if(response === "incorrect") {
                feedback.innerText = "Credentials incorrect."
            } else {
                window.location.replace(nextLocation);
            }
        } else {
            feedback.innerText = xmlhttp.responseText;
        }
    }
    xmlhttp.open('POST', targetVerifier, true);
    xmlhttp.send(formContent);
}