window.document.addEventListener('DOMContentLoaded', function(){
  /*****************************************************************************
  Définition des images utilisées
  *****************************************************************************/
  var mySpriteSheet= new Image();
  mySpriteSheet.src = 'img/mySpriteSheet.png';
  var myBG = new Image();
  myBG.src = 'img/bg_4_02.jpg';

  /*****************************************************************************
  Définition du canvas
  *****************************************************************************/
  var canvas = document.getElementById('coinAnimation');
  canvas.height = 720;
  canvas.width = 1000;


  /*****************************************************************************
  Définition des sprites
  *****************************************************************************/
  var ground = [{
    x1: 0,
    x2: 450,
    y1: 500,
    y2: 500
  }]

  var elements = [
    {img: myBG,
      sx : 0,
      sy : 0,
      sw : 1000,
      sh: 720,
      dx : 0,
      dy : 0,
      dw : 1000,
      dh : 720,
      scenery : true,
    },
    { sx : 1100,
      sy : 0,
      dx : 800,
      dy : 610,
      dw : 100,
      dh : 100,
      ratio : 0.7,
      danger: true,
      scenery : true

    },
    {
      sx : 1500,
      sy : 0,
      dx : 620,
      dy : 575,
      dw : 100,
      dh : 100,
      scenery : true
    },
    {
      sx : 0,
      sy : 0,
      dx : 500,
      dy : 100,
      dw : 100,
      dh : 100,
      animation: true,
      numberOfFrames : 9,
      ticksPerFrame : 2
    },
    {
      sx : 0,
      sy : 800,
      dx : 300,
      dy : 600,
      dw : 100,
      dh : 100,
      moveFrom : 1,
      moveTo: 200,
      moving : true,
      numberOfFrames : 7,
      ticksPerFrame : 5
    },
    {
      sx : 0,
      sy : 800,
      dx : 100,
      dy : 650,
      dw : 100,
      dh : 100,
      ratio: 0.5,
      moveFrom : 10,
      moveTo: 200,
      moving : true,
      numberOfFrames : 7,
      ticksPerFrame : 5
    },
    {
      sx : 0,
      sy : 800,
      dx : 300,
      dy : 640,
      dw : 100,
      dh : 100,
      ratio: 0.5,
      moveFrom : 1,
      moveTo: 1000,
      moving : true,
      numberOfFrames : 7,
      ticksPerFrame : 5
    },
    {
      context: canvas.getContext('2d'),
      sx : 0,
      sy : 400,
      dx : 100,
      dy : 570,
      dw : 100,
      dh : 100,
      heros : true,
      canRun: true,
      numberOfFrames : 22,
      ticksPerFrame : 2,
    }
  ];

/******************************************************************************
    Propriétés particulières
*******************************************************************************/

  var danger = [];
  var bonus = [];

/******************************************************************************
              Fonctions Constructeurs
******************************************************************************/
  var Sprite = function(options) {
      this.context = options.context || canvas.getContext('2d');
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
      this.scenery = options.scenery;
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
  };


//Fonction constructeur qui anime le sprite
  var AnimatedSprite = function(options){
    //propriétés liées à l'animation
    this.tickCount = 0,
    this.ticksPerFrame = options.ticksPerFrame || 0
    this.numberOfFrames = options.numberOfFrames || 1;
    this.animation = options.animation;


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
    this.moving = options.moving;
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
  }

/******************************************************************************
    FONCTION CONSTRUCTEUR DU Heros
******************************************************************************/
  var Heros = function(options){

    this.heros = options.heros;
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
      };
    };

    this.hasContact = function(){
      return true;
    };

    /* ajouter une méthode 'hasContact' qui renvoie true si le dy+dh du sprite est égal au y de ground ou de plaform*/
    this.fall = function(){
      if (!this.hasContact()){
        this.vy +=0.25;
        this.vy *=0.99;
        this.dy += this.vy;
        this.dx += this.vx;
        this.fall();
      }
    }
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
            },25)
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
  Constitution du décor (scenery)
*******************************************************************************/
  var stage = [];

  (function createStage(){
    for (var i = 0; i < elements.length; i++){
      if (elements[i].scenery){
        stage[i] = getSprite(elements[i]);
      };
      if (elements[i].animation){
        stage[i] = getAnimatedSprite(elements[i]);
      };
      if (elements[i].moving){
        stage[i] = getMovingSprite(elements[i]);
      };
      if (elements[i].heros){
        stage[i] = getHeros(elements[i]);
      };
    }
  })();


  var displayStage = function(options){
    for (var i = 0; i < options.length; i++){
      if (options[i].scenery){
        options[i].render();
      };
      if (options[i].animation){
        options[i].render();
        options[i].update();
      };
      if (options[i].moving){
        options[i].render();
        options[i].update();
        options[i].move();
      };
      if (options[i].heros){
        options[i].render();
        options[i].update();
        // console.log(options[i].fall());
      };
    };
  };

/******************************************************************************
        GAME LOOP
*******************************************************************************/
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

      displayStage(stage);

    window.requestAnimationFrame(gameLoop);
  };

  mySpriteSheet.addEventListener('load', gameLoop);

});





// this.jump = function(){
//
// };
//
//
//
// this.jump = function(){
//   if (this.dy > 570){
//     this.vy -=0.25;
//     this.vy *=0.99;
//     this.dy += this.vy;
//     this.dx += this.vx;
//   }
// }
