"use strict";

let index = new XMLHttpRequest();
index.open("GET", "http://localhost:5000/playlists", true);
let lists = document.querySelector(".lists");

// GENERATE PLAYLISTS

index.onload = function() {
  let response = JSON.parse(index.responseText);

  for (let i = 0; i < response.length; i++) {
    let generatedpl = document.createElement("div");
    let removepl = document.createElement("button");

    generatedpl.classList.add("generatedpl");
    removepl.classList.add("removepl");

    removepl.setAttribute("value", "remove");
    removepl.setAttribute("id", response[i].id);
    generatedpl.innerText = response[i].playlist;

    lists.appendChild(generatedpl);
    generatedpl.appendChild(removepl);
  }
};
index.send();


// GENERATE TRACKS

let index2 = new XMLHttpRequest();
index2.open("GET", "http://localhost:5000/playlist-tracks", true);
let track2 = document.querySelector(".track");

index2.onload = function() {
  let response = JSON.parse(index2.responseText);
  console.log("second for loop " + response);
  for (let i = 0; i < response.length; i++) {
    let generatedtr = document.createElement("div");
    let removetr = document.createElement("button");
    generatedtr.classList.add("generatedtr");
    removetr.classList.add("removetr");
    removetr.setAttribute("value", "remove");
    removetr.setAttribute("id", response[i].id);
    generatedtr.innerText = [i+1] + ' - ' + response[i].trackname;
    console.log(response[i].trackname);
    track2.appendChild(generatedtr);
    generatedtr.appendChild(removetr);
  }
};
index2.send();

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

// POST TO TRACKS

let createButton2 = document.querySelector(".createButton2");

createButton2.addEventListener("click", function() {
  let trackname = document.getElementById("newtr");
  let path = document.getElementById("newpth");
  let fetchSettings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trackname: trackname.value,
      path: path.value
    }),
    mode: "cors"
  };
  console.log(fetchSettings);
  fetch("http://localhost:5000/playlist-tracks", fetchSettings)
    .then(response => response.json())
    .then(
      mydata =>
        (alert.innerHTML = `Your new track called <strong>${mydata[0].trackname}</strong> has been added!`)
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

// TESTING MODAL FOR ADDING SONG

var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("close2")[0];

btn2.onclick = function() {
  modal2.style.display = "block";
};
span2.onclick = function() {
  modal2.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
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
      `http://localhost:5000/playlists/${id}/remove`,
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
