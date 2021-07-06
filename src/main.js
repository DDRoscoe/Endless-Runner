// Jalen Pastor, Ryan Palmberg, Asher Lachoff
// Game Title: Clouded Skies
// Date of Completion: 5 July, 2021
// Creative tilt: Our music, art, and parallax effect was 100% created by us.
// We found our smartphone-type layout was necessary for our vertical-scrolling
// endless runner, which we thought was a clever approach.
// We're proud of every aspect of our game, from the game's rules to it's appearance.
// A few things Jalen implemented that were new was random enemy spawn generation and
// increasing difficulty as the game progresses (this is displayed by the difficulty at the right in the UI).
// A few things Asher implemented that was new were his own created soundtrack that looped
// throughout the game, and a birdcall sound that plays when the player presses [Space], or when the player dies. 
// A few things Ryan implemented that was new were his own art,
// as well as the parallax affect with the clouds, and the death animation.

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
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR, keyM;
