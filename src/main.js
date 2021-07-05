  let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE, keyLEFT, keyRIGHT;