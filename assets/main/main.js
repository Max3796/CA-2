//to navigate to next page
let playNow = document.getElementById("play-now")
console.log("playNow: ", playNow);


playNow.addEventListener("click" , nickName )
function nickName(){
    window.location.href="./assets/nickNamePage/name.html"
}
// background-music
let musicButton = document.getElementById("musicBtn");
let backgroundMusic = document.getElementById("backgroundMusic");

// Play the background music when the window loads
window.addEventListener("load", function() {
    backgroundMusic.play();
})
