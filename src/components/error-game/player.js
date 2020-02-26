//@flow
import {SheetSprite} from 'components/error-game/sheet-sprite';
import {Bullet} from 'components/error-game/bullet';
const PLAYER_CLIP_RECT = {x: 0, y: 204, w: 62, h: 32};
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const SHOOT_KEY = 88;

class Player extends SheetSprite {
  keyStates = null;
  prevKeyStates = null;
  canvasWidth: number;
  canvasHeight: number;
  bulletImg: any;

  constructor(spriteSheetImg, bulletImg, canvasWidth, canvasHeight, ctx) {
    super(spriteSheetImg, PLAYER_CLIP_RECT, canvasWidth / 2, canvasHeight - 70, ctx);
    this.bulletImg = bulletImg;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.keyStates = [];
    this.prevKeyStates = [];
    document.addEventListener('keydown', e => {
      this.onKeyDown(e);
    });
    document.addEventListener('keyup', e => {
      this.onKeyUp(e);
    });
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.scale.set(1, 1.6);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  }

  onKeyDown(e) {
    e.preventDefault();
    this.keyStates[e.keyCode] = true;
  }
  onKeyUp(e) {
    e.preventDefault();
    this.keyStates[e.keyCode] = false;
  }

  reset() {
    this.lives = 3;
    this.score = 0;
    this.position.set(this.canvasWidth / 2, this.canvasHeight - 50);
  }

  shoot() {
    var bullet = new Bullet(this.bulletImg, this.position.x, this.position.y - this.bounds.h / 2, 1, 500, this.ctx);
    this.bullets.push(bullet);
  }

  isKeyDown(key) {
    return this.keyStates[key];
  }

  wasKeyPressed(key) {
    return !this.prevKeyStates[key] && this.keyStates[key];
  }

  handleInput() {
    if (this.isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (this.isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;

    if (this.wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot();
        this.bulletDelayAccumulator = 0;
      }
    }
  }

  updateBullets(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  update(dt) {
    // update time passed between shots
    this.bulletDelayAccumulator += dt;

    // apply x vel
    this.position.x += this.xVel * dt;

    // cap player position in screen bounds
    this.position.x = this.clamp(this.position.x, this.bounds.w / 2, this.canvasWidth - this.bounds.w / 2);
    this.updateBullets(dt);
  }

  draw(resized) {
    super.draw(resized);

    // draw bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
}

export {Player};
