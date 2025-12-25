import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {Text, withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {withAnimation} from '../../utils/with-animation';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';
import {connect} from 'react-redux';
import {ButtonControl} from '../button-control';

const COMPONENT_NAME = 'Rewind';

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
  rewindText: <Text id={'controls.secondsRewind'} fields={{seconds: getValidSecondsToSeek(props.secondsToSeek)}}></Text>
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
@withAnimation(style.rotate)
@withText(translates)
class Rewind extends Component<any, any> {
  private _secondsToSeek: number;

  constructor(props: any) {
    super(props);
    this._secondsToSeek = getValidSecondsToSeek(props.secondsToSeek);
  }

  /**
   * rewind click handler
   *
   * @returns {void}
   * @memberof Rewind
   */
  onClick = (): void => {
    const {player} = this.props;
    this.props.animate();
    let to;
    const from = player.currentTime;
    const basePosition = player.isLive() ? player.getStartTimeOfDvrWindow() : 0;
    if (player.currentTime - this._secondsToSeek < basePosition) {
      // In dvr when close to beginning dont rewind
      if (!this.props.isDvr) {
        to = basePosition;
      }
    } else {
      to = player.currentTime - this._secondsToSeek;
    }
    player.currentTime = to;
    this.props.notifyClick({
      from: from,
      to: to
    });
  };

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
   * get icon type based on seek seconds
   * @returns {string} - icon type
   */
  _getIconType(): string  {
    let icon = IconType.Rewind;
    if (this._secondsToSeek === 5) {
      icon = IconType.Rewind5;
    } else if (this._secondsToSeek === 10) {
      icon = IconType.Rewind10;
    }
    return icon;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Rewind
   */
  render({rewindText, innerRef}: any): VNode<any> | undefined {
    const icon = this._getIconType();
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={style.noIdleControl}>
        <Tooltip label={rewindText}>
          <Button tabIndex="0" aria-label={rewindText} className={`${style.controlButton}`} ref={innerRef} onClick={this.onClick}>
            <Icon type={icon} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Rewind.displayName = COMPONENT_NAME;
export {Rewind};
