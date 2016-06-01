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
  coinImage.src = 'img/coin-sprite-animation.png';

  var lapin = new Image();
  lapin.src = 'img/runningTim.png'

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

  var animatedSprite = function(options) {

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
      this.width = options.width;
      this.height = options.height;
      this.image = options.image;
      this.loop = options.loop;
      this.startingPosX = options.x;
      this.startingPosY = options.y;
      this.ratio = options.ratio;

    this.render = function(){
        this.context.drawImage(
          this.image, //insert l'image
          this.frameIndex * this.width, // slice l'image en X
          0,
          this.width,
          this.height,
          this.startingPosX,
          this.startingPosY,
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

    this.move = function(){
      if(this.startingPosX > 600){
        this.dir = 1;
      }
      if(this.startingPosX < 100){
        this.dir = 0;
      }
      this.startingPosX = (this.dir) ? (this.startingPosX - 1) : (this.startingPosX + 1);
    };

    return this;
  }

  // Fonction usine à sprite
  var animatedSpriteFactory = function(){
    return new movingSprite({
      context: canvas.getContext('2d'),
      width: 100,
      height: 100,
      image: coinImage,
      loop: 10,
      numberOfFrames : 9,
      ticksPerFrame : 2,
      x : 350,
      y : 250,
      ratio : -1
    });
  };


var lapin = new movingSprite({
  context: canvas.getContext('2d'),
  width: 135,
  height: 140,
  image: lapin,
  loop: 9,
  numberOfFrames : 9,
  ticksPerFrame : 10,
  x : 200,
  y : 390,
  ratio : 0.5
});

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
      coins[0].update();
      coins[0].render();

      lapin.render();
      lapin.update();
      lapin.move();

    window.requestAnimationFrame(gameLoop);
  };

  //
  coinImage.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/

  //Instanciation d'une pièce


    coins[0] = animatedSpriteFactory()

});
