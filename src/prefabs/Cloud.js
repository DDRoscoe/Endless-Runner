class Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.cloudMoveSpeed;        // pixels per frame
    }

    update() {
        this.y += this.moveSpeed;       // move down
        // wrap around from bottom to top
        if (this.y >= game.config.height) {
            this.y = 0;
        }
    }
}