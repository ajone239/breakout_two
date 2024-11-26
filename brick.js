class Brick extends Rectangle {
  constructor(x, y, w, h, arr) {
    super(x, y, w, h)
    this.arr = arr
  }

  collide() {
    for (var i = 0; i < this.arr.length; i++) {
      const b = this.arr[i]
      if (Object.is(b, this)) {
        this.arr.splice(i, 1)
        return
      }
    }
  }
}
