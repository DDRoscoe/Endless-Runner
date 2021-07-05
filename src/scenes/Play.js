class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
      // load images and tile sprites
      this.load.image('bird', './assets/bird.png');
      this.load.image('background', './assets/background.png');

      // add bird collision animation here
  }

  create() {
    // place tile sprite
    this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
  }

  update() {
    this.background.tilePositionY -= 1;
  }
}