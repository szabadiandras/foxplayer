'use strict';

let playstate = document.querySelector('.playstate');

playstate.addEventListener('click', function(e) {
  console.log('play clicked');
  playstate.classList.remove("play")
  playstate.classList.add("pause");
});