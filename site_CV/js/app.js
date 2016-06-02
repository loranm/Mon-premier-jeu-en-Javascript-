"use strict";

window.document.addEventListener('DOMContentLoaded', function() {
  /*****************************************************************************
  Définition des images utilisées
  *****************************************************************************/
  var mySpriteSheet = new Image();
  mySpriteSheet.src = "img/mySpriteSheet.png";

  /***************************************************************************
  Définition du canvas
  ***************************************************************************/
  var canvas = document.getElementById('stage');
  canvas.height = 720;
  canvas.width = 1000;

  var requestId; //stocke l'id généré par requestAnimationFrame, on s'en sert pour gérer la pause.
  var maxTime = 7260; //temps maximum de jeu (2 minutes * 3600 ms)


  /***************************************************************************
  Définition du fond du jeu + compteur de temps
  ***************************************************************************/
  function background(maxTime) {
    var backgroundImage = new Image();
    backgroundImage.src = "img/bg.jpg";
    var ctx = canvas.getContext("2d");
    ctx.drawImage(backgroundImage, 0, 0);

    //Decompte du temps basé sur requestAnimationFrame
    ctx.font = 'bold 30px sans-serif';
    var displayCountDown = parseInt((maxTime - requestId)/60) + ' sec.  avant la fin du jeu';
    var countDownTextSize = ctx.measureText(displayCountDown);
    ctx.fillStyle = "white";
    ctx.fillText(displayCountDown, canvas.width/2-150, 60 );
    ctx.strokeText(displayCountDown, canvas.width/2-150, 60 );
  };




  /***************************************************************************
  Définition des interactions avec le jeu : demarrer, gameover et pause
  ***************************************************************************/

  //Gestion de la pause
  var gameStarted = false;
  var paused = false;
  //Détection des boutons sur la page html
  var start = document.getElementById('start');
  var pauseButton = document.getElementById('pausebutton');
  var resetButton = document.getElementById('resetbutton');
  var gameOver = false;
  var game = document.getElementsByClassName('toHide')


  start.addEventListener('click',function(){
    game[0].className = 'toShow';
    gameLoop();
  })
  pauseButton.addEventListener('click', function() {
    putOnPause();
  });

  resetButton.addEventListener('click',function(){
    stage = [];
    tim.dx = 500;
    this.dy = 400;
    tim.lifes = 3;
    tim.skills = 0;
    createStage();
    for (var i = 0; i < stage.length; i++){
      if(stage[i].bonus){
        var skill = stage[i].nom;
        var toReset = document.getElementById(skill);
        toReset.setAttribute('style', 'display:none');
      };
    }
    if (gameOver)(
      $(document).ready(function(){
        $('#message').fadeOut('fast');
      })
    )
    pauseButton.setAttribute('style', 'display: inline-block');
    maxTime = 7260+requestId;
    if (paused){putOnPause()};
  })

  //Met le jeu en pause
  var putOnPause = function() {
    if (paused) {
      paused = false;
      pauseButton.setAttribute('value', 'Pause');
      gameLoop();
    } else {
      paused = true;
      pauseButton.setAttribute('value', 'Reprendre');
    };

  };



  /***************************************************************************
  Définition des sprites
  ***************************************************************************/
  var elements = [
    {
      nom: 'plateforme',
      sx: 1500,
      sy: 1100,
      dx: 10,
      dy: 600,
      dw: 250,
      dh: 30,
      ratio: 1,
      scenery: true,
      pf: true
    },
    {
      nom: 'plateforme2',
      sx: 1500,
      sy: 1100,
      dx: 750,
      dy: 580,
      dw: 250,
      dh: 30,
      ratio: 1,
      scenery: true,
      pf: true
    },
    {
      nom: 'plateforme3',
      sx: 1500,
      sy: 1100,
      dx: 450,
      dy: 580,
      dw: 100,
      dh: 100,
      ratio: 1,
      scenery: true,
      pf: true
    },
    {
      nom: 'html',
      sx: 2100,
      sy: 500,
      dx: 10,
      dy: 500,
      moving: false,
      bonus: true
    },
    {
      nom: 'css',
      sx: 2100,
      sy: 600,
      moving: true,
      bonus: true
    },
    {
      nom: 'javascript',
      sx: 2100,
      sy: 700,
      dx: 900,
      dy: 500,
      bonus: true
    },
    {
      nom: 'angular',
      sx: 2100,
      sy: 800,
      moving: true,
      bonus: true
    },
    {
      nom: 'mongo',
      sx: 2100,
      sy: 900,
      moving: true,
      bonus: true
    },
    {
      nom: 'node',
      sx: 2100,
      sy: 1000,
      moving: true,
      bonus: true
    },
    {
      nom: 'meteor',
      sx: 2100,
      sy: 1100,
      moving: true,
      bonus: true
    },
    {
      nom: 'flora',
      sx: 1300,
      sy: 1100,
      dx: 0,
      dy: 590,
      dw: 100,
      dh: 100,
      scenery: true
    },
    {
      nom: 'flora2',
      sx: 1100,
      sy: 1100,
      dx: 350,
      dy: 575,
      dw: 100,
      dh: 100,
      scenery: true,
    },
    {
      nom: 'flora3',
      sx: 900,
      sy: 1100,
      dx: 670,
      dy: 575,
      dw: 100,
      dh: 100,
      scenery: true,
    },
    {
      nom: 'life1',
      sx: 1900,
      sy: 1100,
      dx: 10,
      dy: 10,
      dw: 100,
      dh: 100,
      ratio: 0.5,
      scenery: true
    },
    {
      nom: 'life2',
      sx: 1900,
      sy: 1100,
      dx: 70,
      dy: 10,
      dw: 100,
      dh: 100,
      ratio: 0.5,
      scenery: true
    },
    {
      nom: 'life3',
      sx: 1900,
      sy: 1100,
      dx: 130,
      dy: 10,
      dw: 100,
      dh: 100,
      ratio: 0.5,
      scenery: true
    },
    {
      nom: 'monster',
      sx: 0,
      sy: 600,
      dx: 10,
      dy: 530,
      moving: true,
      moveFrom: 10,
      moveTo: 200,
      numberOfFrames: 16,
      ticksPerFrame: 5,
      danger: true
    }, {
      nom: 'monster2',
      sx: 0,
      sy: 600,
      dx: 0,
      dy: 600,
      danger: true,
      numberOfFrames: 16,
      ticksPerFrame: 5,
      moving: true,
      moveFrom: 0,
      moveTo: 1000,
    }, {
      nom: 'lapin',
      sx: 0,
      sy: 1000,
      dx: 100,
      dy: 610,
      vx: 2,
      numberOfFrames: 7,
      ticksPerFrame: 3,
      moving: true,
      moveFrom: 0,
      moveTo: 1000,
      danger: true
    }, {
      nom: 'dino',
      sx: 0,
      sy: 800,
      dx: 750,
      dy: 510,
      vx: 1,
      numberOfFrames: 7,
      ticksPerFrame: 3,
      moving: true,
      moveFrom: 750,
      moveTo: 950,
      danger: true
    }
  ];

  /***************************************************************************
  Fonctions Constructeurs
  ***************************************************************************/
  var Sprite = function(options) {
    this.nom = options.nom || 'item';
    this.context = options.context || canvas.getContext('2d');
    this.image = options.img || mySpriteSheet;
    this.sx = options.sx;
    this.sy = options.sy;
    this.sw = options.sw || 100;
    this.sh = options.sh || 100;
    this.dx = options.dx;
    this.dy = options.dy;
    this.dw = options.dw || 100;
    this.dh = options.dh || 100;
    this.ratio = options.ratio || 1;
    this.frameIndex = 0;
    this.scenery = options.scenery;
    this.danger = options.danger || false;
    this.bonus = options.bonus || false;
    this.pf = options.pf || false;


    this.render = function() { //affiche l'image dans le canvas
    this.context.drawImage(
      this.image, //insert l'image
      this.sx + this.sw * this.frameIndex,
      this.sy,
      this.sw,
      this.sh,
      this.dx,
      this.dy,
      this.dw * this.ratio,
      this.dh * this.ratio);
    };


  };

  //Fonction constructeur qui anime le sprite
  var AnimatedSprite = function(options) {
    //propriétés liées à l'animation
    this.tickCount = 0,
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.animation = options.animation;


    this.update = function() { // anime l'image
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      };
    };
  };
};

//Fonction constructeur qui déplace le sprite sur le canvas
var MovingSprite = function(options) {

  this.moveTo = options.moveTo;
  this.moveFrom = options.moveFrom;
  this.moving = options.moving;
  this.vx = options.vx || 1;
  this.vy = options.vy || 0;
  this.mass = 1.02;
  this.startingSY = this.sy;
  this.floor = {
    x1: -100,
    x2: canvas.width,
    bottom: 700
  };


  this.translate = function(start, end, sy) { //Effectue une translation de l'image du parametre start jusqu'à end. sy précise la ligne de sprite à utiliser pour l'animation du sens gauche -> droite
    if (start != end) {
      if (this.dx > end) {
        this.dir = 1;
        this.sy = sy + 100;
      }
      if (this.dx < start) {
        this.dir = 0;
        this.sy = this.startingSY;
      }

      if (this.dir) {
        this.dx -= this.vx;
      } else {
        this.dx += this.vx;
      };
    };
  };

};



//fonction constructeur pour afficher les icones de compétences.

var Bonus = function(options) {
  this.dy = options.dy || 0;
  this.dx = options.dx || Math.random() * 1000;
  this.numberOfFrames = options.numberOfFrames || 6;
  this.ratio = options.ratio || 0.5;
  this.tickCount = 0;
  this.ticksPerFrame = 10;
  this.bonus = true;
  this.mass = 1.001;
  this.random = function(min, max) {
    return Math.random() * (max - min + 1);
  };


  this.fall = function() {
    if (this.moving) {
      this.tickCount += 1;
      if (this.tickCount > this.ticksPerFrame) {
        if (this.dy + this.dh >= this.floor.bottom) {
          this.dy = 0;
          this.dx = Math.random() * canvas.width;
        };
        if (this.dx <= 1 || this.dx + this.dw >= canvas.width) {
          this.dx = Math.random() * canvas.width;
          this.dy = 0;
        };

        this.dx += this.random(-5, 5);
        this.dy += this.random(-10, 2);
        this.tickCount = 0;
      };
    };
  };

};


/**************************************************************************/
var Heros = function(options) {
  this.heros = options.heros;
  this.canGoRight = false;
  this.canGoLeft = false;
  this.canJump = false;
  this.mass = 1.02;
  this.vy = 0; //vitesse actuelle du sprite
  this.vx = 0; //vitesse actuelle du sprite
  this.vMax = 2; //vitesse maximale du sprite
  this.vAccel = 0.5; //acceleration du sprite
  this.hitBoxAdj = 31; //permet d'ajuster la taille des hitbox des objets, correctif apporté par rapport à la taille dessin dans le Frame
  this.currentPlatform = {}; //objet : platform en contact avec le héros
  this.currentEnnemy = {}; //objet : ennemi en contact avec le héros
  this.currentBonus = {};//objet : competence en contact avec le héros
  this.onPlatform = false;
  this.dying = false;
  this.lifes = 3;
  this.skills = 0;

//fonction qui attire le héros vers le sol en ajoutant la masse
  this.gravity = function() {
    if (this.dx >= this.floor.x1 && this.dx <= this.floor.x2) {
      this.maxJump = this.floor.bottom - 130;
      this.dy *= this.mass;
      if (this.dy + this.dh >= this.floor.bottom) {
        this.dy = this.floor.bottom - this.dh;
      }

      if (this.dy + this.dh <= this.maxJump) {
        this.dir = 1
      }

      if (this.dy + this.dh >= this.floor.bottom) {
        this.dir = 0;
      }

      if (this.dir) {
        this.vy = 10;
      }
      if (this.dir == false) {
        this.vy = -10;
      }
    } else {
      this.dy *= this.mass;
    };

  };

  //fonction qui test si le personnage touche un élément du décor.
  this.testCollision = function() {
    for (var i = 0; i < stage.length; i++) {
      if (stage[i]) {
        if (this.dx + this.hitBoxAdj < stage[i].dx + stage[i].dw - this.hitBoxAdj &&
          this.dx + this.dw - this.hitBoxAdj > stage[i].dx + this.hitBoxAdj &&
          this.dy + this.hitBoxAdj < stage[i].dy + stage[i].dh - this.hitBoxAdj &&
          this.dh + this.dy - this.hitBoxAdj > stage[i].dy + this.hitBoxAdj) {
            //Une collision est en cours
            this.collision = true;

            //Collision avec un ennemi
            if (stage[i].danger) {
              this.currentEnnemy = stage[i];
              this.vsEnnemy(this.currentEnnemy)
            };

            //Collision avec une platforme
            if (stage[i].pf) {
              this.currentPlatform = stage[i];
              this.onPlatform = true;
              this.vsPlatform(this.currentPlatform)
            };

            //Collisions avec une competence
            if (stage[i].bonus) {
              this.currentBonus = stage[i];
              this.vsBonus(this.currentBonus);
            };

          };


          if (this.dx + this.dw - this.hitBoxAdj> stage[i].dx + stage[i].dw - this.hitBoxAdj ||
            this.dx + this.hitBoxAdj < stage[i].dx +this.hitBoxAdj||
            this.dy + this.hitBoxAdj > stage[i].dy + stage[i].dh - this.hitBoxAdj||
            this.dh + this.dy - this.hitBoxAdj< stage[i].dy+this.hitBoxAdj) {
              if (this.onPlatform) {
                if (this.dx + this.hitBoxAdj< this.currentPlatform.dx  || this.dx - this.hitBoxAdj+ this.dw / 2 > this.currentPlatform.dx + this.currentPlatform.dw - this.hitBoxAdj) {
                  // if (this.dir == false) {
                  //   this.floor.bottom = 700;
                  // }
                  if (this.dy + this.dh - this.hitBoxAdj){
                    this.floor.bottom = 700;
                  }
                  this.onPlatform = false;
                }
              }
              if (this.dying) {
                this.dying = false;
                this.sy = 200;
                this.numberOfFrames = 22;
                this.ticksPerFrame = 5;
                this.dx = 450;
                this.dy = 400;
                this.floor.bottom = 700;
                // window.setTimeout(function() {
                  // launchlistener();
                // }, 1000);
              }
            }
          }
        };
      };

      this.vsEnnemy = function(ennemy) {
        //repositionne l'ennemi à sa position originale
        ennemy.dx = ennemy.moveFrom;

        for (var i = 0; i < stage.length; i++) {
          if (stage[i].nom == 'life' + this.lifes) {
            stage[i].scenery = false;
            this.lifes -= 1;
            var herosLifes = this.lifes;
            if(this.lifes > 0){
              putOnPause();
              $(document).ready(function(){
                $('#message').html("<img src =\"./img/timisdead.png\"> <br> Ooops vous avez perdu une vie. <br> Il vous en reste encore <strong>" + herosLifes + "</strong>");
                $('#message').fadeIn('fast').delay(2000).fadeOut('slow');
              })
              window.setTimeout(function(){
                putOnPause();
              },2000)
            }
            break;
          }
        }
        this.dying = true;
      }

      this.vsBonus = function(bonus) {
        var cssName = document.getElementById(bonus.nom)
        cssName.setAttribute('style', 'display:inline-block');
        bonus.dx = 0;
        bonus.dy = 0;
        bonus.sx = 1800;
        bonus.sy = 400;
        bonus.moving = false;
        bonus.numberOfFrames = 1;
        this.skills += 1;
        var skillCount = this.skills;
        if (this.skills <7){
          $(document).ready(function(){
            $('#message').html("Bravo ! Vous avez attrapé la compétence <br> <span style=\"text-transform : uppercase\"><strong>" + bonus.nom + '</strong></span> <img src =\"./img/'+ bonus.nom + '.png\"><br>Plus que ' + parseInt(7-skillCount) + " à attraper ! ");
            $('#message').fadeIn('fast').delay(2000).fadeOut('slow');
          })
        }
      };

    /**************************************************************************¨
      GESTION COLLISION AVEC platform
    *************************************************************************/
      this.vsPlatform = function(currentPlatform) {
        if (this.dy + this.hitBoxAdj < currentPlatform.dy + this.hitBoxAdj) {
          this.floor.bottom = currentPlatform.dy + this.hitBoxAdj;
          this.maxJump = this.floor.bottom - 200;
        } else if (this.dy + this.hitBoxAdj >= currentPlatform.dy + this.hitBoxAdj) {
          if (this.dx + this.hitBoxAdj <= currentPlatform.dx + this.hitBoxAdj) {
            this.dx = currentPlatform.dx - this.dw;
          };
          if (this.dx + this.hitBoxAdj >= currentPlatform.dx + this.hitBoxAdj) {
            this.dx = currentPlatform.dx + currentPlatform.dw
          }
        } else {
          this.maxJump = currentPlatform.dy + currentPlatform.dh
        }
      };


/**************************************************************************¨
      GESTION des DEPLACEMENTS DU HEROS
*************************************************************************/

      this.goRight = function() {
        if(this.dx <= canvas.width-this.dw){
          if (this.canGoRight == true) {
            if (this.vx < this.vMax) {
              this.sy = 0;
              this.numberOfFrames = 27;
              this.vx += this.vAccel;
            };
            this.dx += this.vx;
          };
        }else{
          this.dx = canvas.width-this.dw;
        };
      };

      this.goLeft = function() {
        if(this.dx > 0){
          if (this.canGoLeft == true) {
            if (this.vx > -this.vMax) {
              this.sy = 100;
              this.numberOfFrames = 27;
              this.vx -= this.vAccel;
            }
            this.dx += this.vx;
          };
        }else{
          this.dx = 0;
        }
      }

      this.isWaiting = function() {
        if (this.waiting == true) {
          this.sy = 300;
          this.sx = 0;
          this.numberOfFrames = 22;
        }
      }

      this.stopRunning = function() {
        if (this.canGoRight == false) {
          if (this.vx > 0) {
            this.sy = 200;
            this.numberOfFrames = 22;
            this.vx -= this.vAccel;
          }
          this.dx += this.vx;
        }

        if (this.canGoLeft == false) {
          if (this.vx < 0) {
            this.sy = 200;
            this.numberOfFrames = 22;
            this.vx += this.vAccel;
          }
          this.dx += this.vx;
        }
      }

      this.goUp = function() {
        if (this.canJump == true) {
          this.vy += 1;

          if (this.vx == 0) {
            this.vx = 0;
          } else if (this.vx < this.vMax) {
            this.vx += this.vAccel;
            if (this.vx > 0) {
              this.sx = 0;
              this.sy = 400;
              this.numberOfFrames = 9;
            };
            if (this.vx < 0) {
              this.sx = 0;
              this.sy = 500;
              this.numberOfFrames = 9;
            };
          };

          this.mass = 1;
          this.dy += this.vy;
          this.dx += this.vx;
        };
      };

      this.stopJumping = function() {
        if (this.canJump == false) {
          this.mass = 1.02;
          if (this.vy >= 0) {
            this.vy -= 0.5;
          };
        };
      };


    };

    /**************************************************************************
    GESTION DU CLAVIER

    Lorsqu'on appuie sur une touche, on passe une condition à true.
    La boucle gameLoop parcourt 60 fois par secondes les fonctions de déplacement du héros.

    Lorsqu'on relâche la touche, la condition passe à faux.
    ***************************************************************************/
    function keyControl(e) {
      var event = e.keyCode;
      e.preventDefault();

      switch (event) {
        case 39:
        tim.canGoRight = true;
        break;

        case 37:
        tim.canGoLeft = true;
        break;

        case 38:
        tim.canJump = true;
        break;

        case 32:
        tim.canJump = true;
        break;

        case 27:
        putOnPause();
        break;
      };
    };

    //eventListener est inclus dans une fonction ainsi il est possible de l'appeler de n'importe où dans le code. Il est aussi possible de le désactiver.

    var launchlistener = function() {
      document.addEventListener('keydown', keyControl);
    };

    launchlistener();

    document.addEventListener('keyup', function(e) {
      var event = e.keyCode;
      switch (event) {
        case 39:
        tim.canGoRight = false;
        break;

        case 37:
        tim.canGoLeft = false;
        break;

        case 38:
        tim.canJump = false;
        break;

        case 32:
        tim.canJump = false;
        break;
      };
    });

    /***************************************************************************
    CHAINE DE PROTOTYPAGE
    ***************************************************************************/
    var getSprite = function(options) {
      return new Sprite(options);
    };

    var getAnimatedSprite = function(options) {
      AnimatedSprite.prototype = getSprite(options);
      return new AnimatedSprite(options);
    };

    var getMovingSprite = function(options) {
      MovingSprite.prototype = getAnimatedSprite(options);
      return new MovingSprite(options);
    };

    var getBonusSprite = function(options) {
      Bonus.prototype = getMovingSprite(options);
      return new Bonus(options);
    };

    var getHeros = function(options) {
      Heros.prototype = getMovingSprite(options);
      return new Heros(options);
    }

    /***************************************************************************
    Constitution du décor (scenery)
    ***************************************************************************/
    var stage = []; //tous les élements qui s'affichent sont dans ce tableau
    //fonction autoexecutante qui parcourt le tableau elements et les créer en utilisant les fonctions constructeurs correspondant à leurs options.
    function createStage(){
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].scenery) {
          stage[i] = getSprite(elements[i]);
        };
        if (elements[i].animation) {
          stage[i] = getAnimatedSprite(elements[i]);
        };
        if (elements[i].moving) {
          stage[i] = getMovingSprite(elements[i]);
        };
        if (elements[i].bonus) {
          stage[i] = getBonusSprite(elements[i]);
        };
        if (elements[i].heros) {
          stage[i] = getHeros(elements[i]);
        };
      };
    };

    createStage();

    //displayStage parcourt le tableau stage pour afficher les éléments qui s'y trouvent.
    var displayStage = function(options) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].scenery) {
          options[i].render();
        };
        if (options[i].animation) {
          // options[i].render();
          options[i].update();
        };
        if (options[i].bonus) {
          options[i].render();
          options[i].update();
          options[i].fall();
        };
        if (options[i].moving) {
          options[i].render();
          options[i].update();
          options[i].translate(options[i].moveFrom, options[i].moveTo, options[i].sy);
        };
      };
    };

    /**************************************************************************
        DECLARATION DU HEROS
    ***************************************************************************/

    var tim = getHeros({
      sx: 0,
      sy: 200,
      dx: 470,
      dy: 400,
      dw: 100,
      dh: 100,
      numberOfFrames: 22,
      ticksPerFrame: 4,
    })


    /***************************************************************************
    GAME LOOP
    Cette fonction
    ***************************************************************************/

    function gameLoop() {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      background(maxTime);
      displayStage(stage);
      tim.gravity();
      tim.render();
      tim.update();
      tim.goRight();
      tim.goLeft();
      tim.stopRunning();
      tim.goUp();
      tim.stopJumping();
      tim.isWaiting();
      tim.testCollision();

      requestId = window.requestAnimationFrame(gameLoop);

      if (paused == true) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(requestId);
      }


      if (tim.skills == 7){
        putOnPause();
        $(document).ready(function(){
          $('#message').html('<img src = "./img/key.png"> <br>Bravo<br>Vous avez débloqué l\'accès à mon ...  <br> <a href="assets/CV_laurent_muller_small.pdf"><strong>CV</strong></a>. ');
          $('#message').fadeIn('slow');
        });
        gameOver = true;
        pauseButton.setAttribute('style','display : none')
        cancelAnimationFrame(requestId);
      };

      if (tim.lifes == 0 || requestId == maxTime){
        putOnPause();
        $(document).ready(function(){
          $('#message').html('Ooops c\'est perdu.<br> Vous pouvez recommencer ou accéder directement à mon <br> <a href="assets/CV_laurent_muller_small.pdf"><strong>CV</strong></a>. ');
          $('#message').fadeIn('slow');
        });
        gameOver = true;
        pauseButton.setAttribute('style','display : none')
        cancelAnimationFrame(requestId);
      };

    };

  });
