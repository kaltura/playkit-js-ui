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
import {Button} from 'components/button';
import {connect} from 'react-redux';
import {controlButton} from 'utils/control-button';

const COMPONENT_NAME = 'Rewind';

/**
 * Default rewind step
 * @type {number}
 * @const
 */
export const REWIND_DEFAULT_STEP = 10;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isDvr: state.engine.isDvr,
  isLive: state.engine.isLive
});

/**
 * Rewind component
 *
 * @class Rewind
 * @example <Rewind step={5} />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@controlButton(COMPONENT_NAME)
@withAnimation(style.rotate)
@withText({rewindText: 'controls.rewind'})
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
      // In dvr when close to beginning dont rewind
      if (!this.props.isDvr) {
        to = 0;
      }
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
    if (props.isLive && !props.isDvr) {
      return undefined;
    }
    if (this.props.buttonElement) {
      this.props.buttonElement.add(style.noIdleControl);
    }
    return (
      <div>
        <Tooltip label={this.props.rewindText}>
          <Button
            tabIndex="0"
            aria-label={this.props.rewindText}
            className={`${style.controlButton}`}
            ref={this.props.innerRef}
            onClick={() => this.onClick()}>
            <Icon type={!props.step || props.step === REWIND_DEFAULT_STEP ? IconType.Rewind10 : IconType.Rewind} />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

Rewind.displayName = COMPONENT_NAME;
export {Rewind};
