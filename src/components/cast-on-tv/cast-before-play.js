//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {actions} from '../../reducers/backdrop';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';
import {KeyMap} from '../../utils/key-map';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

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

@connect(
  mapStateToProps,
  actions
)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * CastBeforePlay component
 *
 * @class CastBeforePlay
 * @example <CastBeforePlay />
 * @extends {Component}
 */
class CastBeforePlay extends Component {
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
  onClick(): void {
    this.props.updateBackdropVisibility(true);
    this.props.player.startCasting().catch(() => this.props.updateBackdropVisibility(false));
  }

  /**
   * after component did mount, show the cast before play button.
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({show: true});
    }, 700);
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
        <div>
          <div className={rootStyle.join(' ')}>
            <Localizer>
              <button
                tabIndex="0"
                aria-label={<Text id={'cast.play_on_tv'} />}
                onClick={() => this.onClick()}
                onKeyDown={e => {
                  if (e.keyCode === KeyMap.ENTER) {
                    this.onClick();
                  }
                }}
                className={[style.btn, style.btnDarkTransparent, style.castOnTvButton].join(' ')}>
                <div className={style.castOnTvIconContainer}>
                  <Icon type={props.icon} />
                </div>
                <span>
                  <Text id="cast.play_on_tv" />
                </span>
              </button>
            </Localizer>
          </div>
        </div>
      );
    }
  }
}

CastBeforePlay.displayName = COMPONENT_NAME;
export {CastBeforePlay};
