let coursetitle = localStorage.getItem("current_course");
let courselist = JSON.parse(localStorage.getItem("classes"));
let currentcourse = null

document.getElementById("coursetitle").innerHTML = coursetitle;

courselist.forEach( (e) => {
    if (e.class_name === coursetitle){
        currentcourse = e;
    }
});

console.log(currentcourse);

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


document.getElementById("backarrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.location="instructorhome.html";
});

