//@flow

import {BaseSprite} from 'components/error-game/base-sprite';

class SheetSprite extends BaseSprite {

  constructor(sheetImg, clipRect, x, y, ctx) {
    super(sheetImg, x, y);
    this.ctx = ctx;
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  }

  update(dt) {}

  _updateBounds() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h);
  }

  _drawImage() {
    this.ctx.save();
    this.ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    this.ctx.drawImage(
      this.img,
      this.clipRect.x,
      this.clipRect.y,
      this.clipRect.w,
      this.clipRect.h,
      ~~(0.5 + -this.clipRect.w * 0.5),
      ~~(0.5 + -this.clipRect.h * 0.5),
      this.clipRect.w,
      this.clipRect.h
    );
    this.ctx.restore();
  }

  draw(resized) {
    super.draw(resized);
  }
}

export {SheetSprite};
