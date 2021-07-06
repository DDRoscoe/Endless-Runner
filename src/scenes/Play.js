class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
      // load images and tile sprites
      this.load.image('bird', './assets/bird.png');
      this.load.image('background', './assets/background.png');
      this.load.image('cloud', './assets/cloud.png');

      // load audio
      this.load.audio('bgm', './assets/clouded_skies_bgm.wav');

      // add bird collision animation here
  }

  create() {
    // place tile sprite
    this.background = this.add.tileSprite(0, 0, 360, 640, 'background').setOrigin(0,0);

    //place bird
    this.player = new Bird(this, game.config.width/2, game.config.height - UISize - 45, 'bird').setOrigin(0.5, 0);

    // create cloud enemies
    // random number generation
    let random = Phaser.Math.Between(0, game.config.width);
    this.enemy1 = new Cloud(this, random, 0, 'cloud', 0).setOrigin(0, 0);

    //place UI bottom rectangle and separation line rectangle
    this.add.rectangle(0, game.config.height - UISize, game.config.width, UISize, 0x000080).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - UISize, game.config.width, 5, 0xF5F5DC).setOrigin(0, 0);

    // play music
    this.bgm = this.sound.add('bgm');
    this.bgm.play({loop: true});
    
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

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
    this.scoreLeft = this.add.text(borderSize, game.config.height - UISize + 20, this.score, scoreConfig);
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
      this.background.tilePositionY -= 1;
      this.player.update();
      this.enemy1.update();      
      this.score++;
      this.displayScore = Math.floor(this.score / 10);
      this.scoreLeft.text = this.displayScore;
    }

    // checking collisions
    if (this.checkCollision(this.player, this.enemy1)) {
      this.gameOver = true;
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or M for Menu').setOrigin(0.5);
      this.gameOver = true;
    }
  }

  checkCollision (player, enemy) {
    // simple AABB checking
    if (player.x < enemy.x + enemy.width && 
    player.x + player.width > enemy.x && 
    player.y < enemy.y + enemy.height &&
    player.height + player.y > enemy. y) {
      return true;
    } 
    else {
      return false;
    }
  }
}