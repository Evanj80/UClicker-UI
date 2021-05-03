let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
// let urlmain = "http://localhost:5000/"
let signupStudentButton = document.getElementById("signupstudent");
let signupInstructorButton = document.getElementById("signupinstructor");

signupStudentButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendSignUpRequest("account/signup");
});

signupInstructorButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendSignUpRequest("account/admin_signup");
});


function sendSignUpRequest(urlextenstion) {
    let name = document.getElementById("registername").value;
    let email = document.getElementById("registeremail").value;
    let password = document.getElementById("registerpassword").value;
    var encryptedPassword = CryptoJS.MD5(password).toString();
    var xhr = new XMLHttpRequest();
    var url = urlmain + urlextenstion;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            window.location = "index.html";
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"name": name, "email": email, "password": encryptedPassword});
    xhr.send(data);
}


