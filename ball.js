class Ball {
    constructor(r) {
        this.r = r

        this.pos_x = width / 2
        this.pos_y = height / 2
        this.vel_x = 5
        this.vel_y = 5

        this.until_check
    }

    update() {
        this.pos_x += this.vel_x
        this.pos_y += this.vel_y

        this.until_check -= 1
    }

    collide(horz, vert) {
        if (this.until_check > 0) return

        if (horz) {
            this.vel_x *= -1
            this.until_check = 5
        }
        if (vert) {
            this.vel_y *= -1
            this.until_check = 5
        }
    }

    check_collision(obj) {
        const left = this.pos_x - this.r
        const right = this.pos_x + this.r
        const up = this.pos_y - this.r
        const down = this.pos_y + this.r

        var [horz, vert] = obj.is_in_bounds(left, right, up, down)


        if (horz || vert) {
            this.collide(horz, vert)
            obj.collide(horz, vert)

            // update this object to gtfo
            this.update()
        }
    }

    show() {
        circle(this.pos_x, this.pos_y, this.r * 2)
    }
}

