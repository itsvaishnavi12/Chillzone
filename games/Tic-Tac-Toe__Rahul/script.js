document.getElementById("reset-scores").addEventListener("click", ()=>{
    document.getElementById("x-score").innerHTML = 0
    document.getElementById("tie-score").innerHTML = 0
    document.getElementById("o-score").innerHTML = 0
})

function reset(){
  document.querySelectorAll(".cell").forEach(cell =>{
    cell.textContent = "";
    cell.style.color = "";
    document.getElementsByClassName("xer")[0].classList.add("active")
    document.getElementsByClassName("oer")[0].classList.remove("active")
  })
}

let xscore =0;
let oscore=0;
let tiescore=0;

const cells = document.querySelectorAll(".cell");
let count = 0;
cells.forEach(cell => {
    cell.addEventListener("click", (e)=>{
        let clicked = e.target;
        let cls = clicked.classList[1];
        console.log(cls)
        if(document.getElementsByClassName(cls)[0].innerHTML === ""){
          count++;
        }

        if(count%2==1){
            if(document.getElementsByClassName(cls)[0].innerHTML === ""){
                document.getElementsByClassName(cls)[0].style.color = "rgb(34, 211, 238)";
                document.getElementsByClassName(cls)[0].innerHTML = "X";
                document.getElementsByClassName("xer")[0].classList.remove("active")
                document.getElementsByClassName("oer")[0].classList.add("active")
            }
        }
        else{
            if(document.getElementsByClassName(cls)[0].innerHTML === ""){
                document.getElementsByClassName(cls)[0].style.color = "rgb(251, 146, 60)"
                document.getElementsByClassName(cls)[0].innerHTML = "O";
                document.getElementsByClassName("xer")[0].classList.add("active")
                document.getElementsByClassName("oer")[0].classList.remove("active")
            }
        }

let cell1 = document.querySelector(".cell1").textContent.trim();
let cell2 = document.querySelector(".cell2").textContent.trim();
let cell3 = document.querySelector(".cell3").textContent.trim();
let cell4 = document.querySelector(".cell4").textContent.trim();
let cell5 = document.querySelector(".cell5").textContent.trim();
let cell6 = document.querySelector(".cell6").textContent.trim();
let cell7 = document.querySelector(".cell7").textContent.trim();
let cell8 = document.querySelector(".cell8").textContent.trim();
let cell9 = document.querySelector(".cell9").textContent.trim();

if (
  (cell1 === "X" && cell2 === "X" && cell3 === "X") ||
  (cell4 === "X" && cell5 === "X" && cell6 === "X") ||
  (cell7 === "X" && cell8 === "X" && cell9 === "X") ||
  (cell1 === "X" && cell4 === "X" && cell7 === "X") ||
  (cell2 === "X" && cell5 === "X" && cell8 === "X") ||
  (cell3 === "X" && cell6 === "X" && cell9 === "X") ||
  (cell1 === "X" && cell5 === "X" && cell9 === "X") ||
  (cell3 === "X" && cell5 === "X" && cell7 === "X")
) {
    xscore++;
  document.getElementById("x-score").innerHTML = xscore;
  setTimeout(()=>{
    reset()
  },1000)
} 
else if (
  (cell1 === "O" && cell2 === "O" && cell3 === "O") ||
  (cell4 === "O" && cell5 === "O" && cell6 === "O") ||
  (cell7 === "O" && cell8 === "O" && cell9 === "O") ||
  (cell1 === "O" && cell4 === "O" && cell7 === "O") ||
  (cell2 === "O" && cell5 === "O" && cell8 === "O") ||
  (cell3 === "O" && cell6 === "O" && cell9 === "O") ||
  (cell1 === "O" && cell5 === "O" && cell9 === "O") ||
  (cell3 === "O" && cell5 === "O" && cell7 === "O")
) {
    oscore++;
  document.getElementById("o-score").innerHTML = oscore;
  setTimeout(()=>{
    reset()
  },1000)
}
else if(cell1!==""&&cell2!==""&&cell3!==""&&cell4!==""&&cell5!==""&&cell6!==""&&cell7!==""&&cell8!==""&&cell9!==""){
  tiescore++;
  document.getElementById("tie-score").innerHTML = tiescore;
  setTimeout(()=>{
    reset()
  },1000)
}
    })
});

document.querySelector("#reset-game").addEventListener("click",()=>{
  reset()
})