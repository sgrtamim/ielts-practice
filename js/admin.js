import {
    db,
    collection,
    addDoc
} from "./firebase.js";

const list=document.getElementById("questions");

let number=1;

document.getElementById("addQuestion").onclick = () => {

list.innerHTML += `

<div class="question">

<h3>Question ${number}</h3>

<label>Type</label>

<select class="type">

<option value="tfng">TRUE / FALSE / NOT GIVEN</option>

<option value="gap">Gap Fill</option>

</select>

<input
class="q"
placeholder="Question">

<input
class="a"
placeholder="Correct Answer">

<button class="delete">
🗑 Delete
</button>

</div>

`;

number++;

};

list.innerHTML+=`

<div class="question">

<h3>Question ${number}</h3>

<input class="q" placeholder="Question">

<input class="a" placeholder="Answer (TRUE/FALSE/NOT GIVEN)">

<input type="hidden" class="type" value="tfng">

</div>

`;

number++;

};


document.getElementById("addQuestion").onclick = () => {

list.innerHTML += `

<div class="question">

<h3>Question ${number}</h3>

<label>Type</label>

<select class="type">

<option value="tfng">TRUE / FALSE / NOT GIVEN</option>

<option value="gap">Gap Fill</option>

</select>

<input
class="q"
placeholder="Question">

<input
class="a"
placeholder="Correct Answer">

<button class="delete">
🗑 Delete
</button>

</div>

`;

number++;

};

list.innerHTML+=`

<div class="question">

<h3>Question ${number}</h3>

<input class="q" placeholder="Question with ______">

<input class="a" placeholder="Correct Answer">

<input type="hidden" class="type" value="gap">

</div>

`;

number++;

};


document.getElementById("save").onclick=()=>{

const data={

title:document.getElementById("title").value,

time:Number(document.getElementById("time").value),

passage:document.getElementById("passage").value,

questions:[],

answers:[]

};

document.querySelectorAll(".question").forEach((box,i)=>{

const type=box.querySelector(".type").value;

const question=box.querySelector(".q").value;

const answer=box.querySelector(".a").value;

data.questions.push({

type:type,

number:i+1,

question:question

});

data.answers.push(answer);

});

addDoc(collection(db,"readingTests"),data)

.then(()=>{

    alert("✅ Test published successfully!");

})

.catch(error=>{

    console.error(error);

    alert("❌ Failed to publish test.");

});