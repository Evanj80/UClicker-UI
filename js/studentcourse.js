let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
// let urlmain = "http://localhost:5000/"
let coursetitle = localStorage.getItem("current_course");
if(coursetitle === null){
    console.log("Null current_course.");
    alert("Error ocurred in selecting current course.");
    window.location="studenthome.html";
}
let courselist = JSON.parse(localStorage.getItem("classes"));
let logoutButton = document.getElementById("logout-button");
let currentcourse = null;

document.getElementById("coursetitle").innerHTML = coursetitle;

courselist.forEach( (e) => {
    if (e.class_name === coursetitle){
        currentcourse = e;
    }
});

showClassStatistics();

function showClassStatistics(){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Present", "Absent"],
        datasets: [{
        backgroundColor: [
            "#2ecc71",
            "#e74c3c"
        ],
        data: [currentcourse.attend, currentcourse.total_class_sessions-currentcourse.attend]
        }]
    }
    });
    if (currentcourse.isActive){
        document.getElementById("classstatus").innerHTML = "Class in progress..."
    }
    else{
        document.getElementById("classstatus").innerHTML = "Class has not started yet."
    }
}

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

document.getElementById("backarrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.location="studenthome.html";
});

