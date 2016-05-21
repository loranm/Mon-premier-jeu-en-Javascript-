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

//Fonction constructeur de sprite
  var sprite = function(options) {

      this.context = options.context;
      this.width = options.width;
      this.height = options.height;
      this.image = options.image;
      // this.loop = options.loop;
      this.x = options.x;
      this.y = options.y;
      this.ratio = options.ratio;

    this.render = function(){
        this.context.drawImage(
          this.image, //insert l'image
          0, // slice l'image en X
          0,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width * this.ratio,
          this.height * this.ratio)
    };

    return this;
  }

  var animatedSprite = function(options) {//fonction constructeur en majuscule

      this.frameIndex = 0,
      this.tickCount = 0,
      this.ticksPerFrame = options.ticksPerFrame || 0
      this.numberOfFrames = options.numberOfFrames || 1;

      this.context = options.context;
      this.width = options.width;
      this.height = options.height;
      this.image = options.image;
      this.loop = options.loop;
      this.x = options.x;
      this.y = options.y;
      this.ratio = options.ratio;

    this.render = function(){
        this.context.drawImage(
          this.image, //insert l'image
          this.frameIndex * this.width, // slice l'image en X
          0,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width * this.ratio,
          this.height * this.ratio)
    };

    this.update = function(){

      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame){
        this.tickCount = 0;
        if(this.frameIndex < this.numberOfFrames-1){
          this.frameIndex +=1;
        }else{
          this.frameIndex = 0;
        }
      }
    };

    return this;
  }

  var movingSprite = function(options) {
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

    this.render = function(){
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

    this.update = function(){

      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame){
        this.tickCount = 0;
        if(this.frameIndex < this.numberOfFrames-1){
          this.frameIndex +=1;
        }else{
          this.frameIndex = 0;
        }
      }
    };

    this.move = function(){
      if(this.dx > 600){
        this.dir = 1;
      }
      if(this.dx < 100){
        this.dir = 0;
      }
      this.dx = (this.dir) ? (this.dx - 1) : (this.dx + 1);
    };

    return this;
  }

  // Fonction usine à sprite
  var animatedSpriteFactory = function(){
    return new movingSprite({
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
      ratio : 0.5,


      numberOfFrames : 9,
      ticksPerFrame : 2
    });
  };




var tim = new movingSprite({
  context: canvas.getContext('2d'),
  image: lapin,
  sx : 0,
  sy : 200,
  sw : 100,
  sh : 100,
  dx : 10,
  dy : 390,
  dw : 100,
  dh : 100,
  ratio : 1,
  numberOfFrames : 22,
  ticksPerFrame : 2,
});

var timRunning = new movingSprite({
  context: canvas.getContext('2d'),
  image: lapin,
  sx : 0,
  sy : 100,
  sw : 100,
  sh : 100,
  dx : 100,
  dy : 390,
  dw : 100,
  dh : 100,
  ratio : 1,
  numberOfFrames : 27,
  ticksPerFrame : 2,
});




  //charge le background
  function background(){
    var fondImage = new Image();
    fondImage.src = "img/titlescreen-panorama01.jpg"
    var ctx = canvas.getContext('2d');
      ctx.drawImage(fondImage,0,0);
      ctx.scale(1,1);
      ctx.save();
      ctx.scale(1,1);
  };

  //Animation des sprites
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
    background();
      coins[0].update();
      coins[0].render();


      tim.update();
      tim.render();
      timRunning.update();
      timRunning.render();
      timRunning.move();

    window.requestAnimationFrame(gameLoop);
  };

  //
  // gameLoop();
  coinImage.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/

  //Instanciation d'une pièce


    coins[0] = animatedSpriteFactory();
    coins[1] = animatedSpriteFactory();


});
