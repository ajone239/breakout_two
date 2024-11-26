class Player extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.vel_x = 0;
    }

    update() {
        this.x += this.vel_x
    }

    go(lor) {
        this.vel_x = lor ? -5 : 5
    }

    stop() {
        this.vel_x = 0
    }

    set_pos(pos) {
        this.vel_x = 0
        this.x = pos - (this.w / 2)
    }
}
