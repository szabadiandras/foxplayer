"use strict";

let index = new XMLHttpRequest();
index.open("GET", "http://localhost:5000/playlists", true);
let lists = document.querySelector(".lists");
let track = document.querySelector(".track");

// GENERATE PLAYLISTS

index.onload = function() {
  let response = JSON.parse(index.responseText);

  for (let i = 0; i < response.length; i++) {
    let generatedpl = document.createElement("div");
    let removepl = document.createElement("button");
    //let numtr = document.createElement("p");

    generatedpl.classList.add("generatedpl");
    removepl.classList.add("removepl");
    // numtr.classList.add("numtr");

    removepl.setAttribute("value", "remove");
    removepl.setAttribute("id", response[i].id);
    generatedpl.innerText = response[i].playlist;
    // numtr.innerText = i;

    lists.appendChild(generatedpl);
    generatedpl.appendChild(removepl);
    // generatedtr.appendChild(numtr);
  }

  for (let i = 0; i < response.length; i++) {
    console.log(response);
    let generatedtr = document.createElement("div");
    generatedtr.classList.add("generatedtr");
    generatedtr.innerHTML = `<strong>${[i + 1]}</strong> ... ${
      response[i].trackname
    }`;
    track.appendChild(generatedtr);
  }
};

index.send();

// LISTENING TO KEYPRESS

let playstate = document.querySelector(".playstate");
let audio = document.querySelector("audio");

document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    console.log("space pressed");
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
  }
};

// LISTENING TO CLICK

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

// LISTENING TO CLICK ON VOLUME

let volume = document.querySelector(".volume");
let volumeslider = document.querySelector("#volumeSlider");

volume.addEventListener("click", function(e) {
  console.log("Mute button clicked.");

  if (volume.className.match("loud")) {
    volume.className = "muted";
    volume.classList.add("muted");
    volume.classList.remove("loud");
    volumeslider.disabled = true;
    volumeslider.classList.add("disable");
  } else {
    volume.className = "loud";
    volume.classList.add("loud");
    volumeslider.disabled = false;
    volumeslider.classList.remove("disable");
  }
});

// POST TO PLAYLIST

let createButton = document.querySelector(".createButton");
let alert = document.querySelector("#alert");

createButton.addEventListener("click", function() {
  let title = document.getElementById("newpl");
  let fetchSettings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      playlist: title.value
    }),
    mode: "cors"
  };
  console.log(fetchSettings);
  fetch("http://localhost:5000/playlists", fetchSettings)
    .then(response => response.json())
    .then(
      mydata =>
        (alert.innerHTML = `Your new playlist called <strong>${mydata[0].playlist}</strong> has been created!`)
    )
    .catch(error => console.log(error));
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

// DELETE PLAYLIST

let request = new XMLHttpRequest();
let body = document.querySelector("body");
body.addEventListener("click", function(e) {
  let id = event.target.id;
  let action = event.target.value;
  let response = JSON.parse(index.responseText);
  if (id !== undefined && action == "remove") {
    request.open(
      "DELETE",
      `http://localhost:5000/playlists/${id}/Xremove`,
      true
    );
    console.log("id from response" + response.system);
    console.log("id: " + id);
    console.log("action: " + action);
    console.log(event);
    console.log(response);
    request.send();
  }
});
