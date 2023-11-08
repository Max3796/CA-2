//to navigate to next page
let x = document.getElementById("x")
x.addEventListener("click",()=>{
    window.location.href = "../game mode/mode.html"
})
//background music
var audio = new Audio("./Spring-Flowers.mp3");
var audioIsPlaying = false;

function playBackgroundMusic() {
  if (!audioIsPlaying) {
    audio.play();
  
    audioIsPlaying = true;
  }
}
playBackgroundMusic()