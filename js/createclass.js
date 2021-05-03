let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
// let urlmain = "http://localhost:5000/"
let logoutButton = document.getElementById("logout-button");
let cancelButton = document.getElementById("addcoursecancel");
let createButton = document.getElementById("addcoursesubmit");

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location="instructorhome.html";
});

createButton.addEventListener("click", (e) => {
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/new_class";
    let email = localStorage.getItem("email");
    let name = document.getElementById("addcoursename").value;
    let starttime = document.getElementById("addcoursestarttime").value;
    let endtime = document.getElementById("addcourseendtime").value;
    let students = document.getElementById("addcourseemails").value.split(",").map(item => item.trim());
    let days = document.getElementById("addcoursedays").value.split(",").map(item => item.trim());
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem('classes', JSON.stringify(json.classes));
            window.location = "instructorhome.html";
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"email": email, "class": name, "start": starttime, "end": endtime, "students": students, "days": days});
    console.log(data);
    xhr.send(data);
});