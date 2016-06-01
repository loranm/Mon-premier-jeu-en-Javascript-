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
  // lapin.src = 'img/tim.png'

/******************************************************************************/

//Fonction constructeur de sprite
  var sprite = function(options) {

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

  //Fonction usine à sprite
  var spriteFactory = function(){
    return new sprite({
      context: canvas.getContext('2d'),
      width: 100,
      height: 100,
      image: coinImage,
      loop: 10,
      numberOfFrames : 10,
      ticksPerFrame : 2,
      x : 350,
      y : 250,
      ratio : 0.5
    });
  };

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

      // coins[].update();
      coins[0].render();
      coins[0].update();

      // coins[1].render();
      // coins[2].render();


    window.requestAnimationFrame(gameLoop);
  };

  //
  coinImage.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/

  //Instanciation d'une pièce


    coins[0] = spriteFactory()
    console.log(coins[0])

});
