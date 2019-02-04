var game = new Phaser.Game({
    width: 800, height: 600,
    scene: { create }
});

function makeTweenFollower(path, tickCallback) {
    return {
        vec: new Phaser.Math.Vector2(),
        get t() { return 0 },
        set t(val) {
            path.getPoint(val, this.vec);
            tickCallback(this.vec.x, this.vec.y);
        }
    };
}

function create ()
{
    const s = this.add.sprite(0, 0, 'player')

    const path = new Phaser.Curves.Path(50, 500);
    path.lineTo(200, 300);
    path.ellipseTo(200, 100, 100, 250, false, 0);


    this.tweens.add({
        targets: makeTweenFollower(path, (x, y) => {
            s.x = x;
            s.y = y;
        }),
        t: 1,
        duration: 4000
    });
}