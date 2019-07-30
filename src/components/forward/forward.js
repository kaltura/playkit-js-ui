//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';

/**
 * Default forward step
 * @type {number}
 * @const
 */
export const FORWARD_DEFAULT_STEP = 10;

/**
 * ForwardControl component
 *
 * @class ForwardControl
 * @example <ForwardControl player={this.player} step={5} />
 * @extends {BaseComponent}
 */
class ForwardControl extends BaseComponent {
  /**
   * Creates an instance of ForwardControl.
   * @param {Object} obj obj
   * @memberof ForwardControl
   */
  constructor(obj: Object) {
    super({name: 'Forward', player: obj.player});
  }

  /**
   * forward click handler
   *
   * @returns {void}
   * @memberof ForwardControl
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
   * @memberof ForwardControl
   */
  animate(): void {
    this.setState({animation: false});
    this.forceUpdate();
    this.setState({animation: true});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof ForwardControl
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.noIdleControl].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.forward'} />}
            className={`${style.controlButton} ${this.state.animation ? style.reverseRotate : ''}`}
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

export {ForwardControl};
