var config = {
    scene: {
        create,
        update
    }
};

var game = new Phaser.Game(config);
var s, path;
var pos = new Phaser.Math.Vector2();


function create ()
{
    s = this.add.sprite(0, 0, 'player')

    path = new Phaser.Curves.Path(50, 500);
    path.lineTo(200, 300);
    path.ellipseTo(200, 100, 100, 250, false, 0);
}

function update (t, dt)
{
    path.getPoint(Math.sin(t / 500) / 2 + .5, pos)
    s.x = pos.x; s.y = pos.y;
}
