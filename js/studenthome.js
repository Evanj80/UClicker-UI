let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
// let urlmain = "http://localhost:5000/"
let logoutButton = document.getElementById("logout-button");
let courselist = JSON.parse(localStorage.getItem("classes"));
let courselistdiv = document.getElementById("courselistdiv");

courselist.forEach(res => {
    let card = document.createElement('div');
    card.id = "card";
    card.classList.add("card");
    card.style = "margin:10px;cursor: pointer;"
    let innercard = null;
    let classActive = isClassActive(res.days, res.start_time, res.end_time);
    console.log("isClassActive? : " + classActive);
    if(!classActive){
        innercard = `<div class="card-body" class_name="${res.class_name}">
                            <h4 class="card-title" style="width: 400px;">${res.class_name}</h4>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Class is yet to start</h6>
                        </div>`
    } else if(classActive && !res.isAttending){
        innercard = `<div class="card-body" class_name="${res.class_name}">
                        <h4 class="card-title" style="width: 400px;">${res.class_name}</h4>
                        <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                        <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                        <a class="btn btn-light action-button" id="joinclassbutton"  class_name="${res.class_name}" role="button" href="#" style="background: var(--red);margin-left: 10px;">Join</a>
                    </div>`
    } else if(classActive && res.isAttending){
        innercard = `<div class="card-body" class_name="${res.class_name}">
                            <h4 class="card-title" style="width: 400px;">${res.class_name}</h4>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">You have joined the class</h6>
                        </div>`
    }
    card.innerHTML += innercard
    courselistdiv.appendChild(card);
});

function getCourseInfo(class_name){
    localStorage.setItem("current_course", class_name);
    window.location ="studentcourse.html";
}

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

document.querySelectorAll('.card').forEach(item => {
    item.addEventListener('click', (e) => {
        getCourseInfo(e.target.getAttribute("class_name"))});
});

let joinClassButton = document.getElementById("joinclassbutton");
joinClassButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let email = localStorage.getItem('email');
    let class_name = joinClassButton.getAttribute("class_name");
    sendJoinClassRequest(email, class_name);
});

function sendJoinClassRequest(email, class_name) {
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/attend";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem('classes', JSON.stringify(json));
            window.location="studenthome.html";
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"email": email, "class": class_name});
    xhr.send(data);
}

function isClassActive(classdaylist, classstart, classend){
    let classdaylistnew = classdaylist.map(name => name.toLowerCase());
    let today = new Date();  
    let day = today.getDay();  
    let hour = today.getHours();  
    let min = today.getMinutes();
    let shour = parseInt(classstart.substring(0, 2));
    let smin = parseInt(classstart.substring(3, 5));
    let ehour = parseInt(classend.substring(0, 2));
    let emin = parseInt(classend.substring(3, 5));
    let daylist = ["sunday","monday","tuesday","wednesday ","thursday","friday","saturday"];
    let todayday = daylist[day];
    if (classdaylistnew.includes(todayday)){
        if (hour > shour && hour < ehour) {
            return true;
       } else if (hour == shour && min >= smin) {
           return true;  
       } else if (hour == ehour && min <= emin) {
           return true;
       } else {
            return false;
       }
    }
    return false;
}