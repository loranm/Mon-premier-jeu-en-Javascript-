window.document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM chargé');

  /*****************************************************************************
  Définition du canvas
  *****************************************************************************/
  var canvas = document.getElementById('stage');
  canvas.height = 720;
  canvas.width = 1000;


/*****************************************************************************
            Définition des images utilisées
******************************************************************************/
  var mySpriteSheet= new Image();
  mySpriteSheet.src = 'img/mySpriteSheet.png';
  var myBG = new Image();
  myBG.src = 'img/bg_4_02.jpg';

/******************************************************************************/

/******************************************************************************
      Constitution du décor (scenery)
*******************************************************************************/
  var danger = [];
  var bonus = [];
  var scenery = [];
  var animated = [];
  var runners = []

  var createScenery = function(option){
      for (var i = 0; i < option.length; i ++){
        option[i].render();
      };
    };

  var createAnimation = function(option){
      for (var i = 0; i < option.length; i ++){
        option[i].render();
        option[i].update();
      };
    };

  var createRunners = function(option){
      for (var i = 0; i < option.length; i ++){
        option[i].render();
        option[i].update();
        option[i].move();
      };
    };

/******************************************************************************
              Fonctions Constructeurs
******************************************************************************/

//Fonction constructeur qui affiche un sprite
  var Sprite = function(options) {

      //propriétés liées au rendu de l'image
      this.context = options.context;
      this.image = options.img || mySpriteSheet;
      this.sx = options.sx;
      this.sy = options.sy;
      this.sw = options.sw || 100;
      this.sh = options.sh || 100;
      this.dx = options.dx;
      this.dy = options.dy;
      this.dw = options.dw;
      this.dh = options.dh;
      this.ratio = options.ratio || 1;
      this.frameIndex = 0;
      this.danger = options.danger || false;


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
        danger.push(this);
      }
      if(this.bonus){
        bonus.push(this);
      }
      scenery.push(this);
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
    scenery.pop()
    animated.push(this);
  };


//Fonction constructeur qui déplace le sprite sur le canvas
  var MovingSprite = function(options){

    this.moveTo = options.moveTo;
    this.moveFrom = options.moveFrom;
    this.startingSY = this.sy;
    this.move = function(){ //Effectue une translation de l'image
    if(this.dx > this.moveTo){
      this.dir = 1;
      this.sy = this.startingSY-100;
    }
    if(this.dx < this.moveFrom){
      this.dir = 0;
      this.sy = this.startingSY;
    }

    if (this.dir){
      this.dx -=1;
    }else{
      this.dx +=1;
    }

  };
  animated.pop();
  runners.push(this);
  }

/******************************************************************************
    FONCTION CONSTRUCTEUR DU Heros
******************************************************************************/
  var Heros = function(options){

    this.vx = 5;
    this.vy = 1;
    this.canRun = options.canRun;

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

    // this.jump = function(){
    //
    // };
    //
    //
    // this.fall = function(){
    //   if (this.dy < 570){
    //     this.vy +=0.25;
    //     this.vy *=0.99;
    //     this.dy += this.vy;
    //     this.dx += this.vx;
    //     this.fall()
    //   }
    // }
    //
    // this.jump = function(){
    //   if (this.dy > 570){
    //     this.vy -=0.25;
    //     this.vy *=0.99;
    //     this.dy += this.vy;
    //     this.dx += this.vx;
    //   }
    // }

    this.run = function(direction, animation){
      if(direction == 'right'){
        this.sy = animation;
        console.log(this.dx)
        this.numberOfFrames = 27
        this.dx += 5;
        this.testCollision();
      };

      if(direction == 'left'){
        this.sy = animation;
        this.dx -= 5;
        this.testCollision();
      };
    };
    animated.pop()
  };

  (function(){
    window.document.addEventListener('keydown', function(e){
       var event = e.keyCode;
       if(e.keyCode == 38 && e.keyCode == 39){
         alert('Deux touches')
       }

        switch(event){
          case 39:
          if(tim.canRun){
            tim.canRun = false;
            tim.run('right', 100);
            window.setTimeout(function(){
              tim.canRun = true;
            },1000)
          }
          break;

          case 37:
          if(tim.canRun){
            tim.canRun = false;
            tim.run('left',200);
            window.setTimeout(function(){
              tim.canRun = true;
            },25)
          }
          break;

          case 38:
          if(tim.canRun){
            tim.canRun = false;
            tim.jump();
            window.setTimeout(function(){
              tim.canRun = true;
            },25)
          }
          break;

          case 40:
          if(tim.canRun){
            tim.canRun = false;
            tim.fall();
            window.setTimeout(function(){
              tim.canRun = true;
            },25)
          }

        };


        window.document.addEventListener('keyup',function(e){
          tim.canRun = true;
          tim.numberOfFrames = 22;
          tim.sy = 400;
        });
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

/******************************************************************************
        GAME LOOP
*******************************************************************************/


  //Animation des sprites
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
      createScenery(scenery);
      createAnimation(animated);
      createRunners(runners);

      tim.render();
      tim.update();

    window.requestAnimationFrame(gameLoop);
  };

  mySpriteSheet.addEventListener('load', gameLoop);

/*******************************************************************************
                              Définition des sprites
*******************************************************************************/


  //instanciation des sprites fixes

  var bg = getSprite({
    context: canvas.getContext('2d'),
    img: myBG,
    sx : 0,
    sy : 0,
    sw : 1000,
    sh: 720,
    dx : 0,
    dy : 0,
    dw : 1000,
    dh : 720,
    danger: false
  });

  var claw = getSprite({
    context: canvas.getContext('2d'),
    sx : 1100,
    sy : 0,
    dx : 800,
    dy : 610,
    dw : 100,
    dh : 100,
    ratio : 0.7,
    danger: true
  });

  var door = getSprite({
    context: canvas.getContext('2d'),
    sx : 1500,
    sy : 0,
    dx : 620,
    dy : 575,
    dw : 100,
    dh : 100,
  });


  //Instanciation d'une pièce
  var coin = getAnimatedSprite({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 0,
    dx : 500,
    dy : 100,
    dw : 100,
    dh : 100,
    numberOfFrames : 9,
    ticksPerFrame : 2,
  });

  var coin = getAnimatedSprite({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 0,
    dx : 500,
    dy : 300,
    dw : 100,
    dh : 100,
    ratio : 0.5,
    numberOfFrames : 9,
    ticksPerFrame : 2,
  });

  var coin = getAnimatedSprite({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 0,
    dx : 100,
    dy : 200,
    dw : 100,
    dh : 100,
    ratio : 0.6,
    numberOfFrames : 9,
    ticksPerFrame : 4,
  });


  //Instanciation d'un lapin
  var lapin = getMovingSprite({
    context: canvas.getContext('2d'),
    sx : 0,
    sh: 100,
    dx : 300,
    dy : 600,
    dw : 100,
    dh : 100,
    moveFrom : 100,
    moveTo: 600,
    numberOfFrames : 7,
    ticksPerFrame : 5,
  });

  var lapin = getMovingSprite({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 800,
    dx : 300,
    dy : 600,
    dw : 100,
    dh : 100,
    moveFrom : 0,
    moveTo: 200,
    numberOfFrames : 7,
    ticksPerFrame : 5,
  });


  //instanciation de Tim le héros
  var tim = getHeros({
    context: canvas.getContext('2d'),
    sx : 0,
    sy : 400,
    dx : 100,
    dy : 570,
    dw : 100,
    dh : 100,
    numberOfFrames : 22,
    ticksPerFrame : 2,
    canRun: true,
  });

});
