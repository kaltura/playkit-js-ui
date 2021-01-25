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
import {ButtonControl} from 'components/button-control';

const COMPONENT_NAME = 'Forward';

/**
 * Default forward step
 * @type {number}
 * @const
 */
export const FORWARD_DEFAULT_STEP = 10;

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
 * Forward component
 *
 * @class Forward
 * @example <Forward step={5} />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withAnimation(style.reverseRotate)
@withText({forwardText: 'controls.forward'})
class Forward extends Component {
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
      // if user is already on live edge then dont even attempt to move forward in time
      if (!player.isOnLiveEdge()) {
        to = player.duration;
      }
    } else {
      to = player.currentTime + step;
    }
    player.currentTime = to;
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
   * @memberof Forward
   */
  render(props: any): React$Element<any> | void {
    return props.isLive && !props.isDvr ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={style.noIdleControl}>
        <Tooltip label={this.props.forwardText}>
          <Button
            tabIndex="0"
            aria-label={this.props.forwardText}
            className={`${style.controlButton}`}
            ref={this.props.innerRef}
            onClick={() => this.onClick()}>
            <Icon type={!props.step || props.step === FORWARD_DEFAULT_STEP ? IconType.Forward10 : IconType.Forward} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Forward.displayName = COMPONENT_NAME;
export {Forward};
