//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {withAnimation} from '../../utils/with-animation';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {Tooltip} from 'components/tooltip';

const COMPONENT_NAME = 'Rewind';

/**
 * Default rewind step
 * @type {number}
 * @const
 */
export const REWIND_DEFAULT_STEP = 10;

@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withAnimation(style.rotate)
@withText({rewindText: 'controls.rewind'})
/**
 * Rewind component
 *
 * @class Rewind
 * @example <Rewind step={5} />
 * @extends {Component}
 */
class Rewind extends Component {
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
    this.props.notifyClick({
      from: from,
      to: to
    });
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
        <Tooltip label={this.props.rewindText}>
          <button
            type={'button'}
            tabIndex="0"
            aria-label={this.props.rewindText}
            className={`${style.controlButton}`}
            ref={this.props.innerRef}
            onClick={() => this.onClick()}>
            <Icon type={!props.step || props.step === REWIND_DEFAULT_STEP ? IconType.Rewind10 : IconType.Rewind} />
          </button>
        </Tooltip>
      </div>
    );
  }
}

Rewind.displayName = COMPONENT_NAME;
export {Rewind};
