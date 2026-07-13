// ========================================
// SGR IELTS Reading System V2
// ========================================

// ---------- Global Variables ----------

let testData = null;

let totalSeconds = 0;

let timerInterval = null;

let passageFont = 18;
let questionFont = 18;

// ---------- DOM ----------

const passage = document.getElementById("passageContent");
const questionContent = document.getElementById("questionContent");
const navigatorBox = document.getElementById("navigator");
const timer = document.getElementById("timer");
const title = document.getElementById("testTitle");

const submitBtn = document.getElementById("submitBtn");

const divider = document.getElementById("divider");
const passagePanel = document.getElementById("passagePanel");

const passagePlus = document.getElementById("passagePlus");
const passageMinus = document.getElementById("passageMinus");

const questionPlus = document.getElementById("questionPlus");
const questionMinus = document.getElementById("questionMinus");

// ---------- URL ----------

const params = new URLSearchParams(window.location.search);

const testId = params.get("id") || "reading1";

// ---------- Start ----------

loadTest();

// ========================================
// LOAD TEST
// ========================================

async function loadTest(){

    try{

        const response =
        await fetch(`data/reading/${testId}.json`);

        if(!response.ok){

            throw new Error("Cannot load JSON");

        }

        testData =
        await response.json();

        title.textContent =
        testData.title;

        passage.innerHTML =
        testData.passage;

        totalSeconds =
        (
            Number(localStorage.getItem("readingTime"))
            ||
            testData.time
        ) * 60;

        buildQuestions();

        startTimer();

    }

    catch(err){

        console.error(err);

        passage.innerHTML =
        "<h2>Unable to load passage.</h2>";

        questionContent.innerHTML =
        "";

    }

}
