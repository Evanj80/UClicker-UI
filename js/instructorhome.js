let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
let createNewClassButton = document.getElementById("createnewclass");
let logoutButton = document.getElementById("logout-button");
let courselist = JSON.parse(localStorage.getItem("classes"));
let courselistdiv = document.getElementById("courselistdiv");

courselist.forEach(res => {
    let card = document.createElement('div');
    card.id = "card";
    card.setAttribute("cname", res.cname);
    card.classList.add("card");
    card.style = "margin:10px;cursor: pointer;"
    let innercard = `<div class="card-body" cname="${res.cname}">
                        <h4 class="card-title" cname="${res.cname}" style="width: 400px;">${res.cname}</h4>
                        <h6 class="text-muted card-subtitle mb-2" cname="${res.cname}" style="width: 400px;">Course Id</h6><a class="btn btn-light action-button" cname="${res.cname}" role="button" href="#" style="background: var(--red);margin-left: 10px;">Delete</a>
                    </div>`
    card.innerHTML += innercard
    courselistdiv.appendChild(card);
});

function getCourseInfo(cname){
    localStorage.setItem("current_course", cname);
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
    getCourseInfo(e.target.getAttribute("cname"));
 });