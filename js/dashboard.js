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

<button

class="startBtn"

onclick="location.href='reading.html?id=${test.id}'">

Start Test

</button>

</div>

`;

});

}

loadTests();
