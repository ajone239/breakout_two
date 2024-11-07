document.addEventListener("gesturestart", function(e) {
  e.preventDefault();
});

let sprite_x;
let sprite_y;
const sprite_size = 50;
let joystick_center_x;
let joystick_center_y;
let joystick_radius;

const max_jump_height = 30;
let current_jump_height = 0;
let moving_vertically = false;

function setup() {
  createCanvas(document.body.clientWidth, document.body.clientHeight);
  sprite_x = 50;
  sprite_y = 50;
  joystick_center_x = width / 2;
  joystick_center_y = (height / 4) * 3;
  joystick_radius = height / 4;
}
function draw() {
  moving_vertically = false;

  background("grey");

  // credit
  textAlign(CENTER, CENTER);
  text("p5.js Simple Joystick by ffmaer", width / 2, 20);

  // draw joy stick interface
  push();
  translate(joystick_center_x, joystick_center_y);
  rotate(QUARTER_PI);
  line(-joystick_radius, 0, joystick_radius, 0);
  rotate(HALF_PI);
  line(-joystick_radius, 0, joystick_radius, 0);
  noFill();
  circle(0, 0, joystick_radius * 2);
  pop();

  // handle touches
  if (touches.length == 1 || touches.length == 2) {
    for (let touch of touches) {
      aTouch(touch.x, touch.y);
    }
  }

  // jump animation
  if (moving_vertically) {
    current_jump_height = 0;
  }

  if (current_jump_height > 0) {
    if (current_jump_height > max_jump_height / 2) {
      sprite_y--;
    } else {
      sprite_y++;
    }
    current_jump_height--;
  }

  // the sprite
  square(sprite_x, sprite_y, sprite_size);
  text(">_<", sprite_x + sprite_size / 2, sprite_y + sprite_size / 2);
}

function aTouch(touch_x, touch_y) {
  let deg;

  // calculate joystick rotation degrees
  push();
  translate(joystick_center_x, joystick_center_y);
  deg = floor(degrees(atan2(touch_y - joystick_center_y, touch_x - joystick_center_x)));
  pop();

  if (dist(joystick_center_x, joystick_center_y, touch_x, touch_y) < joystick_radius) {
    if (deg > -135 && deg < -45) {
      sprite_y--;
      moving_vertically = true;
    } else if (deg < 135 && deg > 45) {
      sprite_y++;
      moving_vertically = true;
    } else if (deg > -45 && deg < 45) {
      sprite_x++;
    } else if (deg < -135 || deg > 135) {
      sprite_x--;
    }

    // draw joystick
    push();
    fill("black");
    rectMode(CENTER);
    rect(touch_x, touch_y, 20, 20);
    line(joystick_center_x, joystick_center_y, touch_x, touch_y);
    pop();
  } else {
    jump();
  }
}

function jump() {
  if (current_jump_height == 0) {
    current_jump_height = max_jump_height;
  }
}

