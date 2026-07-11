async function loadTests(){

const response=await fetch("data/reading/tests.json");

const tests=await response.json();

const list=document.getElementById("testList");

list.innerHTML="";

tests.forEach(test=>{

list.innerHTML+=`

<div class="testCard">

<h3>${test.title}</h3>

<div class="meta">

Reading Test<br>

Time: ${test.time} minutes

</div>

<div class="timeBox">

<label>Time:</label>

<select id="time-${test.id}">

    <option value="15">15 Minutes</option>

    <option value="20">20 Minutes</option>

    <option value="25">25 Minutes</option>

    <option value="30" selected>30 Minutes</option>

</select>

</div>

<button
class="startBtn"
onclick="startTest('${test.id}')">

Start Test

</button>

</div>

`;

});

}

function startTest(id){

    const time =
        document.getElementById("time-" + id).value;

    localStorage.setItem("readingTime", time);

    window.location.href =
        `reading.html?id=${id}`;

}

loadTests();
