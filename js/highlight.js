// ===============================
// SGR IELTS Highlight Engine v1
// ===============================

const toolbar = document.getElementById("highlightToolbar");
const highlightBtn = document.getElementById("highlightAction");

let currentRange = null;

// Show toolbar when text is selected
document.addEventListener("mouseup", () => {

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

    // Only allow highlighting inside passage or questions
    const allowed =
        document.getElementById("passageContent").contains(range.commonAncestorContainer) ||
        document.getElementById("questionContent").contains(range.commonAncestorContainer);

    if (!allowed) {
        toolbar.style.display = "none";
        return;
    }

    currentRange = range.cloneRange();

    const rect = range.getBoundingClientRect();

    toolbar.style.left =
        window.scrollX + rect.left + rect.width / 2 - toolbar.offsetWidth / 2 + "px";

    toolbar.style.top =
        window.scrollY + rect.top - 50 + "px";

    toolbar.style.display = "block";

});
