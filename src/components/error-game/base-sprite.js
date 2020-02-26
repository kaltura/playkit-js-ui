//@flow
import {Point2D} from 'components/error-game/point2d';
import {Rect} from 'components/error-game/rect';

class BaseSprite {
  img: any;
  constructor(img, x, y, ctx) {
    this.ctx = ctx;
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
  }

  update(dt) {}

  _updateBounds() {
    this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  }

  _drawImage() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y);
  }

  draw() {
    this._updateBounds();
    this._drawImage();
  }
}

export {BaseSprite};
