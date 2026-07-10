/* ===========================
   SGR Tamim IELTS
   Reading Engine
=========================== */

let currentQuestion = 1;

const totalQuestions = 13;

const palette = document.getElementById("questionPalette");

const currentQuestionText =
document.getElementById("currentQuestion");

/* ===========================
   CREATE QUESTION PALETTE
=========================== */

function createPalette(){

    palette.innerHTML="";

    for(let i=1;i<=totalQuestions;i++){

        const btn=document.createElement("button");

        btn.className="paletteBtn";

        btn.innerHTML=i;

        btn.dataset.question=i;

        btn.onclick=()=>goToQuestion(i);

        palette.appendChild(btn);

    }

    updatePalette();

}

/* ===========================
   UPDATE PALETTE
=========================== */

function updatePalette(){

    document
    .querySelectorAll(".paletteBtn")
    .forEach(btn=>{

        btn.classList.remove("current");

        if(Number(btn.dataset.question)==currentQuestion){

            btn.classList.add("current");

        }

    });

}

/* ===========================
   GO TO QUESTION
=========================== */

function goToQuestion(number){

    currentQuestion=number;

    currentQuestionText.innerHTML=number;

    updatePalette();

    const questions=
    document.querySelectorAll(".question");

    if(questions[number-1]){

        questions[number-1]
        .scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}

/* ===========================
   NEXT
=========================== */

document
.getElementById("nextBtn")
.onclick=function(){

    if(currentQuestion<totalQuestions){

        currentQuestion++;

        goToQuestion(currentQuestion);

    }

}

/* ===========================
   PREVIOUS
=========================== */

document
.getElementById("previousBtn")
.onclick=function(){

    if(currentQuestion>1){

        currentQuestion--;

        goToQuestion(currentQuestion);

    }

}

/* ===========================
   FLAG
=========================== */

document
.getElementById("flagBtn")
.onclick=function(){

    const btn=
    document.querySelector(

        `.paletteBtn[data-question="${currentQuestion}"]`

    );

    btn.classList.toggle("flagged");

}

/* ===========================
   MARK ANSWERED
=========================== */

function markAnswered(){

    const questions=
    document.querySelectorAll(".question");

    questions.forEach((q,index)=>{

        let answered=false;

        const selected=
        q.querySelector(".selected");

        if(selected){

            answered=true;

        }

        const input=
        q.querySelector("input");

        if(input){

            if(input.value.trim()!=""){

                answered=true;

            }

        }

        const paletteBtn=
        document.querySelector(

`.paletteBtn[data-question="${index+1}"]`

        );

        if(answered){

            paletteBtn.classList.add("answered");

        }else{

            paletteBtn.classList.remove("answered");

        }

    });

}

/* ===========================
   LISTENERS
=========================== */

document.addEventListener("click",()=>{

    markAnswered();

});

document.addEventListener("keyup",()=>{

    markAnswered();

});

/* ===========================
   START
=========================== */

createPalette();