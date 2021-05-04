let urlmain = "http://uclickerapi-env-1.eba-gr7abipg.us-west-1.elasticbeanstalk.com/";
let coursetitle = localStorage.getItem("current_course");
let courselist = JSON.parse(localStorage.getItem("classes"));
let currentcourse = null;

getAllStudents();

document.getElementById("coursetitle").innerHTML = coursetitle;

courselist.forEach( (e) => {
    if (e.class_name === coursetitle){
        currentcourse = e;
    }
});

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
    data: [12, 19]
    }]
}
});

function getAllStudents(){
    var xhr = new XMLHttpRequest();
    var url = urlmain + "get/all_students_class";
    let email = localStorage.getItem("email");
    let statisticsdiv = document.getElementById("statistics");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let allstudents = JSON.parse(xhr.responseText);
            allstudents.forEach( (student) => {
                let thiscourse = null;
                student.classes.forEach( course => {
                    if (course.class_name === coursetitle){
                        thiscourse = course;
                    }
                });
                attendence = "Attendence: " + thiscourse.attend + " / " + thiscourse.total_class_sessions;
                let studentcontainer = `<div class="card" style="margin:5px;">
                                            <h6 class="card-title" style="width: 400px;">${student.name}</h4>
                                            <h6 class="text-muted card-subtitle mb-2" style="width: 400px;">${attendence}</h6>
                                        </div>`
                statisticsdiv.innerHTML += studentcontainer
            });
        }
        else if(xhr.status > 299 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.responseText);
            alert(json.error);
        }
    };
    var data = JSON.stringify({"email": email, "class": coursetitle});
    xhr.send(data);
}




document.getElementById("backarrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.location="instructorhome.html";
});

