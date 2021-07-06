class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
      // load images and tile sprites
      this.load.image('bird', './assets/bird.png');
      this.load.image('cloud', './assets/cloud.png');
      this.load.image('field', './assets/field.png');
      this.load.image('overcast', './assets/cloudsalone.png');

      // load audio
      this.load.audio('bgm', './assets/clouded_skies_bgm.wav');

      // load audio
      this.load.audio('bgm', './assets/clouded_skies_bgm.wav');
      this.load.audio('sfx_birdcall', './assets/birdcall.wav');

      // add bird collision animation here
  }

  create() {
    // place tile sprite
    this.background = this.add.tileSprite(0, 0, 360, 640, 'field').setOrigin(0,0);
    this.cloudies = this.add.tileSprite(0, 0, 360, 640, 'overcast').setOrigin(0,0);

    //place bird
    this.player = new Bird(this, game.config.width/2, game.config.height - UISize - 45, 'bird').setOrigin(0.5, 0);

    // create cloud enemies via random number generation
    let ranX = Phaser.Math.Between(50, game.config.width - 50);
    let ranY = Phaser.Math.Between(-50, -500);
    this.enemy1 = new Cloud(this, ranX, ranY, 'cloud', 0).setOrigin(0.5, 0);
    ranX = Phaser.Math.Between(50, game.config.width - 50);
    ranY = Phaser.Math.Between(-50, -500)
    this.enemy2 = new Cloud(this, ranX, ranY, 'cloud', 0).setOrigin(0.5, 0);
    ranX = Phaser.Math.Between(50, game.config.width - 50);
    ranY = Phaser.Math.Between(-50, -500);
    this.enemy3 = new Cloud(this, ranX, ranY, 'cloud', 0).setOrigin(0.5, 0);

    //place UI bottom rectangle and separation line rectangle
    this.add.rectangle(0, game.config.height - UISize, game.config.width, UISize - 50, 0xF5F5DC).setOrigin(0,0);
    this.add.rectangle(0, game.config.height - UISize, game.config.width, UISize, 0x000080).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - UISize, game.config.width, 5, 0xF5F5DC).setOrigin(0, 0);

    // load audio, play music
    this.birdcall = this.sound.add('sfx_birdcall')
    this.bgm = this.sound.add('bgm')
    this.bgm.play({volume: 0.8, loop: true})
    
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // game over flag
    this.gameOver = false;

    // score and display
    this.score = 0;
    let scoreConfig = {
      fontFamily: 'Georgia',
      fontSize: '35px',
      color: '#F5F5DC',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderSize + 10, game.config.height - UISize + 10, 'Score:' + this.score, scoreConfig);

    // difficulty and display
    let diffConfig = {
      fontFamily: 'Georgia',
      fontSize: '30px',
      color: '#000000',
      align: 'center',
      backgroundColor: '#00FF00',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 120
    }
    this.diffRight = this.add.text(game.config.width - borderSize - 140, game.config.height - UISize + 20, 'Easy', diffConfig);
  }

  update() {
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.bgm.stop();
      this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
      this.bgm.stop();
      this.scene.start("menuScene");
    }

    if (!this.gameOver) {
      // moving background
      this.background.tilePositionY -= 1;
      this.cloudies.tilePositionY -= 1;
      this.cloudies.tilePositionX -= 0.5;
      // update player
      this.player.update();
      // update enemy
      this.enemy1.update();
      this.enemy2.update();
      this.enemy3.update();
      // update score    
      this.score++;
      this.displayScore = Math.floor(this.score / 10);
      this.scoreLeft.text = this.displayScore;

      // update difficulty
      if (this.displayScore == 200) {
        this.diffRight.setBackgroundColor('#FFFF00');
        this.diffRight.text = 'Medium';
      }
      if (this.displayScore == 350) {
        this.diffRight.setBackgroundColor('#FF0000');
        this.diffRight.text = 'Hard';
      }
      if (this.displayScore == 500) {
        this.diffRight.setBackgroundColor('#FF00FF');
        this.diffRight.setFontSize(20);
        this.diffRight.text = 'Impossible';
      }

      // press space to birdcall at a random pitch  
      if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.birdcall.isPlaying) {
      this.birdcall.play({detune: Math.floor(Math.random() * 400 - 200)});
      }
    }
  

    // checking collisions
    if (this.checkCollision(this.player, this.enemy1) || this.checkCollision(this.player, this.enemy2)) {
      this.gameOver = true;
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or M for Menu').setOrigin(0.5);
      this.gameOver = true;
    }

    // check if enemy passed border
    if (this.enemy1.y > game.config.height) {
      this.enemy1.reset();
    }
    if (this.enemy2.y >= game.config.height) {
      this.enemy2.reset();
    }
    if (this.enemy3.y >= game.config.height) {
      this.enemy3.reset();
    }
  }

  checkCollision (entity1, entity2) {
    // simple AABB checking
    if (entity1.x < entity2.x + entity2.width && 
      entity1.x + entity1.width > entity2.x && 
      entity1.y < entity2.y + entity2.height &&
      entity1.height + entity1.y > entity2.y) {
      return true;
    } 
    else {
      return false;
    }
  }
}