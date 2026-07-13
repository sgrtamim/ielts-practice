// ===============================
// Loader
// ===============================

window.app = {
    testData: null,
    totalSeconds: 0,
    countdown: null,
    passageFont: 18,
    questionFont: 18
};

const passage = document.getElementById("passageContent");
const questionContent = document.getElementById("questionContent");
const navigatorBox = document.getElementById("navigator");
const timer = document.getElementById("timer");
const title = document.getElementById("testTitle");

const params = new URLSearchParams(window.location.search);
const testId = params.get("id") || "reading1";

loadTest();

async function loadTest(){

    try{

        const response = await fetch(`data/reading/${testId}.json`);

        if(!response.ok){
            throw new Error("Cannot load JSON");
        }

        app.testData = await response.json();

        title.textContent = app.testData.title;

        passage.innerHTML = app.testData.passage;

        const selectedTime =
            Number(localStorage.getItem("readingTime"));

        app.totalSeconds =
            (selectedTime || app.testData.time) * 60;

        buildQuestions();

        startTimer();

    }

    catch(err){

        console.error(err);

        passage.innerHTML =
        "<h2>Unable to load test.</h2>";

        questionContent.innerHTML = "";

    }

}
