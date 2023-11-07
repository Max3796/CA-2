let x = document.getElementById("x")
x.addEventListener("click",()=>{
    window.location.href = "../game mode/mode.html"
})
var audio = new Audio("./Spring-Flowers.mp3");
var audioIsPlaying = false;

function playBackgroundMusic() {
  if (!audioIsPlaying) {
    audio.play();
  
    audioIsPlaying = true;
  }
}
playBackgroundMusic()