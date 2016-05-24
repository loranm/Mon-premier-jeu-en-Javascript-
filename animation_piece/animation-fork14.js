window.document.addEventListener('DOMContentLoaded', function() {
    /*****************************************************************************
    Définition des images utilisées
    *****************************************************************************/
    var mySpriteSheet = new Image();
    mySpriteSheet.src = 'img/mySpriteSheet200.png';
    var backgroundImage = new Image();
    backgroundImage.src = 'img/bg_4_02.jpg';

    /***************************************************************************
    Définition du canvas
    ***************************************************************************/
    var canvas = document.getElementById('stage');
    canvas.height = 720;
    canvas.width = 1280;



    /***************************************************************************
    Définition des sprites
    ***************************************************************************/
    var ground = [
    //     x{
    //     nom: 'ground0',
    //     x1: 0,
    //     x2: 1000,
    //     y1: 610,
    //     y2: 610
    // }, {
    //     nom: 'ground0',
    //     x1: 0,
    //     x2: 600,
    //     y1: 610,
    //     y2: 610
    // }
]




    var elements = [{
            img: backgroundImage,
            nom : 'background',
            sx: 0,
            sy: 0,
            sw: 1280,
            sh: 720,
            dx: 0,
            dy: 0,
            dw: 1280,
            dh: 720,
            scenery: true,
        }, {
            nom: 'plateforme',
            sx: 2200,
            sy: 500,
            dx: 50,
            dy: 571,
            dw: 100,
            dh: 100,
            ratio: 1,
            scenery: true,
            platform: true

        },
        {
            nom: 'plateforme2',
            sx: 2200,
            sy: 500,
            dx: 150,
            dy: 571,
            dw: 100,
            dh: 100,
            ratio: 1,
            scenery: true,
            platform: true

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
        {
            nom: 'flora2',
            sx: 1600,
            sy: 500,
            dx: 420,
            dy: 575,
            dw: 100,
            dh: 100,
            scenery: true,
            danger: true
        }, {
            nom: 'coin1',
            sx: 0,
            sy: 1600,
            dx: 500,
            dy: 600,
            dw: 100,
            dh: 100,
            animation: true,
            numberOfFrames: 9,
            ticksPerFrame: 2,
            bonus: true
        }, {
            nom: 'monster',
            sx: 0,
            sy: 800,
            dx: 0,
            dy: 610,
            dw: 100,
            dh: 100,
            ennemy: false,
            moving: true,
            moveFrom: 1,
            moveTo: 500,
            numberOfFrames: 7,
            ticksPerFrame: 5,
        }
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

    /***************************************************************************
        Propriétés particulières
    ***************************************************************************/
    var platforms = [{dx:50,dw:150}];

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
        this.dw = options.dw;
        this.dh = options.dh;
        this.ratio = options.ratio || 1;
        this.frameIndex = 0;
        this.ennemy = options.ennemy;
        this.scenery = options.scenery;
        this.danger = options.danger || false;
        this.bonus = options.bonus || false;
        this.platform = options.platform || false;


        this.render = function() { //affiche l'image dans le canvas
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
        this.ground = {
            x1: 0,
            x2: 500,
            hauteur: 610
        };
        this.maxJump = this.ground.hauteur - 300;
        this.vx = 5;
        this.vy = 0;
        this.mass = 1.02;
        this.startingSY = this.sy;

        this.gravity = function() {
            if (this.dx > platforms[0].dx && this.dx < platforms[0].dx + platforms[0].dw) {
                this.dy *= this.mass;
                if (this.dy >= this.ground.hauteur) {
                    this.dy = this.ground.hauteur;
                }

                if (this.dy <= this.maxJump) {
                    var dir = 1
                }

                if (this.dy >= this.ground.hauteur) {
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

            if (this.dy + this.vy > canvas.height || this.dy < 0) {
                this.vy = -this.vy;
            };
            if (this.dx + this.vx > canvas.width || this.dx < 0) {
                this.vx = -this.vx;
            };
        };

        this.move = function(start, end, sy) { //Effectue une translation de l'image
            if (start != end) {

                if (this.dx > end) {
                    this.dir = 1;
                    this.sy = sy + 100;
                }
                if (this.dx < 10) {
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
        this.vMax = 3; //vitesse maximale du sprite
        this.vAccel = 0.5; //acceleration du sprite
        this.hitBoxAdj = 60; //permet d'ajuster la taille des hitbox des objets

        this.testCollision = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].danger) {
                    if (this.dx < stage[i].dx + stage[i].dw - this.hitBoxAdj &&
                        this.dx + this.dw > stage[i].dx + this.hitBoxAdj &&
                        this.dy < stage[i].dy + stage[i].dh - this.hitBoxAdj &&
                        this.dh + this.dy > stage[i].dy + this.hitBoxAdj) {
                        this.vx = -5;
                    };
                };
            };
        };

        this.testPlatform = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].platform) {
                    console.log('ajout platform')
                     platforms[i] = stage[i];
                    };
                };
            };

        this.testBonus = function() {
            for (var i = 0; i < stage.length; i++) {
                if (stage[i].bonus) {
                    if (this.dx < stage[i].dx + stage[i].dw &&
                        this.dx + this.dw > stage[i].dx &&
                        this.dy < stage[i].dy + stage[i].dh &&
                        this.dh + this.dy > stage[i].dy) {
                        stage.splice(i, 1);
                    };
                };
            };
        };

        this.animateDeath = function() {
            if (this.dying) {
                this.canGoRight = false;
                this.vx = 0;
                this.ticksPerFrame = 20;
                this.sy = 500;
                this.ratio = 1.5;
                this.numberOfFrames = 6;
                this.dx -= 10
                this.dying = false;
            };
        };

        this.reset

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
                } else if (this.vx <= this.vMax) {
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
            if (options[i].moving) {
                options[i].render();
                options[i].update();
                options[i].move(options[i].moveFrom, options[i].moveTo, options[i].sy);
            };
        };
    };

    var tim = getHeros({
        sx: 0,
        sy: 200,
        dx: 100,
        dy: 600,
        dw: 100,
        dh: 100,
        numberOfFrames: 22,
        ticksPerFrame: 5,
    })

    /***************************************************************************
            GAME LOOP
            Cette fonction
    ***************************************************************************/

    function gameLoop() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);


        displayStage(stage);
        tim.gravity();
        tim.render();
        tim.update();
        tim.goRight();
        tim.goLeft();
        tim.stopRunning();
        tim.goUp();
        tim.stopJumping();
        tim.testBonus();
        tim.testCollision();
        tim.animateDeath();
        tim.testPlatform();



        window.requestAnimationFrame(gameLoop);



    };


    mySpriteSheet.addEventListener('load', gameLoop); //attend que la spritsheet soit chargée avant de lancer l'animation.
    console.log('stage' + stage)
    console.log(platforms)

});
