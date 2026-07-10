/* =====================================
   SGR Tamim IELTS Timer
===================================== */

const TIMER_KEY = "reading_timer";

const DEFAULT_TIME = 30 * 60;

let totalSeconds = Number(localStorage.getItem(TIMER_KEY));

if (isNaN(totalSeconds) || totalSeconds <= 0) {

    totalSeconds = DEFAULT_TIME;

}

const timer = document.getElementById("timer");

function formatTime(seconds){

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return (
        String(mins).padStart(2,"0") +
        ":" +
        String(secs).padStart(2,"0")
    );

}

function updateTimer(){

    timer.textContent = formatTime(totalSeconds);

    if(totalSeconds===600){

        alert("⚠ Only 10 minutes remaining.");

    }

    if(totalSeconds===300){

        alert("⚠ Only 5 minutes remaining.");

    }

    if(totalSeconds===60){

        alert("⚠ Only 1 minute remaining.");

    }

    if(totalSeconds<=0){

        clearInterval(countdown);

        localStorage.removeItem(TIMER_KEY);

        alert("Time is over. Your test will now be submitted.");

        if(typeof submitTest==="function"){

            submitTest();

        }

        return;

    }

    totalSeconds--;

    localStorage.setItem(TIMER_KEY,totalSeconds);

}

updateTimer();

const countdown = setInterval(updateTimer,1000);

/* ===========================
   Reset Timer After Submit
=========================== */

function resetReadingTimer(){

    clearInterval(countdown);

    localStorage.removeItem(TIMER_KEY);

}
