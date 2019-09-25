//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/backdrop';
import {KeyMap} from '../../utils/key-map';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isCastAvailable: state.engine.isCastAvailable
});

@connect(
  mapStateToProps,
  actions
)
/**
 * CastOverlay component
 *
 * @class CastControl
 * @example <CastControl player={this.player} />
 * @extends {BaseComponent}
 */
class CastControl extends BaseComponent {
  /**
   * Creates an instance of ChromecastControl.
   * @param {Object} obj obj
   * @memberof CastControl
   */
  constructor(obj: Object) {
    super({name: 'Cast', player: obj.player});
  }

  /**
   * On click set the backdrop to visible.
   * If cast session start failed remove the backdrop.
   * @memberof CastControl
   * @returns {void}
   */
  onClick(): void {
    this.props.updateBackdropVisibility(true);
    this.eventManager.listenOnce(this.player, this.player.Event.Cast.CAST_SESSION_START_FAILED, () => this.props.updateBackdropVisibility(false));
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastControl
   */
  render(props: any): ?React$Element<any> {
    if (props.isCasting || props.isCastAvailable) {
      return (
        <div
          className={style.controlButtonContainer}
          onClick={() => this.onClick()}
          onKeyDown={e => {
            if (e.keyCode === KeyMap.ENTER) {
              this.props.updateBackdropVisibility(true);
              this.player.startCasting().catch(() => this.props.updateBackdropVisibility(false));
            }
          }}>
          <google-cast-launcher className={style.castButton} tabIndex="0" />
        </div>
      );
    }
  }
}

export {CastControl};
