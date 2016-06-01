window.document.addEventListener('DOMContentLoaded', function() {
    /*****************************************************************************
    Définition des images utilisées
    *****************************************************************************/
    var mySpriteSheet = new Image();
    mySpriteSheet.src = 'img/mySpriteSheet200.png';
    var backgroundImage = new Image();
    backgroundImage.src = 'img/bg.jpg';

    /***************************************************************************
    Définition du canvas
    ***************************************************************************/
    var canvas = document.getElementById('stage');
    canvas.height = 720;
    canvas.width = 1000;


    var cssName = document.getElementById('node');
    cssName.className ='btn btn-success'

    var paused = false;

    var button = document.getElementById('start')
    console.log(button)
    button.addEventListener('click', function(){
        if (paused){
            paused = false;
            button.setAttribute('value', 'Reprendre')
            gameLoop();
        }else{
            paused = true;
            button.setAttribute('value', 'Pause')
        }
    });



    /***************************************************************************
    Définition des sprites
    ***************************************************************************/

    var elements = [{
            img: backgroundImage,
            nom: 'background',
            sx: 0,
            sy: 0,
            sw: 1000,
            sh: 720,
            dx: 0,
            dy: 0,
            dw: 1000,
            dh: 720,
            scenery: true
        },
        {
            nom: 'plateforme',
            sx: 800,
            sy: 400,
            dx: 450,
            dw: 100,
            dy: 610,
            dh: 100,
            ratio: 1,
            scenery: true,
            platform: true

        },
        {
            nom: 'html',
            sx: 1000,
            sy: 1000,
            dx: 100,
            dy: 100,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true
        }, {
            nom: 'css',
            sx: 1000,
            sy: 1100,
            dx: 200,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'javascript',
            sx: 1000,
            sy: 1200,
            dx: 300,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'angular',
            sx: 1000,
            sy: 1300,
            dx: 400,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'mongo',
            sx: 1000,
            sy: 1400,
            dx: 500,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'node',
            sx: 1000,
            sy: 1500,
            dx: 600,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'meteor',
            sx: 1000,
            sy: 1600,
            dx: 700,
            dy: 100,
            moving: true,
            numberOfFrames: 6,
            ratio: 0.5,
            ticksPerFrame: 10,
            bonus: true


        }, {
            nom: 'flora',
            sx: 1100,
            sy: 400,
            dx: 620,
            dy: 610,
            dw: 100,
            dh: 100,
            scenery: true
        }, {
            nom: 'flora2',
            sx: 1300,
            sy: 400,
            dx: 220,
            dy: 575,
            dw: 100,
            dh: 100,
            scenery: true,
        }, {
            nom: 'monster',
            sx: 0,
            sy: 800,
            dx: 0,
            dy: 610,
            moving: true,
            moveFrom: 1,
            moveTo: 400,
            numberOfFrames: 7,
            ticksPerFrame: 5,
            danger: true
        }, {
            nom: 'monster2',
            sx: 0,
            sy: 800,
            dx: 500,
            dy: 610,
            danger: true,
            numberOfFrames: 7,
            ticksPerFrame: 10,
            moving: true,
            moveFrom: 500,
            moveTo: 1000,
        }, {
            nom: 'lapin',
            sx: 0,
            sy: 1400,
            dx: 300,
            dy: 610,
            vx : 3  ,
            numberOfFrames: 7,
            ticksPerFrame: 5,
            moving: true,
            moveFrom: 0,
            moveTo: 1000,
        }
    ];

    /***************************************************************************
        Propriétés particulières
    ***************************************************************************/
    var gain = [];


    var storeInGain = function(bonus) {
                var i = gain.length;
                bonus.bonus = false;
                bonus.scenery = true;
                bonus.dx = 100 * i;
                bonus.dy = 100 * i;
                gain[i]=bonus;
                console.log(gain[i])
            };

     var displayBonus = function(){
         if(gain.length){
             var cssName = document.getElementById(gain[0].nom)
             cssName.setAttribute('style', 'visibility:visible');
             gain.pop();
         }
     }

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
        this.platform = options.platform || false;


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
            bottom: 610
        };

        this.defineFloorHeight = function() {
            if (!this.onPlatform) {
                this.floor = {
                    x1: -100,
                    x2: canvas.width,
                    bottom: 610
                }
            }
        }

        this.gravity = function() {
            if (this.dx >= this.floor.x1 && this.dx <= this.floor.x2) {
                this.maxJump = this.floor.bottom - 200;
                this.dy *= this.mass;
                if (this.dy >= this.floor.bottom) {
                    this.dy = this.floor.bottom;
                }

                if (this.dy <= this.maxJump) {
                    var dir = 1
                }

                if (this.dy >= this.floor.bottom) {
                    var dir = 0;
                }

                if (dir) {
                    this.vy = 15;
                }
                if (dir == false) {
                    this.vy = -15;
                }
            } else {
                this.dy *= this.mass;
            };

        };

        this.translate = function(start, end, sy) { //Effectue une translation de l'image
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

    var Bonus = function(options) {
        this.dx = Math.random() * 1000;
        this.tickCount = 0;
        this.ticksPerFrame = 10;
        this.mass = 1.001
        this.random = function(min, max) {
            return Math.random() * (max - min + 1);
        }



        this.fall = function() {
            this.tickCount += 1

            if (this.tickCount > this.ticksPerFrame) {
                if (this.dy + this.dh - 100 >= this.floor.bottom) {
                    this.dy = 0;
                    this.dx = Math.random() * 1000 + 1
                }
                if (this.dx <= 1 || this.dx + this.dw >= canvas.width) {
                    this.dx = Math.random() * 1000;
                    this.dy = 0
                }


                this.dx += this.random(-5, 5);
                this.dy += this.random(-10, 2);
                this.tickCount = 0;
            };
        };
    };


    /**************************************************************************/
    var Heros = function(options) {
        this.heros = options.heros;
        this.canGoRight = false;
        this.canGoLeft = false;
        this.canJump = false;
        this.dying = false;
        this.mass = 1.02;
        this.vy = 0; //vitesse actuelle du sprite
        this.vx = 0; //vitesse actuelle du sprite
        this.vMax = 2; //vitesse maximale du sprite
        this.vAccel = 0.5; //acceleration du sprite
        this.hitBoxAdj = 31; //permet d'ajuster la taille des hitbox des objets, correctif apporté par rapport à la taille dessin dans le Frame

        this.testCollisionDanger = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].danger) {
                    if (this.dx < stage[i].dx + stage[i].dw - 2 * this.hitBoxAdj &&
                        this.dx + this.dw > stage[i].dx + 2 * this.hitBoxAdj &&
                        this.dy < stage[i].dy + stage[i].dh - this.hitBoxAdj &&
                        this.dh + this.dy > stage[i].dy + this.hitBoxAdj) {
                        // this.dx = canvas.width / 2 - this.dw / 2;
                        // this.canGoRight = false;
                        // this.canGoLeft = false;
                        this.vx =0;
                        this.sy = 500;
                        this.numberOfFrames =6;
                        // paused = true
                    }
                };
            };
        };

        this.testCollisionPlatform = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].platform) {
                    this.hauteurPlatform = stage[i].dy
                    this.debutPlatform = stage[i].dx;
                    this.finPlatform = stage[i].dx + stage[i].dw * stage[i].ratio
                    this.frontPos = this.dx + this.dw - this.hitBoxAdj;
                    this.backPos = this.dx + this.hitBoxAdj;
                    this.feetPos = this.dy + this.dh - this.hitBoxAdj;

                    if (this.frontPos >= this.debutPlatform && this.backPos <= this.debutPlatform + 5 && this.feetPos > this.hauteurPlatform) {
                        this.dx = this.debutPlatform - (this.dw + this.hitBoxAdj);
                    }

                    if (this.backPos <= this.finPlatform && this.frontPos >= this.finPlatform + 5 && this.feetPos > this.hauteurPlatform) {
                        this.dx = this.finPlatform;
                    }

                    if (this.frontPos >= this.debutPlatform && this.backPos <= this.finPlatform && this.feetPos >= this.hauteurPlatform) {
                        this.onPlatform = true;
                        this.floor.bottom = this.hauteurPlatform - this.dw + this.hitBoxAdj;
                    }
                    if (this.frontPos > this.finPlatform || this.backPos < this.debutPlatform) {
                        this.onPlatform = false;
                    }
                };
            };
        };


        this.testCollisionBonus = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].bonus) {
                    if (this.dx+this.hitBoxAdj< stage[i].dx + stage[i].dw-this.hitBoxAdj &&
                        this.dx + this.dw -this.hitBoxAdj > stage[i].dx+this.hitBoxAdj &&
                        this.dy + this.hitBoxAdj< stage[i].dy + stage[i].dh -this.hitBoxAdj &&
                        this.dh + this.dy - this.hitBoxAdj> stage[i].dy + this.hitBoxAdj) {
                        storeInGain(stage[i]);
                        stage.splice(i, 1);
                    };
                };
            };
        };

        this.goRight = function() {
            if (this.canGoRight == true) {
                if (this.vx < this.vMax) {
                    this.sy = 0;
                    this.numberOfFrames = 27;
                    this.vx += this.vAccel;
                }
                this.dx += this.vx;
            };
        }

        this.goLeft = function() {
            if (this.canGoLeft == true) {
                if (this.vx > -this.vMax) {
                    this.sy = 100;
                    this.numberOfFrames = 27;
                    this.vx -= this.vAccel;
                }
                this.dx += this.vx;
            };
        }

        this.isWaiting = function(){
            if(this.waiting == true){
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
                        this.sy = 600;
                        this.numberOfFrames = 9;
                    };
                    if (this.vx < 0) {
                        this.sy = 700;
                        this.numberOfFrames = 9;
                    }
                }

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
        La boucle gameLoop parcours 60 fois par secondes les fonctions de déplacement du héros.

        Lorsqu'on relâche la touche, la condition passe à faux.
    ***************************************************************************/
    document.addEventListener('keydown', function(e) {
        var event = e.keyCode;
        // e.preventDefault();

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
        };
    });

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

    (function createStage() {
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
        }
    })();

    var displayStage = function(options) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].scenery) {
                options[i].render();
            };
            if (options[i].animation) {
                options[i].render();
                options[i].update();
            };
            if (options[i].bonus) {
                options[i].render();
                options[i].update();
                options[i].gravity();
                options[i].fall();
            };
            if (options[i].moving) {
                options[i].render();
                options[i].update();
                options[i].gravity();
                options[i].translate(options[i].moveFrom, options[i].moveTo, options[i].sy);
            };
        };
    };

    var tim = getHeros({
        sx: 0,
        sy: 200,
        dx: canvas.width / 2 - 50,
        dy: 300,
        dw: 100,
        dh: 100,
        numberOfFrames: 22,
        ticksPerFrame: 5,
    })


    /***************************************************************************
            GAME LOOP
            Cette fonction
    ***************************************************************************/
    var requestId;

    function gameLoop() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        displayStage(stage);
        displayBonus();
        tim.gravity();
        tim.render();
        tim.update();
        tim.goRight();
        tim.goLeft();
        tim.stopRunning();
        tim.goUp();
        tim.stopJumping();
        tim.isWaiting();

        tim.testCollisionBonus();
        tim.testCollisionDanger();
        tim.testCollisionPlatform();
        tim.defineFloorHeight();

        requestId = window.requestAnimationFrame(gameLoop);

        if (paused == true){
            cancelAnimationFrame(requestId);
        }

    };


    mySpriteSheet.addEventListener('load', gameLoop); //attend que la spritsheet soit chargée avant de lancer l'animation.
    // console.log(stage)





});
