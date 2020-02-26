//@flow
import {BaseSprite} from 'components/error-game/base-sprite';

class Bullet extends BaseSprite {
  bulletImg = null;

  constructor(bulletImg, x, y, direction, speed, ctx) {
    super(bulletImg, x, y, ctx);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  }

  update(dt) {
    this.position.y -= this.speed * this.direction * dt;

    if (this.position.y < 0) {
      this.alive = false;
    }
  }

  draw(resized) {
    super.draw(resized);
  }
}

export {Bullet};
