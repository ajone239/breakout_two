class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.update_shape()
    }

    is_in_bounds(left_x, right_x, top_y, bot_y) {
        this.update_shape()

        const top_left = new Point(left_x, top_y);
        const top_right = new Point(right_x, top_y);
        const bot_left = new Point(left_x, bot_y);
        const bot_right = new Point(right_x, bot_y);

        const that_shape = new Shape(
            top_left,
            top_right,
            bot_left,
            bot_right,
        );

        const [horz, vert] = this.shape.is_overlap(that_shape)

        return [horz, vert]
    }

    collide() { }

    update_shape() {
        this.top_left = new Point(this.x, this.y);
        this.top_right = new Point(this.x + this.w, this.y);
        this.bot_left = new Point(this.x, this.y + this.h);
        this.bot_right = new Point(this.x + this.w, this.y + this.h);

        this.shape = new Shape(
            this.top_left,
            this.top_right,
            this.bot_left,
            this.bot_right,
        );
    }

    show() {
        rect(this.x, this.y, this.w, this.h);
    }

}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }

    is_overlap(other) {

        const x11 = this.p1.x
        const x12 = this.p2.x
        const x21 = other.p1.x
        const x22 = other.p2.x

        const y11 = this.p1.y
        const y12 = this.p2.y
        const y21 = other.p1.y
        const y22 = other.p2.y

        const x_overlap = this.overlap_internal(x11, x12, x21, x22)
        const y_overlap = this.overlap_internal(y12, y11, y22, y21)

        return [x_overlap, y_overlap]
    }

    overlap_internal(a1, a2, b1, b2) {
        const berth = Math.max(a2, b2) - Math.min(a1, b1)
        const tot_len = (a2 - a1) + (b2 - b1)

        return berth <= tot_len
    }
}

class Shape {
    constructor(ptl, ptr, pbl, pbr) {
        this.top_line = new Line(ptl, ptr)
        this.bot_line = new Line(pbl, pbr)

        this.left_line = new Line(pbl, ptl)
        this.right_line = new Line(pbr, ptr)
    }

    is_overlap(other) {
        const [horz, _] = this.top_line.is_overlap(other.top_line)

        const [_1, vert] = this.left_line.is_overlap(other.left_line)

        const collided = horz && vert

        if (!collided) {
            return [false, false];
        }

        // check for horizontal
        const [_2, top_left] = this.top_line.is_overlap(other.left_line)
        const [_3, top_right] = this.top_line.is_overlap(other.right_line)

        const [_4, bot_left] = this.bot_line.is_overlap(other.left_line)
        const [_5, bot_right] = this.bot_line.is_overlap(other.right_line)

        const horz_contact = top_left || top_right || bot_left || bot_right

        // check for vertical
        const [left_top, _6] = this.left_line.is_overlap(other.top_line)
        const [left_bot, _7] = this.left_line.is_overlap(other.bot_line)

        const [right_top, _8] = this.right_line.is_overlap(other.top_line)
        const [right_bot, _9] = this.right_line.is_overlap(other.bot_line)

        const vert_contact = left_top || left_bot || right_top || right_bot

        return [vert_contact, horz_contact]
    }
}
