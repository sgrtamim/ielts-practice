/* ==========================================
   SGR Tamim IELTS Reading Engine v2
========================================== */

const passage = document.getElementById("passage");
const questions = document.getElementById("questions");
const palette = document.getElementById("questionPalette");

let currentQuestion = 1;

/* ==========================
   LOAD TEST
========================== */

function loadTest(){

    document.title = TEST.title + " | SGR Tamim IELTS";

    document.querySelector(".logo p").textContent = TEST.title;

    document.getElementById("timer").textContent =
    TEST.time + ":00";

    passage.innerHTML = TEST.passage;

    createQuestions();

    createPalette();

}

/* ==========================
   CREATE QUESTIONS
========================== */

function createQuestions(){

    questions.innerHTML="";

    TEST.questions.forEach(q=>{

        let html="";

        if(q.type==="tfng"){

            html=`

            <div class="question" id="q${q.number}">

            <p>

            <b>${q.number}.</b>

            ${q.text}

            </p>

            <button class="tfng">TRUE</button>

            <button class="tfng">FALSE</button>

            <button class="tfng">NOT GIVEN</button>

            </div>

            `;

        }

        if(q.type==="gap"){

            html=`

            <div class="question" id="q${q.number}">

            <p>

            <b>${q.number}.</b>

            ${q.text}

            </p>

            <input
            type="text"
            id="answer${q.number}">

            </div>

            `;

        }

        questions.insertAdjacentHTML("beforeend",html);

    });

    enableButtons();

}

/* ==========================
   BUTTONS
========================== */

function enableButtons(){

document.querySelectorAll(".tfng").forEach(btn=>{

btn.onclick=function(){

let group=this.parentElement.querySelectorAll(".tfng");

group.forEach(b=>b.classList.remove("selected"));

this.classList.add("selected");

markAnswered();

};

});

}

/* ==========================
   PALETTE
========================== */

function createPalette(){

palette.innerHTML="";

for(let i=1;i<=TEST.questions.length;i++){

let b=document.createElement("button");

b.className="paletteBtn";

b.textContent=i;

b.onclick=()=>{

goQuestion(i);

};

palette.appendChild(b);

}

updatePalette();

}

/* ==========================
   GO QUESTION
========================== */

function goQuestion(number){

currentQuestion=number;

document.getElementById("currentQuestion").textContent=number;

updatePalette();

document.getElementById("q"+number)

.scrollIntoView({

behavior:"smooth",

block:"center"

});

}

function updatePalette(){

document.querySelectorAll(".paletteBtn")

.forEach((b,index)=>{

b.classList.remove("current");

if(index+1===currentQuestion){

b.classList.add("current");

}

});

}

/* ==========================
   ANSWERED
========================== */

function markAnswered(){

document.querySelectorAll(".question")

.forEach((q,index)=>{

let answered=false;

if(q.querySelector(".selected"))

answered=true;

let input=q.querySelector("input");

if(input){

if(input.value.trim()!="")

answered=true;

}

let p=document.querySelectorAll(".paletteBtn")[index];

if(answered){

p.classList.add("answered");

}else{

p.classList.remove("answered");

}

});

}

/* ==========================
   START
========================== */

loadTest();