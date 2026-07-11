// ========================================
// GLOBAL VARIABLES
// ========================================

let testData = null;

const passage = document.getElementById("passageContent");
const questions = document.getElementById("questionContent");
const navigatorBox = document.getElementById("navigator");
const timer = document.getElementById("timer");

let passageFont = 18;
let questionFont = 18;

let totalSeconds = 1800;
let countdown;


// ========================================
// FONT SIZE
// ========================================

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


// ========================================
// DRAG DIVIDER
// ========================================

const divider = document.getElementById("divider");
const leftPanel = document.getElementById("passagePanel");

let dragging = false;

divider.addEventListener("mousedown", () => {
    dragging = true;
});

document.addEventListener("mouseup", () => {
    dragging = false;
});

document.addEventListener("mousemove", e => {

    if (!dragging) return;

    let width = (e.clientX / window.innerWidth) * 100;

    width = Math.max(25, Math.min(75, width));

    leftPanel.style.width = width + "%";

});


// ========================================
// TIMER
// ========================================

function startTimer() {

    clearInterval(countdown);

    updateTimer();

    countdown = setInterval(updateTimer, 1000);

}

function updateTimer() {

    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;

    timer.textContent =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0");

    if (totalSeconds === 300)
        alert("Only 5 minutes remaining.");

    if (totalSeconds === 60)
        alert("Only 1 minute remaining.");

    if (totalSeconds <= 0) {

        clearInterval(countdown);

        submitTest();

        return;

    }

    totalSeconds--;

}


// ========================================
// LOAD TEST
// ========================================

const params = new URLSearchParams(window.location.search);

const fileName = params.get("id") || "reading1";

loadTest(fileName);

async function loadTest(file) {

    try {

        const response = await fetch(`data/reading/${file}.json`);

        if (!response.ok)
            throw new Error("Cannot load test.");

        testData = await response.json();

        document.getElementById("testTitle").textContent =
            testData.title;

        passage.innerHTML = testData.passage;

        totalSeconds = testData.time * 60;

        startTimer();

        buildQuestions();

    }

    catch (err) {

        console.error(err);

        passage.innerHTML =
            "<h2>Unable to load the test.</h2>";

        questions.innerHTML = "";

    }

}


// ========================================
// BUILD QUESTIONS
// ========================================

function buildQuestions() {

    questions.innerHTML = "";
    navigatorBox.innerHTML = "";

    testData.questions.forEach(q => {

        navigatorBox.innerHTML += `
            <button
                class="navBtn"
                id="nav${q.number}"
                onclick="goQuestion(${q.number})">

                ${q.number}

            </button>
        `;

        if (q.type === "tfng") {

            questions.innerHTML += `
                <div class="question">

                    <p>
                        <b>${q.number}.</b>
                        ${q.question}
                    </p>

                    <button class="tfng">TRUE</button>
                    <button class="tfng">FALSE</button>
                    <button class="tfng">NOT GIVEN</button>

                </div>
            `;

        }

        if (q.type === "gap") {

            questions.innerHTML += `
                <div class="question">

                    <p>

                        <b>${q.number}.</b>

                        ${q.question.replace(
                            "________",
                            '<input type="text">'
                        )}

                    </p>

                </div>
            `;

        }

    });

    restoreAnswers();

}
