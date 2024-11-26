class Ball {
    constructor(r) {
        this.r = r

        this.pos_x = width / 2
        this.pos_y = height / 2
        this.vel_x = 3
        this.vel_y = 3
    }

    update() {
        this.pos_x += this.vel_x
        this.pos_y += this.vel_y
    }

    collide(horz, vert) {
        if (horz) this.vel_x *= -1
        if (vert) this.vel_y *= -1
    }

    check_collision(obj) {
        var [horz, vert] = obj.is_in_bounds(
            this.pos_x - this.r,
            this.pos_x + this.r,
            this.pos_y - this.r,
            this.pos_y + this.r
        )
        if (horz || vert) {
            this.collide(horz, vert)
            obj.collide(horz, vert)

            // update this object to gtfo
            this.update()
        }
    }

    show() {
        ellipse(this.pos_x, this.pos_y, this.r)
    }
}

