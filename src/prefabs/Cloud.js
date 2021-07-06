class Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = 1.2;        // pixels per frame
    }

    update() {
        this.y += this.moveSpeed;       // move down
    }

    reset () {
        this.moveSpeed += 0.3;
        let ranX = Phaser.Math.Between(50, game.config.width - 50)
        let ranY = Phaser.Math.Between(-50, -500)
        this.x = ranX;
        this.y = ranY;
    }
}