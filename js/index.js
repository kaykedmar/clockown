import sound from "./sounds.js";

const btnPlay = document.querySelector(".btnPlay");
const btnPause = document.querySelector(".btnPause");
const btnStop = document.querySelector(".btnStop");
const btnSet = document.querySelector(".btnSet");

const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");

let minutes = Number(minutesDisplay.innerHTML);
let seconds = Number(secondsDisplay.innerHTML);

let timeDown;

const sounds = sound();


function updateTimeDisplay(minutes, seconds) {
  minutesDisplay.innerHTML = String(minutes).padStart(2, "0");
  secondsDisplay.innerHTML = String(seconds).padStart(2, "0");
}

function resetControls() { 
  btnPlay.classList.remove("hide");
  btnPause.classList.add("hide");
  btnSet.classList.remove("hide");
  btnStop.classList.add("hide");
}

function resetTime() {
  updateTimeDisplay(minutes, 0)
  clearTimeout(timeDown)
}

function clockDown() {
  timeDown = setTimeout(() => {
    let minutes = Number(minutesDisplay.innerHTML);
    let seconds = Number(secondsDisplay.innerHTML);

    if (minutes <= 0 && seconds <= 0) {
      resetControls()
      sounds.timeEnd()
      sounds.bgAudio.pause();
      return;
    }

    if (seconds <= 0) {
      seconds = 2;
      --minutes;
    }

    updateTimeDisplay(minutes, String(seconds - 1));

    clockDown();
  }, 1000);
}




btnPlay.addEventListener("click", () => {
  btnPlay.classList.add("hide");
  btnPause.classList.remove("hide");
  btnSet.classList.add("hide");
  btnStop.classList.remove("hide");
  clockDown();

  sounds.btnPressAudio()
  sounds.bgAudio.play();
});

btnPause.addEventListener("click", () => {
  btnPause.classList.add("hide");
  btnPlay.classList.remove("hide");
  btnStop.classList.add("hide");
  btnSet.classList.remove("hide");

  clearTimeout(timeDown)
  sounds.btnPressAudio()
  sounds.bgAudio.pause();
});

btnStop.addEventListener("click", () => {
  btnPlay.classList.remove("hide");
  btnPause.classList.add("hide");
  btnSet.classList.remove("hide");
  btnStop.classList.add("hide");
  resetControls()
  resetTime()
  sounds.btnPressAudio()
});

btnSet.addEventListener("click", () => {
  let newMinutes = prompt("How many Time?") || 30

  minutes = Number(newMinutes);

  minutesDisplay.innerHTML = String(minutes).padStart(2, "0");
});
