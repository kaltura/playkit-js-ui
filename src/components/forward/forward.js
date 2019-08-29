//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';

const COMPONENT_NAME = 'Forward';

/**
 * Default forward step
 * @type {number}
 * @const
 */
export const FORWARD_DEFAULT_STEP = 10;

/**
 * Forward component
 *
 * @class Forward
 * @example <Forward player={this.player} step={5} />
 * @extends {BaseComponent}
 */
class Forward extends BaseComponent {
  _button: HTMLButtonElement;

  /**
   * Creates an instance of Forward.
   * @param {Object} obj obj
   * @memberof Forward
   */
  constructor(obj: Object) {
    super({name: COMPONENT_NAME, player: obj.player});
  }

  /**
   * forward click handler
   *
   * @returns {void}
   * @memberof Forward
   */
  onClick(): void {
    this.animate();
    let to;
    const step = this.props.step || FORWARD_DEFAULT_STEP;
    const from = this.player.currentTime;
    if (this.player.currentTime + step > this.player.duration) {
      to = this.player.duration;
    } else {
      to = this.player.currentTime + step;
    }
    this.player.currentTime = to;
    this.notifyClick({
      from: from,
      to: to
    });
  }

  /**
   * toggles the animation state to activate the rotate animation
   *
   * @returns {void}
   * @memberof Forward
   */
  animate(): void {
    this._button.className = `${style.controlButton}`;
    window.scrollX; // trigger reflow
    this._button.className = `${style.controlButton} ${style.reverseRotate}`;
  }

  /**
   * after component mounted, set initial class
   *
   * @returns {void}
   * @memberof Forward
   */
  componentDidMount() {
    this._button.className = [style.controlButton];
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Forward
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.noIdleControl].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.forward'} />}
            ref={c => (this._button = c)}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={!props.step || props.step === FORWARD_DEFAULT_STEP ? IconType.Forward10 : IconType.Forward} />
          </button>
        </Localizer>
      </div>
    );
  }
}

Forward.displayName = COMPONENT_NAME;

export {Forward};
