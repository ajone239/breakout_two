document.addEventListener("gesturestart", function(e) {
    e.preventDefault();
});

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    background("pink");
}

function draw() {
    // credit
    textAlign(CENTER, CENTER);
    text("Breakout", width / 2, 20);

    // handle touches
    if (touches.length == 1 || touches.length == 2) {
        for (let touch of touches) {
            handleInteraction(touch.x, touch.y)
        }
    }
}

function handleInteraction(x, y) {
    push()
    console.log("handle")
    fill(0)
    ellipse(x, y, 10, 10)
    pop()
}

function mousePressed() {
    console.log("mouse")
    handleInteraction(mouseX, mouseY)
}

function mouseDragged() {
    console.log("mouse")
    handleInteraction(mouseX, mouseY)
}
