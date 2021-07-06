class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
      // load images and tile sprites
      this.load.image('bird', './assets/phoenix2.png');
      this.load.image('cloud', './assets/cloud.png');
      this.load.image('field', './assets/field.png');
      this.load.image('overcast', './assets/cloudsalone.png');

      // load audio
      this.load.audio('bgm', './assets/clouded_skies_bgm.wav');

      // add bird collision animation here
      this.load.spritesheet('flames', './assets/deathanimation.png', {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame: 7});
  }

  create() {
    // place tile sprite
    // this.background = this.add.tileSprite(0, 0, 360, 640, 'background').setOrigin(0,0);
    this.background = this.add.tileSprite(0, 0, 360, 640, 'field').setOrigin(0,0);
    this.cloudies = this.add.tileSprite(0, 0, 360, 640, 'overcast').setOrigin(1,0);

    //place bird
    this.player = new Bird(this, game.config.width/2, game.config.height - UISize - 45, 'bird').setOrigin(0.5, 0);

    // create cloud enemies
    // random number generation
    // let (l = 0)
    let random = Phaser.Math.Between(0, game.config.width);
    this.enemy1 = new Cloud(this, random, 0, 'cloud', 0).setOrigin(0, 0)

    // if (this.enemy1.update()) {
    //   let random2 = Phaser.Math.Between(0, game.config.width);
    //   this.enemy1 = new Cloud(this, random2, -64, 'cloud', 0).setOrigin(0, 1)
    // } else {
    //     this.enemy1 = new Cloud(this, random, -64, 'cloud', 0).setOrigin(0, 1)
    // }

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

    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('flames', { start: 0, end: 7, first: 0}),
      frameRate: 7
    })

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
      // let random = Phaser.Math.Between(0, game.config.width);
      this.background.tilePositionY -= 1;
      this.cloudies.tilePositionY -= 1;
      this.cloudies.tilePositionX -= 0.5;
      this.player.update();
      // this.random.update();
      this.enemy1.update();
      this.score++;
      this.displayScore = Math.floor(this.score / 10);
      this.scoreLeft.text = this.displayScore;
  }
      // checking collisions
    if (this.checkCollision(this.player, this.enemy1)) {
      this.gameOver = true;
      this.BirdDeath(this.player);
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
BirdDeath (phoenix) {
  phoenix.alpha=0;
  let burn = this.add.sprite(phoenix.x, phoenix.y, 'explosion').setOrigin(0, 0);
  burn.anims.play('fire');
  burn.on('animationcomplete', () => {
      phoenix.reset();
      phoenix.alpha=1;
      burn.destroy();
  });
  }
}