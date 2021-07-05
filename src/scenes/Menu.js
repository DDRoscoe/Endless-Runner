class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    preload() {
      // load audio
      this.load.audio('music', './assets/music.wav');
    }
  
  
    create() {
      let menuConfig = {
        fontFamily: 'Georgia',
        fontSize: '16px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0   
      }
  
      // show menu text
      this.add.text(game.config.width/2, game.config.height/3 , 'CLOUDED SKIES', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2.5, 'Use <--> arrows to move', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2, 'Press Space to begin', menuConfig).setOrigin(0.5);
  
      // define keys
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
  
    update() {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        this.sound.play('music');
        this.scene.start('playScene');
      }
    }
}