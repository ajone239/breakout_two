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

let lives = 0
let gaming

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);

    left_wall = new Rectangle(-10, -10, 10, height + 20)
    right_wall = new Rectangle(width, -10, 10, height + 20)
    top_wall = new Rectangle(-10, height * (1 / 15), width + 10, 5)
    bot_wall = new Rectangle(
        -10,
        height,
        width + 10,
        10,
        lostBall
    )

    ball = new Ball(8)

    paddle = new Rectangle(
        width * (1 / 2),
        height * (9 / 10),
        width * (1 / 6),
        height * (1 / 30)
    )

    walls = [right_wall, left_wall, top_wall, bot_wall]

    showables = [paddle, ball, right_wall, left_wall, top_wall, bot_wall]
    updateables = [ball]
    collidables = [paddle, right_wall, left_wall, top_wall, bot_wall]

    score = 0
    lives = 3
    gaming = false

    makeBricks()
}

function lostBall() {
    lives -= 1;
    noLoop();
    gaming = false;

    if (isGameOver()) {
        loseText();
        return;
    }

    ball.pos_x = width / 2
    ball.pos_y = height / 2

    ball.show()
}

function draw() {
    background("pink");

    // title
    textAlign(CENTER, CENTER);
    text("Breakout", width / 2, 20);

    text(`Lives: ${lives}`, 1 * width / 4, 20);
    text(`Score: ${score}`, 3 * width / 4, 20);

    // handle touches
    if (touches.length == 1 || touches.length == 2) {
        for (let touch of touches) {
            handleInteraction(touch.x, touch.y)
        }
    }

    for (var c of collidables.concat(bricks)) {
        ball.check_collision(c)
    }

    if (
        ball.pos_x < 0 ||
        ball.pos_y < 0 ||
        ball.pos_x > width ||
        ball.pos_y > height
    ) {
        lostBall()
    }


    for (var u of updateables) {
        u.update()
    }
    for (var s of showables.concat(bricks)) {
        s.show()
    }

    if (bricks.length == 0) {
        noLoop()
        gaming = false
        winText()
    }
}

function isGameOver() {
    return bricks.length == 0 || lives <= 0
}

function winText() {
    push()
    textSize(40)
    fill("white")
    stroke("black")
    strokeWeight(4);
    text("You Win!", width / 2, height / 2)
    pop()
}

function loseText() {
    push()
    textSize(40)
    fill("white")
    stroke("black")
    strokeWeight(4);
    text("You Lose :(", width / 2, height / 2)
    pop()
}

function makeBricks() {
    const vert_count = 4
    const horz_count = 8
    for (var i = 0; i < horz_count; i++) {
        for (var j = 0; j < vert_count; j++) {
            let x_margin = width * (1 / (horz_count * 2 + 1));
            let x_width = width * (1 / (horz_count * 2 + 1));
            let x_gap = width * (1 / (horz_count * 2 + 1));

            let y_margin = height * (3 / 30);
            let y_height = height * (1 / 45);
            let y_gap = height * (1 / 45);

            var b = new Brick(
                x_margin + (x_width * i) + (x_gap * i),
                y_margin + (y_height * j) + (y_gap * j),
                x_width,
                y_height,
                bricks,
                () => { score += 100 }
            )
            bricks.push(b)
        }
    }
}

function handleInteraction(x, y) {
    if (gaming) {
        _ = y
        paddle.x = x - (paddle.w / 2);
        return
    }

    if (isGameOver()) {
        setup()
    } else {
        ball.pos_x = width / 2
        ball.pos_y = height / 2
    }

    loop()
    gaming = true
}

function mousePressed() {
    handleInteraction(mouseX, mouseY)
}

function mouseDragged() {
    handleInteraction(mouseX, mouseY)
}
