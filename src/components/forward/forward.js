//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Text, withText} from 'preact-i18n';
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
 * translates
 * @param {any} props - Props
 * @returns {Object} - The object translations
 */
const translates = (props: any) => ({
  forwardText: !props.step ? (
    <Text id={'controls.secondsForward'} fields={{seconds: FORWARD_DEFAULT_STEP}}></Text>
  ) : (
    <Text id={'controls.secondsForward'} fields={{seconds: props.step}}></Text>
  )
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
@withText(translates)
class Forward extends Component {
  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const isActive = !(this.props.isLive && !this.props.isDvr);
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }
  /**
   * forward click handler
   *
   * @returns {void}
   * @memberof Forward
   */
  onClick = (): void => {
    const {player} = this.props;
    this.props.animate();
    let to;
    const step = this.props.step || FORWARD_DEFAULT_STEP;
    const from = player.currentTime;
    const duration = player.isLive() ? player.liveDuration : player.duration;
    if (player.currentTime + step > duration) {
      // if user is already on live edge then dont even attempt to move forward in time
      if (!player.isOnLiveEdge()) {
        to = duration;
      }
    } else {
      to = player.currentTime + step;
    }
    player.currentTime = to;
    this.props.notifyClick({
      from: from,
      to: to
    });
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Forward
   */
  render({step, forwardText, innerRef}: any): React$Element<any> | void {
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={style.noIdleControl}>
        <Tooltip label={forwardText}>
          <Button tabIndex="0" aria-label={forwardText} className={`${style.controlButton}`} ref={innerRef} onClick={this.onClick}>
            <Icon type={!step || step === FORWARD_DEFAULT_STEP ? IconType.Forward10 : IconType.Forward} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Forward.displayName = COMPONENT_NAME;
export {Forward};
