window.document.addEventListener('DOMContentLoaded', function(){
  /*****************************************************************************
  Définition des images utilisées
  *****************************************************************************/
  var mySpriteSheet= new Image();
  mySpriteSheet.src = 'img/mySpriteSheet200.png';
  var myBG = new Image();
  myBG.src = 'img/bg_4_02.jpg';

  /*****************************************************************************
  Définition du canvas
  *****************************************************************************/
  var canvas = document.getElementById('stage');
  canvas.height = 720;
  canvas.width = 1000;


  /*****************************************************************************
  Définition des sprites
  *****************************************************************************/
  var ground = [{
    nom: 'ground0',
    x1: 0,
    x2: 500,
    y1: 200,
    y2: 200
  }
  ]



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
    { nom: 'door',
      sx : 1900,
      sy : 500,
      dx : 800,
      dy : 571,
      dw : 100,
      dh : 100,
      ratio : 1,
      scenery : true

    },
    { nom: 'door',
      sx : 1900,
      sy : 500,
      dx : 100,
      dy : 200,
      dw : 100,
      dh : 100,
      ratio : 1,
      scenery : true

    },
    // {
    //   nom: 'flora',
    //   sx : 1800,
    //   sy : 500,
    //   dx : 620,
    //   dy : 575,
    //   dw : 100,
    //   dh : 100,
    //   scenery : true
    // },
    // {
    //   nom: 'flora2',
    //   sx : 1600,
    //   sy : 500,
    //   dx : 420,
    //   dy : 575,
    //   dw : 100,
    //   dh : 100,
    //   scenery : true,
    //   danger : true
    // },
    // {
    //   nom : 'coin1',
    //   sx : 0,
    //   sy : 1600,
    //   dx : 500,
    //   dy : 100,
    //   dw : 100,
    //   dh : 100,
    //   animation: true,
    //   numberOfFrames : 9,
    //   ticksPerFrame : 2
    // },
    // {
    //   nom: 'monster',
    //   sx : 0,
    //   sy : 800,
    //   dx : 0,
    //   dy : 610,
    //   dw : 100,
    //   dh : 100,
    //   moving : true,
    //   moveFrom : 1,
    //   moveTo: 500,
    //   numberOfFrames : 7,
    //   ticksPerFrame : 5
    // },
    // {
    //   nom: 'lapin',
    //   sx : 0,
    //   sy : 1400,
    //   dx : 0,
    //   dy : 610,
    //   dw : 100,
    //   dh : 100,
    //   moving : true,
    //   moveFrom : 500,
    //   moveTo: 900,
    //   numberOfFrames : 7,
    //   ticksPerFrame : 5
    // }
  ];

/******************************************************************************
    Propriétés particulières
*******************************************************************************/

  var danger = [];
  var ennemy = []
  var bonus = [];

/******************************************************************************
              Fonctions Constructeurs
******************************************************************************/
var Sprite = function(options) {
  this.nom = options.nom || 'item',
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
  this.index;
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
    this.index = danger.length;
    danger[this.index] = this;
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
    this.vx = 5
    this.startingSY = this.sy;
    this.feetOnGround = true;


    this.move = function(start, end, sy){ //Effectue une translation de l'image
      if (start != end){
        if(this.feetOnGround){

          if(this.dx > end){
            this.dir = 1;
            this.sy = sy+100;
          }
          if(this.dx < 10){
            this.dir = 0;
            this.sy = this.startingSY;
          }

          if (this.dir){
            this.dx -= this.vx;
          }else{
            this.dx += this.vx;
          };
        };
      };
    };
  };



/******************************************************************************/
  var Heros = function(options){
    this.heros = options.heros;
    this.jumping = false;
    this.justJump = false;
    this.gravity = 1;
    this.speed = 1;
    this.vy = 1;
    this.vx = 1;

    this.applyGravity = function(){

      if (this.jumping){
        this.jumping = false
        this.sy = 600;
        this.numberOfFrames = 6;
            this.dy -= 5;
            // this.vy *= 0.8;
            this.vy += 0.01;
            if (this.vy > 10){
              this.vy = 10;
            }

            console.log('Tim VY = ' + this.vy)
        };

      if (!this.jumping && this.justJump && this.vy > 1){
          // this.vy = 1.1;
          // this.gravity *= this.vy;
          this.vy -= 0.01;
          this.dy += 5;
        }

        this.gravity *= this.vy
        // this.dy *= this.gravity;

      // }else{ //je ne suis plus sur le sol
      //   this.vy = 1.1;
      //   this.gravity *= this.vy;
      //   this.dy *= this.gravity
      // }


      // console.log('Gravité =  ' + this.gravity + ' Position tim = ' + this.dy)
    };


    this.goRight = function(){
      this.vx += 0.1;
      this.sy = 0;
      this.numberOfFrames = 27;
      this.dx += 10;
    };

    this.stopRight = function(){
      console.log(this.vx)
      if (this.vx > 0){
        if (this.vx > 10){
          this.vx = 10;
        };
      }this.dx += 1;
    };

    this.goLeft = function(){

      this.sy = 100;
      this.numberOfFrames = 27;
      this.dx -= 10;
    }

    this.jump = function(){
      this.jumping = true;
    };
  };

/*******************************************************************************
    GESTION DU CLAVIER
*******************************************************************************/

  (function(){
    window.document.addEventListener('keydown', function(e){
       var event = e.keyCode;

        switch(event){
          case 39:
          tim.goRight();
          break;

          case 37:
          tim.goLeft();
          break;

          case 38:
          tim.jumping = true;
          tim.justJump = false;
          break;
        };
      });


        window.document.addEventListener('keyup',function(e){
          var event = e.keyCode
          switch (event) {
            case 38:
            tim.jumping = false;
            tim.justJump = true;
              break;

            case 39:
            tim.stopRight();

          }

          tim.numberOfFrames = 22;
          tim.sy = 200;
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
        options[i].move(options[i].moveFrom,options[i].moveTo,options[i].sy);
      };
    };
  };

  var tim = getHeros({
    sx : 0,
    sy : 200,
    dx : 100,
    dy : 200,
    dw : 100,
    dh : 100,
    numberOfFrames : 22,
    ticksPerFrame : 5,
  })


/******************************************************************************
        GAME LOOP
*******************************************************************************/
  function gameLoop() {
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

      displayStage(stage);
      tim.render();
      tim.update();
      tim.applyGravity();

    window.requestAnimationFrame(gameLoop);
  };

  mySpriteSheet.addEventListener('load', gameLoop);


});
