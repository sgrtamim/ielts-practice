const score =
Number(localStorage.getItem("score"));

const total =
Number(localStorage.getItem("total"));

const userAnswers =
JSON.parse(localStorage.getItem("userAnswers"));

const correctAnswers =
JSON.parse(localStorage.getItem("correctAnswers"));

document.getElementById("score").innerHTML =
`${score} / ${total}`;

const review =
document.getElementById("review");

for(let i=0;i<correctAnswers.length;i++){

const correct =
correctAnswers[i].toString().trim();

const user =
(userAnswers[i] || "").toString().trim();

const ok =
correct.toLowerCase() === user.toLowerCase();

review.innerHTML += `

<div class="answerCard ${ok ? "correct":"wrong"}">

<h3>Question ${i+1}</h3>

<p>

<b>Your Answer:</b>

${user || "<i>No Answer</i>"}

</p>

<p>

<b>Correct Answer:</b>

${correct}

</p>

</div>

`;

}
