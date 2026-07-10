const list=document.getElementById("questions");

let number=1;

document.getElementById("addTFNG").onclick=()=>{

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


document.getElementById("addGap").onclick=()=>{

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

const json=JSON.stringify(data,null,2);

const blob=new Blob([json],{type:"application/json"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="reading1.json";

link.click();

};