import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';
import {withLogger} from '../logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  poster: state.engine.poster,
  castSession: state.engine.castSession,
  isIdle: state.engine.isIdle,
  isPlaying: state.engine.isPlaying,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  isPaused: state.engine.isPaused,
  isChangingSource: state.engine.isChangingSource
});

const COMPONENT_NAME = 'CastOverlay';

/**
 * CastOverlay component
 *
 * @class CastOverlay
 * @example <CastOverlay />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withLogger(COMPONENT_NAME)
class CastOverlay extends Component<any, any> {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: any = {
    icon: IconType.Cast
  };

  /**
   * Gets the cast status.
   * @returns {React$Element} - The text status string.
   * @memberof CastOverlay
   */
  getStatus(): VNode<any> {
    if (this.props.isPlaying || this.props.isPaused) {
      return <Text id="cast.status.playing_on" />;
    }
    if (this.props.isPlaybackEnded || this.props.isChangingSource || this.props.castSession.resuming) {
      return <Text id="cast.status.connected_to" />;
    }
    return <Text id="cast.status.connecting_to" />;
  }

  /**
   * Gets the cast icon next to the status.
   * @returns {React$Element} - The cast icon.
   * @memberof CastOverlay
   */
  getIcon(): VNode<any> {
    if (this.props.isPlaying || this.props.isPaused || this.props.isPlaybackEnded || this.props.isChangingSource || this.props.castSession.resuming) {
      return <Icon type={this.props.icon} />;
    }
    return <div className={style.castConnectingSpinner} />;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastOverlay
   */
  render(props: any): VNode<any> | undefined {
    if (!props.castSession) return undefined;

    let posterStyle = {};
    const posterClasses = [style.castPoster];
    if (props.poster) {
      const backgroundImage = props.isChangingSource ? '' : `url(${props.poster})`;
      posterStyle = {
        backgroundImage: backgroundImage,
        backgroundSize: 'contain'
      };
      posterClasses.push(style.hasPoster);
    }

    const status = this.getStatus();
    const icon = this.getIcon();

    return (
      <div>
        <div className={style.castOverlay}>
          <div className={posterClasses.join(' ')} style={posterStyle} onMouseOver={e => e.stopPropagation()} />
          <div className={style.castBlackCover} />
        </div>
        <div className={style.castBox}>
          <div className={style.castIcon}>{icon}</div>
          <div className={style.castText}>
            <Localizer>
              <span className={style.castStatus}>{status}</span>
            </Localizer>
            <br />
            <span className={style.castDevice}>{props.castSession.deviceFriendlyName}</span>
          </div>
        </div>
      </div>
    );
  }
}

CastOverlay.displayName = COMPONENT_NAME;
export {CastOverlay};
