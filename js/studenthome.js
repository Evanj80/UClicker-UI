let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
// let urlmain = "http://localhost:5000/"
let logoutButton = document.getElementById("logout-button");

getUserDetails();

function populateCourseCards(){
    let courselist = JSON.parse(localStorage.getItem("classes"));
    let courselistdiv = document.getElementById("courselistdiv");
    courselist.forEach(res => {
        let card = document.createElement('div');
        card.id = "card";
        card.classList.add("card");
        card.style = "margin:10px;cursor: pointer;"
        let innercard = null;
        let classActive = res.isActive;
        let hasJoined = localStorage.getItem("hasJoined");
        if(!classActive){
            innercard = `<div class="card-body" class_name="${res.class_name}">
                                <h4 class="card-title" class_name="${res.class_name}" style="width: 400px;">${res.class_name}</h4>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Class days: ${res.days}</h6>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Class is yet to start</h6>
                            </div>`
        } else if(classActive && res.isAttending){
            innercard = `<div class="card-body" class_name="${res.class_name}">
                                <h4 class="card-title" class_name="${res.class_name}" style="width: 400px;">${res.class_name}</h4>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Class days: ${res.days}</h6>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                                <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">You have joined the class</h6>
                            </div>`
        } else if(classActive && !res.isAttending){
            innercard = `<div class="card-body" class_name="${res.class_name}">
                            <h4 class="card-title" class_name="${res.class_name}" style="width: 400px;">${res.class_name}</h4>
                            <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Class days: ${res.days}</h6>
                            <h6 class="text-muted card-subtitle mb-2" class_name="${res.class_name}" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                            <a class="btn btn-light action-button" id="joinclassbutton" class_name="${res.class_name}" role="button" style="background: var(--red);margin-left: 10px;">Join</a>
                        </div>`
        } 
        card.innerHTML += innercard
        courselistdiv.appendChild(card);
    });

    document.querySelectorAll('.card').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.id === "joinclassbutton"){
                let class_name = e.target.getAttribute("class_name");
                joinClass(class_name);
            } else {
                getCourseInfo(e.target.getAttribute("class_name"))
            }
        });
    });
}

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

function getCourseInfo(class_name){
    localStorage.setItem("current_course", class_name);
    window.location ="studentcourse.html";
}

function joinClass(class_name) {
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/attend";
    let email = localStorage.getItem("email");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let classes = JSON.parse(xhr.responseText);
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
        window.location="studenthome.html";
    };
    var data = JSON.stringify({"email": email, "class": class_name});
    xhr.send(data);
}

function getUserDetails() {
    var xhr = new XMLHttpRequest();
    var url = urlmain + "get/user";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            localStorage.setItem('isInstructor', json.admin);
            localStorage.setItem('classes', JSON.stringify(json.classes));
            populateCourseCards();
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"email": localStorage.getItem('email')});
    xhr.send(data);
}