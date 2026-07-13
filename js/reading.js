// =========================================
// GLOBAL VARIABLES
// =========================================

let testData = {};

const passage = document.getElementById("passageContent");
const questionContent = document.getElementById("questionContent");
const navigatorBox = document.getElementById("navigator");
const timer = document.getElementById("timer");

let passageFont = 18;
let questionFont = 18;

let totalSeconds = 1800;
let countdown;


// =========================================
// FONT SIZE
// =========================================

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

    questionContent.style.fontSize = questionFont + "px";

};

document.getElementById("questionMinus").onclick = () => {

    if (questionFont > 12) {

        questionFont -= 2;

        questionContent.style.fontSize = questionFont + "px";

    }

};


// =========================================
// DRAG DIVIDER
// =========================================

const divider = document.getElementById("divider");
const leftPanel = document.getElementById("passagePanel");

let dragging = false;

divider.addEventListener("mousedown", () => dragging = true);

document.addEventListener("mouseup", () => dragging = false);

document.addEventListener("mousemove", e => {

    if (!dragging) return;

    let width = (e.clientX / window.innerWidth) * 100;

    if (width < 25) width = 25;
    if (width > 75) width = 75;

    leftPanel.style.width = width + "%";

});


// =========================================
// TIMER
// =========================================

function startTimer() {

    clearInterval(countdown);

    updateTimer();

    countdown = setInterval(updateTimer, 1000);

}

function updateTimer() {

    let m = Math.floor(totalSeconds / 60);

    let s = totalSeconds % 60;

    timer.textContent =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0");

    if (totalSeconds === 300) {

        alert("Only 5 minutes remaining.");

    }

    if (totalSeconds === 60) {

        alert("Only 1 minute remaining.");

    }

    if (totalSeconds <= 0) {

        clearInterval(countdown);

        submitTest();

        return;

    }

    totalSeconds--;

}


// =========================================
// LOAD TEST
// =========================================

const params = new URLSearchParams(window.location.search);

const file = params.get("id") || "reading1";

loadTest(file);

async function loadTest(fileName) {

    try {

        const response =
            await fetch(`data/reading/${fileName}.json`);

        if (!response.ok)
            throw new Error("Cannot load test.");

        testData = await response.json();

        document.getElementById("testTitle").textContent =
            testData.title;

        const savedHighlight =
localStorage.getItem("highlight_" + testData.title);

if(savedHighlight){

    passage.innerHTML = savedHighlight;

}else{

    passage.innerHTML = testData.passage;

}

        const selectedTime =
Number(localStorage.getItem("readingTime"));

totalSeconds =
(selectedTime || testData.time) * 60;

        buildQuestions();

        startTimer();

    }

    catch (err) {

        console.error(err);

        passage.innerHTML =
            "<h2>Unable to load test.</h2>";

        questionContent.innerHTML = "";

    }

}

// =========================================
// BUILD QUESTIONS
// =========================================

function buildQuestions() {

    questionContent.innerHTML = "";
    navigatorBox.innerHTML = "";

    testData.questions.forEach(q => {

        // Navigator Button

        navigatorBox.innerHTML += `
            <button
                class="navBtn"
                id="nav${q.number}"
                onclick="goQuestion(${q.number})">

                ${q.number}

            </button>
        `;

        let html = "";

        // TRUE FALSE NOT GIVEN

        if (q.type === "tfng") {

            html = `

            <div class="question">

                <p>

                    <b>${q.number}.</b>

                    ${q.question}

                </p>

                <div class="btnGroup">

                    <button class="tfng">TRUE</button>

                    <button class="tfng">FALSE</button>

                    <button class="tfng">NOT GIVEN</button>

                </div>

            </div>

            `;

        }

        // GAP FILL

        if (q.type === "gap") {

            html = `

            <div class="question">

                <p>

                    <b>${q.number}.</b>

                    ${q.question.replace(
                        "________",
                        `<input
                            type="text"
                            class="gapInput"
                            autocomplete="off">`
                    )}

                </p>

            </div>

            `;

        }

        questionContent.innerHTML += html;

    });

    restoreAnswers();

}


// =========================================
// RESTORE ANSWERS
// =========================================

function restoreAnswers() {

    document.querySelectorAll(".question").forEach((question, index) => {

        const saved = localStorage.getItem("answer_" + index);

        if (!saved) return;

        const input = question.querySelector("input");

        if (input) {

            input.value = saved;

            document
                .getElementById("nav" + (index + 1))
                .classList.add("answered");

        }

        else {

            question.querySelectorAll(".tfng").forEach(btn => {

                if (btn.innerText === saved) {

                    btn.classList.add("selected");

                    document
                        .getElementById("nav" + (index + 1))
                        .classList.add("answered");

                }

            });

        }

    });

}


// =========================================
// QUESTION NAVIGATION
// =========================================

function goQuestion(number) {

    const q = document.querySelectorAll(".question")[number - 1];

    if (!q) return;

    q.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}

window.goQuestion = goQuestion;

// =========================================
// TRUE / FALSE / NOT GIVEN
// =========================================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("tfng")) return;

    const buttons = e.target.parentElement.querySelectorAll(".tfng");

    buttons.forEach(btn => btn.classList.remove("selected"));

    e.target.classList.add("selected");

    const question = e.target.closest(".question");

    const index =
        [...document.querySelectorAll(".question")]
        .indexOf(question);

    localStorage.setItem(
        "answer_" + index,
        e.target.innerText
    );

    document
        .getElementById("nav" + (index + 1))
        .classList.add("answered");

});


// =========================================
// GAP INPUT SAVE
// =========================================

document.addEventListener("input", e => {

    if (e.target.tagName !== "INPUT") return;

    const question = e.target.closest(".question");

    const index =
        [...document.querySelectorAll(".question")]
        .indexOf(question);

    localStorage.setItem(
        "answer_" + index,
        e.target.value
    );

    document
        .getElementById("nav" + (index + 1))
        .classList.add("answered");

});


// =========================================
// SUBMIT BUTTON
// =========================================

document.getElementById("submitBtn").onclick = () => {

    const ok = confirm(
        "Are you sure you want to submit the test?"
    );

    if (ok) {

        submitTest();

    }

};


// =========================================
// SUBMIT TEST
// =========================================

function submitTest() {

    clearInterval(countdown);

    let score = 0;

    const userAnswers = [];

    document.querySelectorAll(".question").forEach(q => {

        const selected = q.querySelector(".selected");

        if (selected) {

            userAnswers.push(
                selected.innerText.trim()
            );

        }

        else {

            const input = q.querySelector("input");

            userAnswers.push(

                input
                    ? input.value.trim().toLowerCase()
                    : ""

            );

        }

    });


    for (let i = 0; i < testData.answers.length; i++) {

        const correct =
            testData.answers[i]
            .toString()
            .trim()
            .toLowerCase();

        const user =
            userAnswers[i]
            .toString()
            .trim()
            .toLowerCase();

        if (correct === user) {

            score++;

        }

    }


    localStorage.setItem(
        "score",
        score
    );

    localStorage.setItem(
        "total",
        testData.answers.length
    );

    localStorage.setItem(
        "userAnswers",
        JSON.stringify(userAnswers)
    );

    localStorage.setItem(
        "correctAnswers",
        JSON.stringify(testData.answers)
    );


    for (let i = 0; i < testData.answers.length; i++) {

        localStorage.removeItem(
            "answer_" + i
        );

    }

    window.location.href = "result.html";

}

// =========================================
// HIGHLIGHT TOOL
// =========================================

document.getElementById("highlightBtn").addEventListener("click", () => {

    const selection = window.getSelection();

    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (selection.toString().trim() === "") return;

    // Only allow highlighting inside the passage
    if (!document.getElementById("passageContent").contains(range.commonAncestorContainer)) {
        alert("Please select text from the passage only.");
        return;
    }

    const mark = document.createElement("mark");

    try {

        range.surroundContents(mark);

        selection.removeAllRanges();

        saveHighlights();

    } catch (err) {

        alert("Please highlight text within a single paragraph.");

    }

});

function saveHighlights(){

    localStorage.setItem(
        "highlight_" + testData.title,
        passage.innerHTML
    );

}

// ====================================
// FLOATING HIGHLIGHT TOOLBAR
// ====================================

const toolbar =
document.getElementById("highlightToolbar");

let selectedRange = null;


document.addEventListener("mouseup", () => {

    const selection = window.getSelection();

    if(selection.toString().trim() === ""){

        toolbar.style.display = "none";

        return;

    }

    if(selection.rangeCount === 0){

        toolbar.style.display = "none";

        return;

    }

    selectedRange = selection.getRangeAt(0);

    const rect =
    selectedRange.getBoundingClientRect();

    toolbar.style.left =
    rect.left + window.scrollX + "px";

    toolbar.style.top =
    rect.top + window.scrollY - 50 + "px";

    toolbar.style.display = "block";

});
