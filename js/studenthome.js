let logoutButton = document.getElementById("logout-button");
let courselist = JSON.parse(localStorage.getItem("classes"));
let courselistdiv = document.getElementById("courselistdiv");

courselist.forEach(res => {
    let card = `<div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="width: 400px;">${res.cname}</h4>
                        <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">Course Id</h6>
                    </div>
                </div>`
    courselistdiv.innerHTML += card;
});

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});