class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    is_in_bounds(left_x, right_x, top_y, bot_y) {

        /*      top
         * l *********** r
         * e *         * i
         * f *         * g
         * t *********** h
         *    bottom     t
         */

        const this_left = this.x;
        const this_right = this.x + this.w;
        const this_top = this.y;
        const this_bot = this.y + this.h;

        /*
         * # overlap
         * this:        *----------*
         * that: *----------*
         *
         * this: *----------*
         * that:       *----------*
         *
         * # nesting
         *
         * this:     *----*
         * that: *----------*
         *
         * this: *----------*
         * that:     *----*
         *
         * # miss
         *
         * this: *----*
         * that:        *----*
         *
         * this:        *----*
         * that: *----*
         */

        const that_left_in = left_x >= this_left && left_x <= this_right
        const that_right_in = right_x <= this_right && right_x >= this_left

        const this_left_in = this_left >= left_x && this_left <= right_x
        const this_right_in = this_right <= right_x && this_left >= right_x

        return [
            ((left || right) && top && bot),
            ((top || bot) && left && right)
        ]
    }

    collide() { }

    show() {
        rect(this.x, this.y, this.w, this.h);
    }
}
