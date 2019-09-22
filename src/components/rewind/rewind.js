//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {withAnimation} from '../../utils/with-animation';
import {withPlayer} from '../player';

const COMPONENT_NAME = 'Rewind';

/**
 * Default rewind step
 * @type {number}
 * @const
 */
export const REWIND_DEFAULT_STEP = 10;

@withPlayer
/**
 * Rewind component
 *
 * @class Rewind
 * @example <Rewind step={5} />
 * @extends {BaseComponent}
 */
class Rewind extends BaseComponent {
  /**
   * Creates an instance of Rewind.
   * @memberof Rewind
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * rewind click handler
   *
   * @returns {void}
   * @memberof Rewind
   */
  onClick(): void {
    this.props.animate();
    let to;
    const step = this.props.step || REWIND_DEFAULT_STEP;
    const from = this.props.player.currentTime;
    if (this.props.player.currentTime - step < 0) {
      to = 0;
    } else {
      to = this.props.player.currentTime - step;
    }
    this.props.player.currentTime = to;
    this.notifyClick({
      from: from,
      to: to
    });
  }

  /**
   * toggles the animation state to activate the rotate animation
   *
   * @returns {void}
   * @memberof Rewind
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
   * @memberof Rewind
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.noIdleControl].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.rewind'} />}
            className={`${style.controlButton}`}
            ref={this.props.innerRef}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={!props.step || props.step === REWIND_DEFAULT_STEP ? IconType.Rewind10 : IconType.Rewind} />
          </button>
        </Localizer>
      </div>
    );
  }
}

Rewind.displayName = COMPONENT_NAME;

const animateRewind = withAnimation(Rewind, style.rotate);
export {animateRewind as Rewind};
