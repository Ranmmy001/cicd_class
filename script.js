selectMenu = document.querySelectorAll("select"),
content = document.querySelector(".content"),
setAlarmBtn = document.querySelector("#setAlarm");


let alarmTime; isAlarmSet = false,
ringtone = new Audio("./files/fantasy.mp3")

for ( let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}<option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}<option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}<option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}




setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM"



    // if(hour >= 0 && hour < 10){
    //     hour = `0${hour}`
    // }else{ampm = "PM"}
    // if(minute >= 0 && minute < 10){
    //     minute = `0${minute}`
    // }
    // if(second >= 0 && second < 10){
    //     second = `0${second}`
    // }



    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    // if hour value is 0, set tthis value to 12
    h = h == 0 ? h = 12 : h;
    // adding 0 before hr, min, sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.querySelector("h1").innerHTML = `${h}:${m}:${s} ${ampm}`;
    if (alarmTime == `${h}:${m}:${ampm}`){
        ringtone.play();
        ringtone.loop = true; 
        }

}, 1000);

function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable")
        setAlarmBtn.innerText = "Set alarm";
        return isAlarmSet = false
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
    time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM") ? alert("please select a valid time to set Alarm!") : null;
    isAlarmSet = true
    alarmTime = time;
    content.classList.add("disable")
    setAlarmBtn.innerText = "Clear alarm";
}



setAlarmBtn.addEventListener("click", setAlarm)

