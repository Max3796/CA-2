let playName = document.getElementById("play")
let name1 = document.getElementById("nickname")
playName.addEventListener("click",press)
function press(){
   
      localStorage.setItem("name",JSON.stringify(name1.value))
      window.location.href="../instructions/ins.html"
   
}
name1.addEventListener("keypress",()=>{
   if(event.key=="Enter"|| event.KeyCode ==13){
       press()
      }
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