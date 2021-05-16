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
    let classActive = res.isActive;

    if(!classActive){
        innercard = `<div class="card-body" class_name="${res.class_name}">
                            <h4 class="card-title" class_name="${res.class_name}" style="width: 400px;">${res.class_name}</h4>
                            <h6 class="text-muted" class_name="${res.class_name}" card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                            <h6 class="text-muted" class_name="${res.class_name}" card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                            <a id="startclassbutton" class="btn btn-light action-button" class_name="${res.class_name}" role="button" style="background: var(--green);">Start</a>
                            <a id="deleteclassbutton" class="btn btn-light action-button" class_name="${res.class_name}" role="button" style="background: var(--red);">Delete</a>
                        </div>`
    } else if(classActive) {
        innercard = `<div class="card-body" class_name="${res.class_name}">
                            <h4 class="card-title" class_name="${res.class_name}" style="width: 400px;">${res.class_name}</h4>
                            <h6 class="text-muted" class_name="${res.class_name}" card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                            <h6 class="text-muted" class_name="${res.class_name}" card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6>
                            <a id="endclassbutton" class="btn btn-light action-button" class_name="${res.class_name}" role="button" style="background: var(--red);">End</a>
                            <a id="deleteclassbutton" class="btn btn-light action-button" class_name="${res.class_name}" role="button" style="background: var(--red);">Delete</a>
                        </div>`
    }
    card.innerHTML += innercard
    courselistdiv.appendChild(card);
});

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

document.getElementById("createnewclass").addEventListener("click", (e) => {
    e.preventDefault();
    window.location="instructorcreateclass.html";
});


document.querySelectorAll('.card').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.id === "deleteclassbutton"){
            let class_name = e.target.getAttribute("class_name");
            getStudentsThenDelete(class_name);
        }else if (e.target.id === "startclassbutton"){
            let class_name = e.target.getAttribute("class_name");
            startClass(class_name);
        }else if (e.target.id === "endclassbutton"){
            let class_name = e.target.getAttribute("class_name");
            endClass(class_name);
        }else{
            getCourseInfo(e.target.getAttribute("class_name"));
        }
    });
});

function getCourseInfo(class_name){
    localStorage.setItem("current_course", class_name);
    window.location ="instructorcourse.html";
}

function startClass(coursename){
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/start_class";
    let email = localStorage.getItem("email");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let classes = JSON.parse(xhr.responseText);
            localStorage.setItem('classes', JSON.stringify(classes));
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
        window.location="instructorhome.html";
    };
    var data = JSON.stringify({"email": email, "class": coursename});
    xhr.send(data);
}

function endClass(coursename){
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/end_class";
    let email = localStorage.getItem("email");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let classes = JSON.parse(xhr.responseText);
            localStorage.setItem('classes', JSON.stringify(classes));
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
        window.location="instructorhome.html";
    };
    var data = JSON.stringify({"email": email, "class": coursename});
    xhr.send(data);


}

function getStudentsThenDelete(coursename){
    var xhr = new XMLHttpRequest();
    var url = urlmain + "get/all_students_class";
    let email = localStorage.getItem("email");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let allstudents = JSON.parse(xhr.responseText);
            studentemaillist = [];
            allstudents.forEach(student => {
                studentemaillist.push(student.email);
            });
            deletecourse(coursename, email, studentemaillist);
            let courseList = JSON.parse(localStorage.getItem("classes"));
            courseList.forEach(item => {if(item.class_name === coursename){list.splice(list.indexOf(item), 1)}});
            localStorage.setItem('classes', JSON.stringify(courseList));
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
        // window.location="instructorhome.html";

    };
    var data = JSON.stringify({"email": email, "class": coursename});
    xhr.send(data);
}

function deletecourse(class_name, email, students){
    var xhr = new XMLHttpRequest();
    var url = urlmain + "add/delete_class";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let classes = JSON.parse(xhr.responseText);
            localStorage.setItem('classes', JSON.stringify(classes));
            location.reload();
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
        window.location="instructorhome.html";
    };
    var data = JSON.stringify({"email": email, "class": class_name, "students": students});
    xhr.send(data);
}