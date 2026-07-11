const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("total")) || 13;

document.getElementById("score").innerHTML =
`${score} / ${total}`;

let band = "0.0";

const percent = score / total;

if(percent>=0.9) band="9.0";
else if(percent>=0.8) band="8.0";
else if(percent>=0.7) band="7.0";
else if(percent>=0.6) band="6.0";
else if(percent>=0.5) band="5.5";
else if(percent>=0.4) band="5.0";
else if(percent>=0.3) band="4.5";

document.getElementById("band").innerHTML =
"Estimated Band: "+band;