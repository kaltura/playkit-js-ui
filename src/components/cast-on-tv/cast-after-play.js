//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isEnded: state.engine.isEnded,
  isCasting: state.engine.isCasting
});

@connect(
  mapStateToProps,
  null
)
/**
 * CastAfterPlay component
 *
 * @class CastAfterPlay
 * @example <CastAfterPlay player={this.player} />
 * @extends {BaseComponent}
 */
class CastAfterPlay extends BaseComponent {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: Object = {
    icon: IconType.CastBrand
  };

  /**
   * Creates an instance of CastOverlay.
   * @param {Object} obj obj
   * @memberof CastAfterPlay
   */
  constructor(obj: Object) {
    super({name: 'CastAfterPlay', player: obj.player});
  }

  /**
   * on click call the stop casting API.
   *
   * @param {Event} e - click event
   * @returns {void}
   * @memberof CastAfterPlay
   */
  onClick(e: Event): void {
    e.stopPropagation();
    this.player.stopCasting();
  }

  /**
   * after component did mount, show the cast after play button.
   *
   * @returns {void}
   * @memberof CastAfterPlay
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
   * @memberof CastAfterPlay
   */
  render(props: any): ?React$Element<any> {
    if (!props.isCasting || !props.isEnded) return undefined;
    const rootStyle = [style.castOnTvButtonContainer];
    if (this.state.show) {
      rootStyle.push(style.showCastOnTv);
    }
    return (
      <div>
        <div className={rootStyle.join(' ')} onClick={e => this.onClick(e)}>
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

export {CastAfterPlay};
