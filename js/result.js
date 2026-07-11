const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("total")) || 13;

document.getElementById("score").innerHTML =
`${score} / ${total}`;

let band = "0.0";

const percent = score / total;

if(percent>=0.9) band="9.0";
else if(percent>=0.8) band="8.0";
else if(percent>=0.7) band="7.0";
else if(percent>=0.6) band="6.0";
else if(percent>=0.5) band="5.5";
else if(percent>=0.4) band="5.0";
else if(percent>=0.3) band="4.5";

document.getElementById("band").innerHTML =
"Estimated Band: "+band;

function reviewTest(){

const user =
JSON.parse(localStorage.getItem("userAnswers"));

const correct =
JSON.parse(localStorage.getItem("correctAnswers"));

let html="<hr><h2>Answer Review</h2>";

for(let i=0;i<correct.length;i++){

const ok =
String(user[i]).toLowerCase() ==
String(correct[i]).toLowerCase();

html+=`

<div style="
padding:15px;
margin:15px 0;
border-radius:10px;
background:${ok ? "#d4edda" : "#f8d7da"};
">

<h3>Question ${i+1}</h3>

<p><b>Your Answer:</b> ${user[i] || "No Answer"}</p>

<p><b>Correct Answer:</b> ${correct[i]}</p>

</div>

`;

}

document.getElementById("review").innerHTML=html;

}