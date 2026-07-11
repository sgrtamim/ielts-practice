fetch("data/reading/tests.json")
.then(res=>res.json())
.then(tests=>{

const list=document.getElementById("readingTests");

list.innerHTML="";

tests.forEach(test=>{

list.innerHTML+=`

<div style="border:1px solid #ddd;
padding:15px;
margin-top:15px;
border-radius:10px;">

<h3>${test.title}</h3>

<p>
Questions: ${test.questions}
</p>

<p>
Difficulty: ${test.difficulty}
</p>

<button
class="button"
onclick="window.open('reading.html?test=${test.id}')">

Preview

</button>

</div>

`;

});

});