//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {IconType} from '../icon/index';
import {actions} from '../../reducers/backdrop';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {Button} from 'components/button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlaybackEnded: state.engine.isPlaybackEnded,
  prePlayback: state.engine.prePlayback,
  loading: state.loading.show,
  isCastAvailable: state.engine.isCastAvailable
});

const COMPONENT_NAME = 'CastBeforePlay';

/**
 * CastBeforePlay component
 *
 * @class CastBeforePlay
 * @example <CastBeforePlay />
 * @extends {Component}
 */
@connect(mapStateToProps, actions)
@withPlayer
@withLogger(COMPONENT_NAME)
class CastBeforePlay extends Component {
  _timeoutId: ?TimeoutID = null;

  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: Object = {
    icon: IconType.Cast
  };

  /**
   * on click call the start casting API and set connecting state.
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  onClick = (): void => {
    this.props.updateBackdropVisibility(true);
    this.props.player.startCasting(this.props.player.RemotePlayerType.CHROMECAST).catch(() => this.props.updateBackdropVisibility(false));
  };

  /**
   * after component did mount, show the cast before play button.
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  componentDidMount(): void {
    this._timeoutId = setTimeout(() => {
      this.setState({show: true});
    }, 700);
  }

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastBeforePlay
   */
  render(props: any): ?React$Element<any> {
    if (!props.isCastAvailable || props.loading) return undefined;
    if (props.prePlayback) {
      const rootStyle = [style.castOnTvButtonContainer];
      if (this.state.show) {
        rootStyle.push(style.showCastOnTv);
      }
      return (
        <div className={rootStyle.join(' ')}>
          <Localizer>
            <Button
              tabIndex="0"
              aria-label={<Text id={'cast.play_on_tv'} />}
              onClick={this.onClick}
              className={[style.btn, style.btnDarkTransparent, style.castOnTvButton].join(' ')}>
              <div className={style.castOnTvIconContainer}>
                <Icon type={props.icon} />
              </div>
              <span>
                <Text id="cast.play_on_tv" />
              </span>
            </Button>
          </Localizer>
        </div>
      );
    }
  }
}

CastBeforePlay.displayName = COMPONENT_NAME;
export {CastBeforePlay};
