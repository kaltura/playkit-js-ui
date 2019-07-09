//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/backdrop';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isCastAvailable: state.engine.isCastAvailable
});

/**
 * CastOverlay component
 *
 * @class CastControl
 * @example <CastControl player={this.player} />
 * @extends {BaseComponent}
 */
@connect(
  mapStateToProps,
  actions
)
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
      return h(
        'div',
        {
          class: style.controlButtonContainer,
          onClick: () => this.onClick()
        },
        h('google-cast-launcher', {
          class: style.castButton
        })
      );
    }
  }
}

export {CastControl};
