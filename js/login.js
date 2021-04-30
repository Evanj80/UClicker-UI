let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;
    sendLoginRequest(email, password);
});

function sendLoginRequest(email, password) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:5000/account/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem('name', json.name);
            localStorage.setItem('isInstructor', json.admin);
            localStorage.setItem('classes', JSON.stringify(json.classes));
            window.location="studenthome.html";
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            var json = JSON.parse(xhr.responseText);
            alert(json.status);
        }
    };
    var data = JSON.stringify({"email": email, "password": password});
    xhr.send(data);
}
