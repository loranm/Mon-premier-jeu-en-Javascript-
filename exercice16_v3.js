'use strict';

//refaire en faisant changer la taille de la div
/* refaire en faisant un settimeout qui va déplacer le personnage seul
il faut décoreller le mouvement du l'appui sur une touche.
C'est une seule touche qui déclenche l'Animation
Ajouter un booleén pour vérifier que l'animation n'est pas déjà en cours
le masque doit contenu dans un div (en margin auto pour centrer le masque dans la div)*/



/******************************************
Génère le tableau de sprite avec les
arguments spritePerRow et rows
******************************************/

var AnimatedSpriteConstructor = function(spriteSheetId, imageWidth, spriteWidth, spriteHeight, col, rows, missingCols){
  this.imageWidth = imageWidth;
  this.width = spriteWidth;
  this.height = spriteHeight;
  this.SpriteSheet = document.getElementById(spriteSheetId);
  this.col = col;
  this.rows = rows;
  this.missingCols = missingCols;
  this.nbFrames = (col * rows) - missingCols;
  this.framesPositions = [];
  this.framesPositionsLeft = [];
  this.createFramesPositionsRight = function(){
    while (this.framesPositions.length <= this.nbFrames){
      for (var i = 1; i < this.nbFrames; i++){
        var positionLeft = this.width * (i % this.col);
        var positionTop = this.height * Math.floor(i/this.col);
        this.framesPositions.push([positionLeft,positionTop]);
      };
    };
  };
this.counter = 0;
};



/*******************************************************
//créer un objet avec ces paramètres dans l'ordre suivant
  spriteSheetId,imageWidth, spriteWidth, spriteHeight, col,rows,missingCols
  *****************************************************/
var lapin = new AnimatedSpriteConstructor('contenu',1024,130, 152, 7,4,1);
console.log(lapin);
lapin.createFramesPositionsRight();



/****************************************************
Animation du sprite
****************************************************/
function animateSpriteRight(sprite){
  sprite.SpriteSheet.style.transform = 'scaleX(1)';
  // sprite.SpriteSheet.style.left = '0px';
  sprite.SpriteSheet.style.left = '-' + sprite.framesPositions[sprite.counter][0] + 'px';
  sprite.SpriteSheet.style.top = '-' + sprite.framesPositions[sprite.counter][1] + 'px';
  sprite.counter++;
  if (sprite.counter >= sprite.nbFrames){
    sprite.counter = 0
  };
};

function animateSpriteLeft(sprite){
  sprite.SpriteSheet.style.transform ='scaleX(-1)';
  // sprite.SpriteSheet.style.left = sprite.imageWidth + 'px';
  sprite.SpriteSheet.style.left = '-' + (sprite.imageWidth - sprite.framesPositions[sprite.counter][0] - sprite.width) + 'px';
  sprite.SpriteSheet.style.top = '-' + sprite.framesPositions[sprite.counter][1] + 'px';
  sprite.counter++
  if (sprite.counter >= sprite.nbFrames){
    sprite.counter = 0
  };
};

function spriteWait(sprite){
  sprite.SpriteSheet.style.left = '-' + sprite.framesPositions[0][0] + 'px';
  sprite.SpriteSheet.style.top = '-' + sprite.framesPositions[0][1] + 'px';

};
function spriteWaitLeft(sprite){
  sprite.SpriteSheet.style.left = '-' + sprite.framesPositions[27][0] + 'px';
  console.log(sprite.SpriteSheet.style.left);
  sprite.SpriteSheet.style.top = '-' + sprite.framesPositions[0][1] + 'px';

};

function special(sprite){
  alert('Yeah I\'m good');
}
/******************************************************
Deplacement de la div
*******************************************************/
var moveDiv = function(pas){
  var maDiv = document.getElementById('container');
  var startingPosition = parseInt(getComputedStyle(maDiv).left);
  console.log(startingPosition);
  var newPosition = startingPosition + pas;
  maDiv.style.left =  newPosition + 'px'
};
