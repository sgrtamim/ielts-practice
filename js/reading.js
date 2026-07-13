// =========================================
// SGR IELTS Reading System V2
// Part 1 - Variables & DOM
// =========================================

// ---------- Test Data ----------

let testData = null;

// ---------- Passage ----------

const passage =
document.getElementById("passageContent");

// ---------- Questions ----------

const questionContent =
document.getElementById("questionContent");

// ---------- Navigator ----------

const navigatorBox =
document.getElementById("navigator");

// ---------- Timer ----------

const timer =
document.getElementById("timer");

// ---------- Title ----------

const testTitle =
document.getElementById("testTitle");

// ---------- Submit ----------

const submitBtn =
document.getElementById("submitBtn");

// ---------- Divider ----------

const divider =
document.getElementById("divider");

const passagePanel =
document.getElementById("passagePanel");

// ---------- Zoom Buttons ----------

const passagePlus =
document.getElementById("passagePlus");

const passageMinus =
document.getElementById("passageMinus");

const questionPlus =
document.getElementById("questionPlus");

const questionMinus =
document.getElementById("questionMinus");

// ---------- URL ----------

const params =
new URLSearchParams(window.location.search);

const testId =
params.get("id") || "reading1";

// ---------- Timer ----------

let totalSeconds = 0;

let countdown = null;

// ---------- Font Sizes ----------

let passageFont = 18;

let questionFont = 18;

// =========================================
// Start Reading Test
// =========================================

loadTest(testId);

// =========================================
// Load JSON Test
// =========================================

async function loadTest(id){

    try{

        const response =
        await fetch(
            `data/reading/${id}.json`
        );

        if(!response.ok){

            throw new Error("Cannot load test.");

        }

        testData =
        await response.json();

        testTitle.textContent =
        testData.title;

        passage.innerHTML =
        testData.passage;

        totalSeconds =
        Number(
            localStorage.getItem("readingTime")
        ) * 60 ||
        testData.time * 60;

        buildQuestions();

        startTimer();

    }

    catch(error){

        console.error(error);

        passage.innerHTML =
        "<h2>Unable to load passage.</h2>";

        questionContent.innerHTML =
        "";

    }

}
