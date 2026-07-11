fetch("data/reading/tests.json")
.then(r=>r.json())
.then(data=>{

document.getElementById("totalTests").innerText=data.length;

const list=document.getElementById("testList");

data.forEach(test=>{

list.innerHTML+=`

<div class="card">

<h3>${test.title}</h3>

<p>${test.questions} Questions</p>

<p>${test.difficulty}</p>

<button onclick="location.href='reading.html?test=${test.id}'">

Preview

</button>

<button onclick="location.href='admin.html?id=${test.id}'">

Edit

</button>

</div>

`;

});

});