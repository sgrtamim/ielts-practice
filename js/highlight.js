// =======================================
// SGR IELTS Highlight Engine v2
// =======================================

const toolbar = document.getElementById("highlightToolbar");
const highlightBtn = document.getElementById("highlightAction");
console.log("Toolbar:", toolbar);
console.log("Button:", highlightBtn);

let currentRange = null;

// -------------------------------
// Show toolbar
// -------------------------------

document.addEventListener("selectionchange", () => {

    console.log("Selection changed");

    const selection = window.getSelection();
    
    if (!selection.rangeCount) {

        toolbar.style.display = "none";
        return;

    }

    if (selection.toString().trim() === "") {

        toolbar.style.display = "none";
        return;

    }

    const range = selection.getRangeAt(0);

    const passage =
        document.getElementById("passageContent");

    const questions =
        document.getElementById("questionContent");

    if (
        !passage.contains(range.commonAncestorContainer) &&
        !questions.contains(range.commonAncestorContainer)
    ) {

        toolbar.style.display = "none";
        return;

    }

    currentRange = range.cloneRange();
    
    console.log("Showing toolbar");
    
    toolbar.style.display = "block";

    const rect = range.getBoundingClientRect();

    const width = toolbar.offsetWidth;

    toolbar.style.left =
        window.scrollX +
        rect.left +
        rect.width / 2 -
        width / 2 +
        "px";

    toolbar.style.top =
        window.scrollY +
        rect.top -
        55 +
        "px";

});


// -------------------------------
// Hide toolbar
// -------------------------------

document.addEventListener("mousedown", function(e){

    if(
        toolbar.contains(e.target)
    ) return;

    setTimeout(()=>{

        if(
            window.getSelection().toString()==""
        ){

            toolbar.style.display="none";

        }

    },50);

});


// -------------------------------
// Highlight
// -------------------------------

highlightBtn.addEventListener("mousedown", function(e){

    e.preventDefault();

    if(!currentRange) return;

    try{

        const mark =
        document.createElement("mark");

        currentRange.surroundContents(mark);

        toolbar.style.display="none";

        window.getSelection().removeAllRanges();

        saveHighlights();

    }

    catch(err){

    toolbar.style.display = "none";

}

});


// -------------------------------
// Save
// -------------------------------

function saveHighlights(){

    const id =
    new URLSearchParams(
        window.location.search
    ).get("id") || "reading1";

    localStorage.setItem(

        "highlight_passage_"+id,

        document.getElementById(
            "passageContent"
        ).innerHTML

    );

    localStorage.setItem(

        "highlight_question_"+id,

        document.getElementById(
            "questionContent"
        ).innerHTML

    );

}

// -------------------------------
// Load Highlights
// -------------------------------

function loadHighlights(){

    const id =
        new URLSearchParams(location.search).get("id") || "reading1";

    const savedPassage =
        localStorage.getItem("highlight_passage_" + id);

    const savedQuestion =
        localStorage.getItem("highlight_question_" + id);

    if(savedPassage){

        document.getElementById("passageContent").innerHTML =
            savedPassage;

    }

    if(savedQuestion){

        document.getElementById("questionContent").innerHTML =
            savedQuestion;

    }

}
