window.document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM chargé');

  //Défini le canvas
  var canvas = document.getElementById('coinAnimation');
  canvas.height = 600;
  canvas.width = 800;

  var coins = [];

/*****************************************************************************
            Définition des images utilisées
******************************************************************************/
  var coinImage = new Image();
  coinImage.src = 'img/mySpriteSheet.png';

  var lapin = new Image();
  lapin.src = 'img/mySpriteSheet.png'

/******************************************************************************/

//Fonctions constructeur de sprite

//Fonction constructeur qui affiche un sprite
  var Sprite = function(options) {
      //propriétés liées à l'animation
      this.frameIndex = 0,
      this.tickCount = 0,
      this.ticksPerFrame = options.ticksPerFrame || 0
      this.numberOfFrames = options.numberOfFrames || 1;

      //propriétés liées au rendu de l'image
      this.context = options.context;
      this.scale = options.scale;
      this.image = options.image;
      this.sx = options.sx
      this.sy = options.sy;
      this.sw = options.sw;
      this.sh = options.sh;
      this.dx = options.dx;
      this.dy = options.dy;
      this.dw = options.dw;
      this.dh = options.dh;
      this.ratio = options.ratio;
      this.goRight = options.goRight;

    this.render = function(){ //affiche l'image dans le canvas
        this.context.drawImage(
          this.image, //insert l'image
          this.sx + this.sw * this.frameIndex,
          this.sy,
          this.sw, // slice l'image en X
          this.sh,
          this.dx,
          this.dy,
          this.dw * this.ratio,
          this.dh * this.ratio);
    };
  };


//Fonction constructeur qui anime le sprite
  var AnimatedSprite = function(options){
    this.update = function(){ // anime l'image
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame){
      this.tickCount = 0;
      if(this.frameIndex < this.numberOfFrames-1){
        this.frameIndex +=1;
      }else{
        this.frameIndex = 0;
      };
    };
  };
};


//Fonction constructeur qui déplace le sprite sur le canvas
  var MovingSprite = function(options){
    this.moveTo = options.moveTo;
    this.moveFrom = options.moveFrom;
    this.move = function(){ //Effectue une translation de l'image
    if(this.dx > this.moveTo){
      this.dir = 1;
    }
    if(this.dx < this.moveFrom){
      this.dir = 0;
    }
    this.dx = (this.dir) ? (this.dx - 5) : (this.dx + 5);
  };
  }



/*****************************************************************************
        CHAINE DE PROTOTYPAGE
*****************************************************************************/
  var getSprite = function(options){
    return new Sprite(options);
  };

  var getAnimatedSprite = function(options){
    AnimatedSprite.prototype = getSprite(options);
    return new AnimatedSprite(options);
  };

  var getMovingSprite = function(options){
    MovingSprite.prototype = getAnimatedSprite(options);
    return new MovingSprite(options);
  };

/******************************************************************************/



  //charge le background
  function background(){
    var fondImage = new Image();
    fondImage.src = "img/titlescreen-panorama01.jpg"
    var ctx = canvas.getContext('2d');
      ctx.drawImage(fondImage,0,0);
  };

  //Animation des sprites
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
    background();
      // coin.update();
      coin.render();
      // coin.move();


      tim.update();
      tim.render();
      tim.move();

    window.requestAnimationFrame(gameLoop);
  };

  //
  coinImage.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/

  //Instanciation d'une pièce
  var coin = getMovingSprite({
    context: canvas.getContext('2d'),
    image: coinImage,
    sx : 0,
    sy : 0,
    sw: 100,
    sh: 100,
    dx : 500,
    dy : 100,
    dw : 100,
    dh : 100,
    ratio : 1,
    numberOfFrames : 9,
    ticksPerFrame : 2,
  });

  var tim = getMovingSprite({
    context: canvas.getContext('2d'),
    image: lapin,
    sx : 0,
    sy : 100,
    sw : 100,
    sh : 100,
    dx : 10,
    dy : 390,
    dw : 100,
    dh : 100,
    ratio : 1,
    numberOfFrames : 27,
    ticksPerFrame : 4,
    moveFrom: 10,
    moveTo: 500
  });


});
