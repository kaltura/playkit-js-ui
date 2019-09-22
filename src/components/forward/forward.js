//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {withAnimation} from '../../utils/with-animation';
import {withPlayer} from '../player';

const COMPONENT_NAME = 'Forward';

/**
 * Default forward step
 * @type {number}
 * @const
 */
export const FORWARD_DEFAULT_STEP = 10;

@withPlayer
/**
 * Forward component
 *
 * @class Forward
 * @example <Forward step={5} />
 * @extends {BaseComponent}
 */
class Forward extends BaseComponent {
  /**
   * Creates an instance of Forward.
   * @memberof Forward
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * forward click handler
   *
   * @returns {void}
   * @memberof Forward
   */
  onClick(): void {
    const {player} = this.props;
    this.props.animate();
    let to;
    const step = this.props.step || FORWARD_DEFAULT_STEP;
    const from = player.currentTime;
    if (player.currentTime + step > player.duration) {
      to = player.duration;
    } else {
      to = player.currentTime + step;
    }
    player.currentTime = to;
    this.notifyClick({
      from: from,
      to: to
    });
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
            className={`${style.controlButton}`}
            ref={this.props.innerRef}
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

const animateForward = withAnimation(Forward, style.reverseRotate);
export {animateForward as Forward};
