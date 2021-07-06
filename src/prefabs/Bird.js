class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        // vertical and horizontal movement
        if (keyLEFT.isDown && this.x >= borderPadding) {
            this.x -= this.moveSpeed;
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderPadding) {
            this.x += this.moveSpeed;
        }
        else if (keyUP.isDown && this.y >= game.config.height / 2) {
            this.y -= this.moveSpeed;
        }
        else if (keyDOWN.isDown && this.y <= game.config.height - UISize - 45) {
            this.y += this.moveSpeed;
        }
    }
}