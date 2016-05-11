/*************************************************************
                      SYSTEM VARIABLES
*************************************************************/



var stage = document.getElementById('gameCanvas');
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext('2d');
ctx.fillStyle = 'black';
ctx.font = GAME_FONTS;


/*************************************************************
                      GAME LOOP
*************************************************************/

currX = IMAGE_START_X;
currY = IMAGE_START_Y;

function update(){
  counter++;

  //Clear canvas
  ctx.fillStyle = '#AAA'
  ctx.fillRect(0,0, stage.width, stage.height);

  //Draw Timer
  // ctx.fillStyle = 'white';
  // ctx.fillText('Time is ' + counter, COUNTER_X, COUNTER_Y);
  ctx.drawImage(charImage, currX,currY,CHAR_WIDTH,CHAR_HEIGHT,CHAR_START_X,CHAR_START_Y,CHAR_WIDTH,CHAR_HEIGHT);

  currX += CHAR_WIDTH;
  if(currX >=SPRITE_WIDTH){
    currX = 0; 
  }
}


var gameloop = setInterval(update, TIME_PER_FRAME);
var counter = 0;


/*************************************************************
                      PRELOADING IMAGE
*************************************************************/

var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

function setAssetReady(){
  this.ready = true;
}

ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = '#000';
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop, currX, currY;

function preloading(){
  if (charImage.ready){
    clearInterval(preloader);
    gameloop = setInterval(update, TIME_PER_FRAME)
  };
};
