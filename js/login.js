let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;
    let encryptedPassword = CryptoJS.MD5(password).toString();
    sendLoginRequest(email, encryptedPassword);
});

function sendLoginRequest(email, password) {
    var xhr = new XMLHttpRequest();
    var url = urlmain + "account/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            localStorage.setItem('isInstructor', json.admin);
            localStorage.setItem('classes', JSON.stringify(json.classes));
            if (localStorage.getItem('isInstructor') == "true"){
                window.location="instructorhome.html";
            }
            else{
                window.location="studenthome.html";
            }
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"email": email, "password": password});
    xhr.send(data);
}
