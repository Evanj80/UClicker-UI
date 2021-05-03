let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
let createNewClassButton = document.getElementById("createnewclass");
let logoutButton = document.getElementById("logout-button");
let courselist = JSON.parse(localStorage.getItem("classes"));
let courselistdiv = document.getElementById("courselistdiv");

courselist.forEach(res => {
    let card = document.createElement('div');
    card.id = "card";
    card.classList.add("card");
    card.style = "margin:10px;cursor: pointer;"
    let innercard = `<div class="card-body">
                        <h4 class="card-title" style="width: 400px;">${res.class_name}</h4>
                        <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Class days: ${res.days}</h6>
                        <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Time: ${res.start_time} - ${res.end_time}</h6><a class="btn btn-light action-button" role="button" href="#" style="background: var(--red);margin-left: 10px;">Delete</a>
                    </div>`
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

createNewClassButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "instructorcreateclass.html";
});

document.getElementById("card").addEventListener('click',function(e){
    getCourseInfo(e.target.getAttribute("class_name"));
 });