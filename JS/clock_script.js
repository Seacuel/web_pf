let now;
let year;
let month;
let day;
let hour;
let minute;
let second;

function timeInfo() {
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth() + 1;
  day = now.getDate();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
}

function currentTime() {
  timeInfo();
  document.querySelector("#clock_digital").innerHTML =
    `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

function clock() {
  currentTime();
  setInterval(currentTime, 1000);
}

clock();
