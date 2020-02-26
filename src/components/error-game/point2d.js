//@flow
class Point2D {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = typeof x === 'undefined' ? 0 : x;
    this.y = typeof y === 'undefined' ? 0 : y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
export {Point2D};
