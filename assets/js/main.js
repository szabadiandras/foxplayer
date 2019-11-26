"use strict";

let playstate = document.querySelector(".playstate");

playstate.addEventListener("click", function(e) {
  console.log("Play/Pause button clicked.");

  if (playstate.className.match("play")) {
    playstate.className = "paused";
    playstate.classList.add("pause");
    playstate.classList.remove("play");
  } else {
    playstate.className = "play";
    playstate.classList.add("play");
    playstate.classList.remove("paused");
  }
});

let volume = document.querySelector(".volume");
let volumeslider = document.querySelector("#volumeSlider");

volume.addEventListener("click", function(e) {
  console.log("Volume button clicked.");

  if (volume.className.match("loud")) {
    volume.className = "muted";
    volume.classList.add("muted");
    volume.classList.remove("loud");
    volumeslider.disabled = true;
    volumeslider.classList.add("disable");
  } else {
    volume.className = "loud";
    volume.classList.add("loud");
    volume.classList.remove("paused");
    volumeslider.disabled = false;
    volumeslider.classList.remove("disable");
  }
});
