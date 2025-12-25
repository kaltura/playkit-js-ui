import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {Text, withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {withAnimation} from '../../utils/with-animation';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../../components/event-dispatcher';
import {withLogger} from '../../components/logger';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../../components/button';
import {connect} from 'react-redux';
import {ButtonControl} from '../../components/button-control';

const COMPONENT_NAME = 'Forward';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isDvr: state.engine.isDvr,
  isLive: state.engine.isLive,
  secondsToSeek: state.config.seekSeconds
});

/**
* checking if value is valid number
* @param {any} value - value to check
* @returns {number}
*/
const getValidSecondsToSeek = (value: any): number => {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value;
  } else {
    return 10;
  }
}

/**
 * translates
 * @param {any} props - Props
 * @returns {Object} - The object translations
 */
const translates = (props: any) => ({
  forwardText: <Text id={'controls.secondsForward'} fields={{seconds: getValidSecondsToSeek(props.secondsToSeek)}}></Text>
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
class Forward extends Component<any, any> {
  private _secondsToSeek: number;

  constructor(props: any) {
    super(props);
    this._secondsToSeek = getValidSecondsToSeek(props.secondsToSeek);
  }

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
    const from = player.currentTime;
    const duration = player.isLive() ? player.liveDuration : player.duration;
    if (player.currentTime + this._secondsToSeek > duration) {
      // if user is already on live edge then dont even attempt to move forward in time
      if (!player.isOnLiveEdge()) {
        to = duration;
      }
    } else {
      to = player.currentTime + this._secondsToSeek;
    }
    player.currentTime = to;
    this.props.notifyClick({
      from: from,
      to: to
    });
  };

    /**
     * get icon type based on seek seconds
     * @returns {string} - icon type
     */
    _getIconType(): string  {
      let icon = IconType.Forward;
      if (this._secondsToSeek === 5) {
        icon = IconType.Forward5;
      } else if (this._secondsToSeek === 10) {
        icon = IconType.Forward10;
      }
      return icon;
    }ד

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Forward
   */
  render({forwardText, innerRef}: any): VNode<any> | undefined {
    const icon = this._getIconType();
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={style.noIdleControl}>
        <Tooltip label={forwardText}>
          <Button tabIndex="0" aria-label={forwardText} className={`${style.controlButton}`} ref={innerRef} onClick={this.onClick}>
            <Icon type={icon} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Forward.displayName = COMPONENT_NAME;
export {Forward};
