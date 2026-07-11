import {
  db,
  collection,
  addDoc
} from "./firebase.js";

const list = document.getElementById("questions");

let number = 1;

// =======================
// ADD QUESTION
// =======================

document.getElementById("addQuestion").onclick = () => {

  list.innerHTML += `

  <div class="question">

      <h3>Question ${number}</h3>

      <label>Type</label><br>

      <select class="type">
          <option value="tfng">TRUE / FALSE / NOT GIVEN</option>
          <option value="gap">Gap Fill</option>
      </select>

      <br><br>

      <input
      class="q"
      placeholder="Question"
      style="width:100%;padding:10px;">

      <br><br>

      <input
      class="a"
      placeholder="Correct Answer"
      style="width:100%;padding:10px;">

      <br><br>

      <button class="delete">
      🗑 Delete Question
      </button>

      <hr>

  </div>

  `;

  number++;

};

// =======================
// DELETE QUESTION
// =======================

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("delete")) return;

    e.target.parentElement.remove();

});

// =======================
// SAVE TEST
// =======================

document.getElementById("save").onclick = async () => {

    const data = {

        title: document.getElementById("title").value,

        time: Number(document.getElementById("time").value),

        passage: document.getElementById("passage").value,

        questions: [],

        answers: []

    };

    document.querySelectorAll(".question").forEach((box,i)=>{

        const type = box.querySelector(".type").value;

        const question = box.querySelector(".q").value;

        const answer = box.querySelector(".a").value;

        data.questions.push({

            number:i+1,

            type:type,

            question:question

        });

        data.answers.push(answer);

    });

    try{

        await addDoc(collection(db,"readingTests"),data);

        alert("✅ Test published successfully!");

    }catch(error){

        console.error(error);

        alert("❌ Failed to publish test.");

    }

};