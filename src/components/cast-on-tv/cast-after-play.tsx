import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from '../logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlaybackEnded: state.engine.isPlaybackEnded,
  isCasting: state.engine.isCasting
});

const COMPONENT_NAME = 'CastAfterPlay';

/**
 * CastAfterPlay component
 *
 * @class CastAfterPlay
 * @example <CastAfterPlay />
 * @extends {Component}
 */
@connect(mapStateToProps, null)
@withPlayer
@withLogger(COMPONENT_NAME)
class CastAfterPlay extends Component<any, any> {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: Object = {
    icon: IconType.CastBrand
  };

  _timeoutId: number | null = null;
  /**
   * on click call the stop casting API.
   *
   * @param {Event} e - click event
   * @returns {void}
   * @memberof CastAfterPlay
   */
  onClick = (e: Event): void => {
    e.stopPropagation();
    this.props.player.stopCasting();
  };

  /**
   * after component did mount, show the cast after play button.
   *
   * @returns {void}
   * @memberof CastAfterPlay
   */
  componentDidMount(): void {
    // @ts-ignore
    this._timeoutId = setTimeout(() => {
      this.setState({show: true});
    }, 700);
  }

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof CastAfterPlay
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
   * @memberof CastAfterPlay
   */
  render(props: any): VNode<any> | undefined {
    if (!props.isCasting || !props.isPlaybackEnded) return undefined;
    const rootStyle = [style.castOnTvButtonContainer];
    if (this.state.show) {
      rootStyle.push(style.showCastOnTv);
    }
    return (
      <div>
        <div className={rootStyle.join(' ')} onClick={this.onClick}>
          <a className={[style.btn, style.btnDarkTransparent, style.castOnTvButton].join(' ')}>
            <div className={style.castOnTvIconContainer}>
              <Icon type={props.icon} />
            </div>
            <Localizer>
              <span>
                <Text id="cast.disconnect_from_tv" />
              </span>
            </Localizer>
          </a>
        </div>
      </div>
    );
  }
}

CastAfterPlay.displayName = COMPONENT_NAME;
export {CastAfterPlay};
