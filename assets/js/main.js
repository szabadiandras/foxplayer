"use strict";

let playstate = document.querySelector(".playstate");
let audio = document.querySelector("audio");

playstate.addEventListener("click", function(e) {
  console.log("Play/Pause button clicked.");

  if (playstate.className.match("play")) {
    playstate.className = "paused";
    playstate.classList.add("pause");
    playstate.classList.remove("play");
    audio.play();
  } else {
    playstate.className = "play";
    playstate.classList.add("play");
    playstate.classList.remove("paused");
    audio.pause();
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
    í;
    volumeslider.disabled = false;
    volumeslider.classList.remove("disable");
  }
});

// TESTING MODAL

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// CREATE NEW PLAYLIST

let createButton = document.querySelector(".createButton");

createButton.addEventListener("click", function() {
  let title = document.getElementById("newpl");
  let fetchSettings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: 
      
    }),
    mode: "cors"
  };
  console.log(fetchSettings);
  fetch("http://localhost:8080/api/links", fetchSettings)
    .then(response => response.json())
    .then(mydata =>
      (div.innerHTML = `Your URL is aliased to <strong>${mydata[0].alias}</strong> and your secret code is <strong>${mydata[0].secretCode}</strong>.`)(
        (div.innerHTML = `<style="color:red;">Your alias is already in use!</style>`)
      )
    )
    .catch(error => console.log(error));
});
