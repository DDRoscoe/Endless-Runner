  let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let UISize = game.config.height / 5;
let borderPadding = game.config.width / 10;
let borderSize = game.config.width / 25;

// reserve keyboard vars
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN;