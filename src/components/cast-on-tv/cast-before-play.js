//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {actions} from '../../reducers/backdrop';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';

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
/**
 * CastBeforePlay component
 *
 * @class CastBeforePlay
 * @example <CastBeforePlay />
 * @extends {BaseComponent}
 */
class CastBeforePlay extends BaseComponent {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: Object = {
    icon: IconType.Cast
  };

  /**
   * Creates an instance of CastOverlay.
   * @memberof CastBeforePlay
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

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
          <div className={rootStyle.join(' ')} onClick={() => this.onClick()}>
            <a className={[style.btn, style.btnDarkTransparent, style.castOnTvButton].join(' ')}>
              <div className={style.castOnTvIconContainer}>
                <Icon type={props.icon} />
              </div>
              <Localizer>
                <span>
                  <Text id="cast.play_on_tv" />
                </span>
              </Localizer>
            </a>
          </div>
        </div>
      );
    }
  }
}

CastBeforePlay.displayName = COMPONENT_NAME;
export {CastBeforePlay};
