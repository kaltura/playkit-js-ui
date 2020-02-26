//@flow
import {h, Component} from 'preact';
import {ParticleExplosion} from 'components/error-game/particle-explosion';
import {Enemy} from 'components/error-game/enemy';
import {Player} from 'components/error-game/player';
import {KeyMap} from 'utils/key-map';

const COMPONENT_NAME = 'ErrorGame';
const IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const SPRITE_SHEET_SRC =
  'data:image/png;base64,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';
const ALIEN_BOTTOM_ROW = [{x: 0, y: 0, w: 51, h: 34}, {x: 0, y: 102, w: 51, h: 34}];
const ALIEN_MIDDLE_ROW = [{x: 0, y: 137, w: 50, h: 33}, {x: 0, y: 170, w: 50, h: 34}];
const ALIEN_TOP_ROW = [{x: 0, y: 68, w: 50, h: 32}, {x: 0, y: 34, w: 50, h: 32}];
const ALIEN_X_MARGIN = 40;
const ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;
const TEXT_BLINK_FREQ = 500;

/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {Component}
 */
class ErrorGame extends Component {
  canvas = null;
  ctx = null;
  spriteSheetImg = null;

  lastTime = 0;
  player = null;
  aliens = [];
  particleManager: ParticleExplosion = null;
  updateAlienLogic = false;
  alienDirection = -1;
  alienYDown = 0;
  alienCount = 0;
  wave = 1;
  hasGameStarted = false;
  bulletImg;
  dirtyRects = [];
  requestAnimationFrame;
  container: HTMLElement;

  componentDidMount(): void {
    this.init();
    this.requestAnimationFrame =
      window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = this.requestAnimationFrame;
    this.animate();
    document.addEventListener('keydown', e => {
      if (e.keyCode === KeyMap.ENTER && !this.hasGameStarted) {
        this.initGame();
        this.hasGameStarted = true;
      }
    });
  }

  initGame(): void {
    this.dirtyRects = [];
    this.aliens = [];
    this.player = new Player(this.spriteSheetImg, this.bulletImg, this.container.offsetWidth, this.container.offsetHeight, this.ctx);
    this.particleManager = new ParticleExplosion(this.ctx);
    this.setupAlienFormation();
    this.drawBottomHud();
  }

  animate() {
    let now = window.performance.now();
    let dt = now - this.lastTime;
    if (dt > 100) dt = 100;

    if (this.hasGameStarted) {
      this.updateGame(dt / 1000);
    }

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.container.offsetWidth, this.container.offsetHeight);
    if (this.hasGameStarted) {
      this.drawGame(false);
    } else {
      this.drawStartScreen();
    }
    this.lastTime = now;
    this.requestAnimationFrame.call(window, () => {
      this.animate();
    });
  }

  drawAliens(resized) {
    for (let i = 0; i < this.aliens.length; i++) {
      let alien = this.aliens[i];
      alien.draw(resized);
    }
  }

  drawGame(resized) {
    this.player.draw(resized);
    this.drawAliens(resized);
    this.particleManager.draw();
    this.drawBottomHud();
  }
  drawStartScreen() {
    this.fillCenteredText('Space Invaders', this.container.offsetWidth / 2, this.container.offsetHeight / 2.75, '#FFFFFF', 26);
    this.fillBlinkingText('Press enter to play!', this.container.offsetWidth / 2, this.container.offsetHeight / 2.75 + 50, 500, '#FFFFFF', 26);
  }

  drawBottomHud() {
    this.ctx.fillStyle = '#02ff12';
    this.ctx.fillRect(0, this.container.offsetHeight - 30, this.container.offsetWidth, 2);
    this.fillText(this.player.lives + ' x ', 10, this.container.offsetHeight - 7.5, 'white', 20);
    this.ctx.drawImage(
      this.spriteSheetImg,
      this.player.clipRect.x,
      this.player.clipRect.y,
      this.player.clipRect.w,
      this.player.clipRect.h,
      45,
      this.container.offsetHeight - 23,
      this.player.clipRect.w * 1 * 0.5,
      this.player.clipRect.h * 1.6 * 0.5
    );
    this.fillText('CREDIT: ', this.container.offsetWidth - 115, this.container.offsetHeight - 7.5);
    this.fillCenteredText('SCORE: ' + this.player.score, this.container.offsetWidth / 2, 40);
    this.fillBlinkingText('00', this.container.offsetWidth - 15, this.container.offsetHeight - 7.5, TEXT_BLINK_FREQ);
  }

  fillText(text, x, y, color, fontSize) {
    if (typeof color !== 'undefined') this.ctx.fillStyle = color;
    if (typeof fontSize !== 'undefined') this.ctx.font = fontSize + 'px Play';
    this.ctx.fillText(text, x, y);
  }

  fillCenteredText(text, x, y, color, fontSize) {
    var metrics = this.ctx.measureText(text);
    this.fillText(text, x - metrics.width / 2, y, color, fontSize);
  }

  fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
    if (~~(0.5 + Date.now() / blinkFreq) % 2) {
      this.fillCenteredText(text, x, y, color, fontSize);
    }
  }

  /**
   * render main state
   *
   * @returns {?React$Element} - main state element
   * @memberof ErrorOverlay
   */
  render(): ?React$Element<any> {
    return (
      <div
        style="height: 100%; width: 100%; margin-top: 10px"
        ref={el => {
          this.container = el;
        }}>
        <canvas id="game-canvas" />;
      </div>
    );
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  valueInRange(value, min, max) {
    return value <= max && value >= min;
  }

  checkRectCollision(A, B) {
    var xOverlap = this.valueInRange(A.x, B.x, B.x + B.w) || this.valueInRange(B.x, A.x, A.x + A.w);
    var yOverlap = this.valueInRange(A.y, B.y, B.y + B.h) || this.valueInRange(B.y, A.y, A.y + A.h);
    return xOverlap && yOverlap;
  }

  initCanvas() {
    // create our canvas and context
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // turn off image smoothing
    this.setImageSmoothing(false);

    // create our main sprite sheet img
    this.spriteSheetImg = new Image();
    this.spriteSheetImg.src = SPRITE_SHEET_SRC;
    this.preDrawImages();

    // add event listeners and initially resize
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  init() {
    this.initCanvas();
    this.resize();
  }

  preDrawImages() {
    let bulletCanvas = this.drawIntoCanvas(4, 8, ctx => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    this.bulletImg = new Image();
    this.bulletImg.src = bulletCanvas.toDataURL();
  }

  drawIntoCanvas(width, height, drawFunc) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    drawFunc(ctx);
    return canvas;
  }

  resize() {
    // var w = this.container.offsetWidth;
    // var h = this.container.offsetHeight;

    this.canvas.setAttribute('width', this.container.offsetWidth + 'px');
    this.canvas.setAttribute('height', this.container.offsetHeight + 'px');
    //   this.canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px';
    // calculate the scale factor to keep a correct aspect ratio
    // var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
    //
    // if (IS_CHROME) {
    //   this.canvas.width = CANVAS_WIDTH * scaleFactor;
    //   this.canvas.height = CANVAS_HEIGHT * scaleFactor;
    //   this.setImageSmoothing(false);
    //   this.ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
    // } else {
    //   // resize the canvas css properties
    //   this.canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    //   this.canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px';
    // }
  }

  setImageSmoothing(value) {
    this.ctx['imageSmoothingEnabled'] = value;
    this.ctx['mozImageSmoothingEnabled'] = value;
    this.ctx['oImageSmoothingEnabled'] = value;
    this.ctx['webkitImageSmoothingEnabled'] = value;
    this.ctx['msImageSmoothingEnabled'] = value;
  }

  updateAliens(dt) {
    if (this.updateAlienLogic) {
      this.updateAlienLogic = false;
      this.alienDirection = -this.alienDirection;
      this.alienYDown = 25;
    }

    for (var i = this.aliens.length - 1; i >= 0; i--) {
      var alien = this.aliens[i];
      if (!alien.alive) {
        this.aliens.splice(i, 1);
        alien = null;
        this.alienCount--;
        if (this.alienCount < 1) {
          this.wave++;
          this.setupAlienFormation();
        }
        return;
      }

      alien.stepDelay = (this.alienCount * 20 - this.wave * 10) / 1000;
      if (alien.stepDelay <= 0.05) {
        alien.stepDelay = 0.05;
      }
      alien.update(dt, this.alienDirection, this.alienYDown, this);

      if (alien.doShoot) {
        alien.doShoot = false;
        alien.shoot();
      }
    }
    this.alienYDown = 0;
  }

  setupAlienFormation() {
    this.alienCount = 0;
    for (var i = 0, len = 5 * 11; i < len; i++) {
      var gridX = i % 11;
      var gridY = Math.floor(i / 11);
      var clipRects;
      switch (gridY) {
        case 0:
        case 1:
          clipRects = ALIEN_BOTTOM_ROW;
          break;
        case 2:
        case 3:
          clipRects = ALIEN_MIDDLE_ROW;
          break;
        case 4:
          clipRects = ALIEN_TOP_ROW;
          break;
      }
      this.aliens.push(
        new Enemy(
          this.container.offsetWidth,
          this.container.offsetHeight,
          this.bulletImg,
          this.spriteSheetImg,
          clipRects,
          this.container.offsetWidth / 2 - ALIEN_SQUAD_WIDTH / 2 + ALIEN_X_MARGIN / 2 + gridX * ALIEN_X_MARGIN,
          this.container.offsetHeight / 2 - gridY * 40,
          this.ctx
        )
      );
      this.alienCount++;
    }
  }

  resolveBulletEnemyCollisions() {
    var bullets = this.player.bullets;

    for (var i = 0, len = bullets.length; i < len; i++) {
      var bullet = bullets[i];
      for (var j = 0, alen = this.aliens.length; j < alen; j++) {
        var alien = this.aliens[j];
        if (this.checkRectCollision(bullet.bounds, alien.bounds)) {
          alien.alive = bullet.alive = false;
          this.particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5, 5, 3, 0.15, 50);
          this.player.score += 25;
        }
      }
    }
  }

  resolveBulletPlayerCollisions() {
    for (var i = 0, len = this.aliens.length; i < len; i++) {
      var alien = this.aliens[i];
      if (alien.bullet !== null && this.checkRectCollision(alien.bullet.bounds, this.player.bounds)) {
        if (this.player.lives === 0) {
          this.hasGameStarted = false;
        } else {
          alien.bullet.alive = false;
          this.particleManager.createExplosion(this.player.position.x, this.player.position.y, 'green', 100, 8, 8, 6, 0.001, 40);
          this.player.position.set(this.container.offsetWidth / 2, this.container.offsetHeight - 70);
          this.player.lives--;
          break;
        }
      }
    }
  }
  resolveCollisions() {
    this.resolveBulletEnemyCollisions();
    this.resolveBulletPlayerCollisions();
  }
  updateGame(dt) {
    this.player.handleInput();
    this.player.prevKeyStates = this.player.keyStates.slice();
    this.player.update(dt);
    this.updateAliens(dt);
    this.resolveCollisions();
  }
}
ErrorGame.displayName = COMPONENT_NAME;
export {ErrorGame};
