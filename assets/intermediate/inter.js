//config of the tiles 
var config = {
  width:300,
  height:600,
  rows:6,
  cols:4,
  speed:5,
  interval:15
}
config.height = window.innerHeight;
var score = 0;//initial score = 0
var scoreElement;
var startGameElement,endGameElement;
var gameLoop;
var tileRows = [];//list to store tiles that are being generated through canvas
var gameCanvas;
var gameContext;
var isGameStarted = false;

// Load the high score from local storage
var highScoreElement = document.getElementById("high-score");
console.log("highScoreElement: ", highScoreElement);
var highScore1 = localStorage.getItem('highScr1') ;
if (highScore1 !== null) {
  highScore1 = JSON.parse(highScore1);
  highScoreElement.innerText = highScore1;
}
//background music
//  List of background music tracks
 const musicList = ["./Dramatic-Piano.mp3", "./lady-of-the-80.mp3", "./reverie.mp3","./Where-will-i-go.mp3"];

 // Function to play a random track
 function playRandomBackgroundMusic() {
     const randomIndex = Math.floor(Math.random() * musicList.length);
     const audioElement = document.getElementById("background-music");
     audioElement.src = musicList[randomIndex];
     audioElement.play();
 }

 // Event listener to play music when the window loads
 window.addEventListener("load", playRandomBackgroundMusic);
// Update and display the high score when a new high score is achieved
function updateHighScore() {
  if (score > highScore1) {
    highScore1 = score;
    highScoreElement.innerText = highScore1;
    localStorage.setItem('highScr1', JSON.stringify(highScore1));
  }
}
//user name
let username = document.getElementById("name-input")
let name1 = JSON.parse(localStorage.getItem("name"))
username.innerHTML= name1

document.addEventListener("DOMContentLoaded",()=>{
  gameCanvas=document.getElementById("gameCanvas");
  scoreElement = document.getElementById("score");
  startGameElement = document.getElementById("gameStart");
  endGameElement = document.getElementById("gameEnd");
  gameContext=gameCanvas.getContext("2d");
  gameCanvas.style.width=config.width+"px";
  gameCanvas.style.height=config.height+"px";
  gameCanvas.setAttribute("width",config.width);
  gameCanvas.setAttribute("height",config.height);
  gameContext.lineWidth = 0.5;
  initGame();
});
// adding rows in black tile will be at random
function addRow() {
  var black_index = Math.floor(Math.random()*config.cols);
  var tile_width = config.width/config.cols;
  var tile_height = config.height/config.rows;
  var y = config.height;
  if(tileRows.length>0){
    var lastRow = tileRows[tileRows.length-1];
    y = lastRow.y + lastRow.height;
  }
  // row info
  var row = {
    x:0,
    y:y,
    width:config.width,
    height:config.height/config.rows,
    tileWidth:tile_width,
    tileHeight:tile_height,
    color:"#FFFFFF",
    black:{
      index:black_index,
      color:"#000000"
    },
    //to moves the tiles from bottom to top
    increament:function(){
      if(this.y<=0){
        console.log(this.isValid);
        if(!this.isValid){
          console.log("Game Over");
          stopGameLoop();
          this.y-=config.speed;
          displayWrongTile(this,this.black.index);
          return;
        }
      }
      this.y = this.y - config.speed;

    },
    decreament:function(){
      this.y = this.y + config.speed;
    },
    isValid:false
  };
  tileRows.push(row);
}


function displayRow(row) {
  gameContext.fillStyle = row.color;
  gameContext.fillRect(0,row.y,row.width,row.height);
  for(var i=0;i<config.cols;i++){
    gameContext.strokeRect(i*row.tileWidth,
      row.y,
      row.tileWidth,
      row.tileHeight);

      if(row.black.index==i){
        gameContext.fillStyle = row.black.color;
        gameContext.fillRect(i*row.tileWidth,
          row.y,
          row.tileWidth,
          row.tileHeight);
        }
      }
      row.increament();
    }
    // game will loop untill any tile reached top or misclicked white tile
    function startGameLoop() {
      gameLoop = setInterval(function(){
        displayAllRow();
      },config.interval);
    }
    function displayAllRow() {
      gameContext.clearRect(0,0,config.width,config.height);
      for(var i=0;i<tileRows.length;i++){
        displayRow(tileRows[i]);
      }
    }
   // to stop the game 
    function stopGameLoop() {
      clearInterval(gameLoop);
      gameCanvas.removeEventListener("click",handleGameUserInput);
      endGameElement.style.display="block";
    }
    // function to check if any tile is misclicked or reached to the top
    function handleGameUserInput(e) {
      if(!isGameStarted){
        isGameStarted = true;
        startGameLoop();
      }
      updateHighScore();
      var tile_width = config.width/config.cols;
      var x = e.clientX - gameCanvas.offsetLeft;
      var y = e.clientY - gameCanvas.offsetTop;
      var clicked_col = Math.ceil(x/tile_width) - 1;
      for(var i=0;i<tileRows.length;i++){
        var row = tileRows[i];
        if (row.y<y && row.y+row.height>y) {
          if(clicked_col===row.black.index){
            if(!row.isValid){
              row.isValid = true;
              row.black.color="#AAAAAA";
              //score +1
              score++;
              //displaying score
              scoreElement.innerHTML = score;
              
              addRow();
            }
            else{
              stopGameLoop();
              displayWrongTile(row,clicked_col);
            }
          }else{
            stopGameLoop();
            displayWrongTile(row,clicked_col);
          }
          break;
        }
      }
    }
    // function to display wrong tile is clicked 
    function displayWrongTile(row,col_number) {
      gameContext.fillStyle = "#FF0000";
      row.decreament();
      gameContext.fillRect(col_number*row.tileWidth,row.y,row.tileWidth,row.tileHeight);
    }
    //setting game initials 
    function initGame(){
      gameContext.clearRect(0,0,config.width,config.height);
      for(var i=0;i<config.rows;i++){
        addRow();
      }
      for(var j=0;j<50;j++){
        for(var i=0;i<tileRows.length;i++){
          tileRows[i].increament();
        }
      }
      for(var i=0;i<tileRows.length;i++){
        displayRow(tileRows[i]);
      }
    }
    //start function
    function startGame() {
      endGameElement.style.display="none";
      startGameElement.style.display="none";
      gameCanvas.addEventListener("click",handleGameUserInput);
    }
    //restart game function
    function restartGame() {
      tileRows = [];
      score = 0;
      isGameStarted = false;
      scoreElement.innerHTML = score;
      endGameElement.style.display="none";
      initGame();
      startGame();
      updateHighScore();
    }