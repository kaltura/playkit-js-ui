//@flow
import {SheetSprite} from 'components/error-game/sheet-sprite';
import {Bullet} from 'components/error-game/bullet';

class Enemy extends SheetSprite {
  clipRect: any;
  bulletImg: any;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth, canvasHeight, bulletImg, spriteSheetImg, clipRects, x, y, ctx) {
    super(spriteSheetImg, clipRects[0], x, y, ctx);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.clipRects = clipRects;
    this.bulletImg = bulletImg;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot = false;
    this.bullet = null;
  }

  toggleFrame() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = this.onFirstState ? this.clipRects[0] : this.clipRects[1];
  }

  shoot() {
    this.bullet = new Bullet(this.bulletImg, this.position.x, this.position.y + this.bounds.w / 2, -1, 500, this.ctx);
  }

  update(dt, alienDirection, alienYDown, game) {
    this.stepAccumulator += dt;

    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w / 2 + 20 && alienDirection < 0) {
        game.updateAlienLogic = true;
      }
      if (alienDirection === 1 && this.position.x > this.canvasWidth - this.bounds.w / 2 - 20) {
        game.updateAlienLogic = true;
      }
      if (this.position.y > this.canvasWidth - 50) {
        this.reset();
      }

      if (this.getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;

    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);
    } else {
      this.bullet = null;
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw(resized) {
    super.draw(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
}

export {Enemy};
