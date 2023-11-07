let playNow = document.getElementById("play-now")
console.log("playNow: ", playNow);


playNow.addEventListener("click" , nickName )
function nickName(){
    window.location.href="./assets/nickNamePage/name.html"
}
// background-music.js
var audio = new Audio("./assets/main/Spring-Flowers.mp3");
var audioIsPlaying = false;

function playBackgroundMusic() {
  if (!audioIsPlaying) {
    audio.play();
  
    audioIsPlaying = true;
  }
}
playBackgroundMusic()


