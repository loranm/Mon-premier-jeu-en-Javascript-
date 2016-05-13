window.document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM chargé');

  //Défini le canvas
  var canvas = document.getElementById('coinAnimation');
  canvas.height = 720;
  canvas.width = 1000;


/*****************************************************************************
            Définition des images utilisées
******************************************************************************/
  var mySpriteSheet= new Image();
  mySpriteSheet.src = 'img/mySpriteSheet.png';
  //charge le background
  function background(){
    var fondImage = new Image();
    fondImage.src = "img/bg_4_02.jpg"
    var ctx = canvas.getContext('2d');
    ctx.drawImage(fondImage,0,0);
  };
/******************************************************************************/

/******************************************************************************
      Ce tableau stocke tout ce qui peut blesser le héros
*******************************************************************************/
  var danger = [];
  var bonus = [];



/******************************************************************************
              Fonctions Constructeurs
******************************************************************************/

//Fonction constructeur qui affiche un sprite
  var Sprite = function(options) {

      //propriétés liées au rendu de l'image
      this.context = options.context;
      this.image = mySpriteSheet;
      this.sx = options.sx
      this.sy = options.sy;
      this.sw = options.sw;
      this.sh = options.sh;
      this.dx = options.dx;
      this.dy = options.dy;
      this.dw = options.dw;
      this.dh = options.dh;
      this.ratio = options.ratio;
      this.frameIndex = 0;
      this.danger = options.danger;


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

      if(this.danger){
        danger.push(this)
      }
  };


//Fonction constructeur qui anime le sprite
  var AnimatedSprite = function(options){
    //propriétés liées à l'animation
    this.tickCount = 0,
    this.ticksPerFrame = options.ticksPerFrame || 0
    this.numberOfFrames = options.numberOfFrames || 1;

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
    this.dx = (this.dir) ? (this.dx - 4) : (this.dx + 4);
  };
  }


  var Heros = function(){

    this.vx = 5;
    this.vy = 1;
    this.jumping = false;

    this.testCollision = function(){
      for (var i = 0; i < danger.length; i++){
        if (this.dx < danger[i].dx + danger[i].dw &&
          this.dx + this.dw > danger[i].dx &&
          this.dy < danger[i].dy + danger[i].dh &&
          this.dh + this.dy > danger[i].dy){
              this.dx = 10;
          }
        }
      };
    this.jump = function(){};

    this.fall = function(){
      // this.sy = 300;
      // this.numberOfFrames = 6;
      this.vy +=0.25;
      this.vy *=0.99;
      this.dy += this.vy;
      this.dx += this.vx;
    }

    this.run = function(direction, animation){


      if(direction == 'right'){
        this.sy = animation;
        this.numberOfFrames = 27
        this.dx += 5;
        this.testCollision();
      };

      if(direction == 'left'){
        this.sy = animation;
        this.dx -= 5;
        this.testCollision();
      }



    }
  };


     (function(){

     window.document.addEventListener('keydown', function(e){
       e.preventDefault();
       console.log('touche' + e.which)
       var event = e.keyCode;
        switch(event){
          case 39:
          tim.run('right', 100);
          break;

          case 37:
          tim.run('left',200);
          break;

          case 38:
          tim.jump();
          break;
          }
        })

        window.document.addEventListener('keyup',function(e){
          console.log('touche non appuyée')
          tim.numberOfFrames = 22; 
          tim.sy = 400;
        });
      })();




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

  var getHeros = function(options){
    Heros.prototype = getAnimatedSprite(options);
    return new Heros(options);
  }

/******************************************************************************/




  //Animation des sprites
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
      background();
      coin.update();
      coin.render();

      // claw.render()
      // console.log(claw);


      tim.update();
      tim.render();

    window.requestAnimationFrame(gameLoop);
  };

  //
  mySpriteSheet.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/


  //instanciation d'un ennemi

  // var claw = getSprite({
  //   context: canvas.getContext('2d'),
  //   sx : 1100,
  //   sy : 0,
  //   sw: 100,
  //   sh: 100,
  //   dx : 400,
  //   dy : 570,
  //   dw : 100,
  //   dh : 100,
  //   ratio : 0.8,
  //   danger: true
  // });


  //Instanciation d'une pièce
  var coin = getAnimatedSprite({
    context: canvas.getContext('2d'),
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


  //instanciation de Tim qui court
  var tim = getHeros({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 400,
    sw : 100,
    sh : 100,
    dx : 10,
    dy : 570,
    dw : 100,
    dh : 100,

    ratio : 1,
    numberOfFrames : 22,
    ticksPerFrame : 4,
  });

});
