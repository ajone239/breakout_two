document.addEventListener("gesturestart", function(e) {
    e.preventDefault();
});

let paddle;

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);

    paddle = new Rectangle(
        width * (1 / 2),
        height * (9 / 10),
        width * (1 / 6),
        height * (1 / 25)
    )
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

    paddle.show()
}

function handleInteraction(x, y) {
    _ = y
    paddle.x = x - (paddle.w / 2);
}

function mousePressed() {
    console.log("mouse")
    handleInteraction(mouseX, mouseY)
}

function mouseDragged() {
    console.log("mouse")
    handleInteraction(mouseX, mouseY)
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        rect(this.x, this.y, this.w, this.h)
    }
}
