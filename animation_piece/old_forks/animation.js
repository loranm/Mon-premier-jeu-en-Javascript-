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

//objet sprite
  function sprite (options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0
        numberOfFrames = options.numberOfFrames || 1;

      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      that.loop = options.loop;
      that.x = options.x;
      that.y = options.y;
      that.ratio = options.ratio;

    that.render = function(){
        that.context.drawImage(
          that.image, //insert l'image
          frameIndex * that.width, // slice l'image en X
          0,
          that.width,
          that.height,
          that.x,
          that.y,
          that.width * that.ratio,
          that.height * that.ratio)
    };

    that.update = function(){

      tickCount += 1;

      if (tickCount > ticksPerFrame){
        tickCount = 0;
        if(frameIndex < numberOfFrames-1){
          frameIndex +=1;
        }else{
          frameIndex = 0;
        }
      }
    };

    return that;
  }

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
    for (var i = 0; i < coins.length;i++){
      coins[i].update();
      coins[i].render();
    };
    window.requestAnimationFrame(gameLoop);
  };

  //
  coinImage.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/

  //Instanciation d'une pièce

  coins[0] = sprite({
    context: canvas.getContext('2d'),
    width: 100,
    height: 100,
    image: coinImage,
    loop: 10,
    numberOfFrames : 10,
    ticksPerFrame : 2,
    x : 100,
    y : 100,
    ratio : 0.5
  });

  coins[1] = sprite({
    context: canvas.getContext('2d'),
    width: 100,
    height: 100,
    image: coinImage,
    loop: 10,
    numberOfFrames : 10,
    ticksPerFrame : 6,
    x : 50,
    y : 12,
    ratio : 1
  });

  coins[2] = sprite({
    context: canvas.getContext('2d'),
    width: 100,
    height: 100,
    image: coinImage,
    loop: 10,
    numberOfFrames : 10,
    ticksPerFrame : 8,
    x : 300,
    y : 50,
    ratio : 1.5
  });




});
