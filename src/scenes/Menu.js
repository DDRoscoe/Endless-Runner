class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    this.load.audio('sfx_birdcall', './assets/birdcall.wav');
  }

  create() {
    let menuConfig = {
      fontFamily: 'Georgia',
      fontSize: '16px',
      backgroundColor: '#ADD8E6',
      color: '#FFFFFF',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0   
    }

    // show menu text
    this.add.text(game.config.width/2, game.config.height/3 , 'CLOUDED SKIES', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2.5, 'Use Left, Right, Up, and Uown to move', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2.26, 'Use Space to bird call (for fun)', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/1.5, 'Press Space to begin', menuConfig).setOrigin(0.5);

    // define keys
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  update() {
    // start game
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.scene.start('playScene');
    }
    // volume control
    if (Phaser.Input.Keyboard.JustDown(keyUP) && this.sound.volume <= 1) {
      this.sound.volume += 0.1;
      this.sound.play('sfx_birdcall');
    }
    else if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.sound.volume > 0) {
      this.sound.volume -= 0.1;
      this.sound.play('sfx_birdcall');
    }
  }
}