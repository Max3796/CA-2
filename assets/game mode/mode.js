
let easy = document.getElementById("easy")
easy.addEventListener("click",()=>{
    window.location.href = "../easy/easy.html"
})

let inter = document.getElementById("intermediate")
inter.addEventListener("click",()=>{
    window.location.href = "../intermediate/inter.html"
})

let pro = document.getElementById("pro")
pro.addEventListener("click",()=>{
    window.location.href = "../pro/pro.html"
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
