let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let playerOturn = true;
let newgame = document.querySelector("#newbtn");
let msg=document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container")
let winningpatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
];

boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        if(playerOturn){
            box.innerText = "O";
            playerOturn = false;
        }else{
            box.innerText = "X";
            playerOturn = true;
        }
        box.disabled = true;
        checkwinner();
    });
});   
const reset=()=>{
    playerOturn=true;
    enableboxes();
}
const enableboxes=()=>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
        msgcontainer.classList.add("hide");
    }
}; 
const disablebtns=()=>{
    for (let box of boxes){
        box.disabled=true;
    }
};  
const showwinner=(winner)=>{
    msg.innerText = `Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebtns();
}
const checkwinner = () =>{
    for( let eachpattern of winningpatterns){
        // console.log(boxes[eachpattern[0]].innerText,boxes[eachpattern[1]].innerText,boxes[eachpattern[2]].innerText)
        let box1=boxes[eachpattern[0]].innerText; 
        let box2=boxes[eachpattern[1]].innerText;
        let box3=boxes[eachpattern[2]].innerText;
        if(box1!="" && box2!="" && box3!=""){
            if(box1==box2 && box2==box3){
               showwinner(box1);
            }
        } 
    }
};
newgame.addEventListener("click", reset);
resetbtn.addEventListener("click", reset);
