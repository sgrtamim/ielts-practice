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

        passage.innerHTML = testData.passage;

        totalSeconds = testData.time * 60;

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
