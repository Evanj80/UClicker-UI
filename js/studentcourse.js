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
    if (isClassActive(currentcourse.days, currentcourse.start_time, currentcourse.end_time)){
        document.getElementById("classstatus").innerHTML = "Class in progress..."
    }
    else{
        document.getElementById("classstatus").innerHTML = "Class has not started yet."
    }
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

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location="index.html";
});

console.log(isClassActive(["tuesday"], "01:00", "02:00"))


document.getElementById("backarrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.location="studenthome.html";
});

