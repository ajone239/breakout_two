document.addEventListener("gesturestart", function(e) {
    e.preventDefault();
});

let paddle
let ball

let right_wall
let left_wall
let top_wall
let bot_wall

let bricks = []

let showables
let updateables
let collidables


function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);

    left_wall = new Rectangle(0, -10, 5, height + 20)
    right_wall = new Rectangle(width - 5, -10, 5, height + 20)
    top_wall = new Rectangle(-10, height * (1 / 15), width + 10, 5)
    bot_wall = new Rectangle(-10, height - 5, width + 10, 5)

    ball = new Ball(15)

    paddle = new Rectangle(
        width * (1 / 2),
        height * (9 / 10),
        width * (1 / 6),
        height * (1 / 30)
    )

    walls = [right_wall, left_wall, top_wall, bot_wall]

    showables = [ball, paddle, right_wall, left_wall, top_wall, bot_wall]
    updateables = [ball]
    collidables = [paddle, right_wall, left_wall, top_wall, bot_wall]

}

function draw() {
    background("pink");

    // title
    textAlign(CENTER, CENTER);
    text("Breakout", width / 2, 20);

    // handle touches
    if (touches.length == 1 || touches.length == 2) {
        for (let touch of touches) {
            handleInteraction(touch.x, touch.y)
        }
    }

    for (var c of collidables.concat(bricks)) {
        ball.check_collision(c)
    }
    for (var u of updateables) {
        u.update()
    }
    for (var s of showables.concat(bricks)) {
        s.show()
    }

    /*
    if (bricks.length == 0) {
        noLoop()
        text("Game over", width / 2, height / 2)
    }
    */
}

function handleInteraction(x, y) {
    _ = y
    paddle.x = x - (paddle.w / 2);
}

function mousePressed() {
    handleInteraction(mouseX, mouseY)
}

function mouseDragged() {
    handleInteraction(mouseX, mouseY)
}
