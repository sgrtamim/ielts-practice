let testData;

// =============================
// FONT SIZE
// =============================

let passageFont = 18;
let questionFont = 18;

const passage = document.getElementById("passageContent");
const questions = document.getElementById("questionContent");

document.getElementById("passagePlus").onclick = () => {
    passageFont += 2;
    passage.style.fontSize = passageFont + "px";
};

document.getElementById("passageMinus").onclick = () => {
    if (passageFont > 12) {
        passageFont -= 2;
        passage.style.fontSize = passageFont + "px";
    }
};

document.getElementById("questionPlus").onclick = () => {
    questionFont += 2;
    questions.style.fontSize = questionFont + "px";
};

document.getElementById("questionMinus").onclick = () => {
    if (questionFont > 12) {
        questionFont -= 2;
        questions.style.fontSize = questionFont + "px";
    }
};


// =============================
// DRAG DIVIDER
// =============================

const divider = document.getElementById("divider");
const leftPanel = document.getElementById("passagePanel");

let dragging = false;

divider.addEventListener("mousedown", () => {
    dragging = true;
});

document.addEventListener("mouseup", () => {
    dragging = false;
});

document.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    let width = (e.clientX / window.innerWidth) * 100;

    if (width < 25) width = 25;
    if (width > 75) width = 75;

    leftPanel.style.width = width + "%";

});


// =============================
// TIMER
// =============================

let minutes = Number(localStorage.getItem("readingTime")) || 30;

let totalSeconds = minutes * 60;

const timer = document.getElementById("timer");

function updateTimer() {

    let m = Math.floor(totalSeconds / 60);

    let s = totalSeconds % 60;

    timer.innerHTML =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0");

    if (totalSeconds == 300) {

        alert("Only 5 minutes remaining");

    }

    if (totalSeconds == 60) {

        alert("Only 1 minute remaining");

    }

    if (totalSeconds <= 0) {

        clearInterval(countdown);

        submitTest();

    }

    totalSeconds--;

}

updateTimer();

const countdown = setInterval(updateTimer, 1000);


// =============================
// TFNG BUTTONS
// =============================

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("tfng")) return;

    let group = e.target.parentElement.querySelectorAll(".tfng");

    group.forEach(btn=>btn.classList.remove("selected"));

    e.target.classList.add("selected");

});


// =============================
// SUBMIT
// =============================

document.getElementById("submitBtn").onclick=function(){

let ok=confirm("Are you sure you want to submit the test?");

if(ok){

submitTest();

}

};


// =============================
// SUBMIT FUNCTION
// =============================

function submitTest(){

let score=0;

const answers=[];

/* TFNG */

document.querySelectorAll(".question").forEach(q=>{

let selected=q.querySelector(".selected");

if(selected){

answers.push(selected.innerText);

}else{

let input=q.querySelector("input");

answers.push(input ? input.value.trim().toLowerCase() : "");

}

});


for(let i=0;i<answers.length;i++){

let user=answers[i];

let correct=testData.answers[i];

if(user.toString().toLowerCase()==correct.toString().toLowerCase()){

score++;

}

}

localStorage.setItem("score", score);
localStorage.setItem("total", testData.answers.length);

window.location.href = "result.html";

}

const params = new URLSearchParams(window.location.search);
const testName = params.get("test") || "reading1";

fetch(`data/reading/${testName}.json`)

.then(res=>res.json())

.then(data=>{

testData=data;

document.getElementById("testTitle").innerHTML=data.title;

totalSeconds=data.time*60;

passage.innerHTML=data.passage;

const container=document.getElementById("questionContent");

container.innerHTML="";

data.questions.forEach(q=>{id

let html="";

if(q.type=="tfng"){

html=`

<div class="question">

<p><b>${q.number}.</b> ${q.question}</p>

<button class="tfng">TRUE</button>

<button class="tfng">FALSE</button>

<button class="tfng">NOT GIVEN</button>

</div>

`;

}

if(q.type=="gap"){

html=`

<div class="question">

<p>

<b>${q.number}.</b>

${q.question.replace("________",

`<input type="text">`)}

</p>

</div>

`;

}

container.innerHTML+=html;

});

});