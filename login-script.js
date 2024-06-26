const enterBtn = document.querySelector(".input-done");
const skipBtn = document.querySelector(".input-skip");
const infoBtn = document.querySelector(".input-tag span");
const infoBox = document.getElementById("alertName");
const closeBtn = document.getElementById("cancel");

skipBtn.addEventListener("click",skip);
enterBtn.addEventListener("click",enter);
infoBtn.addEventListener("click",showInfo);
closeBtn.addEventListener("click",closeInfo);

function enter(){
    const userName = document.querySelector(".input-text").value;
    // console.log(userName);
    if(userName == ""){
        alert("Enter Name");
    }
    else{
        localStorage.setItem("Name",userName);
        window.location.href = "page2.html";
    }
}

function skip(){
    const userName = "";
    localStorage.setItem("Name",userName);
    window.location.href = "page2.html";
}

function showInfo(){
    infoBox.style.visibility = "visible";
}

function closeInfo(){
    infoBox.style.visibility = "hidden";
}