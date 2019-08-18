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

const COMPONENT_NAME = 'Cast';

@connect(
  mapStateToProps,
  actions
)
/**
 * Cast component
 *
 * @class Cast
 * @example <Cast player={this.player} />
 * @extends {BaseComponent}
 */
class Cast extends BaseComponent {
  /**
   * Creates an instance of ChromecastControl.
   * @param {Object} obj obj
   * @memberof Cast
   */
  constructor(obj: Object) {
    super({name: COMPONENT_NAME, player: obj.player});
  }

  /**
   * On click set the backdrop to visible.
   * If cast session start failed remove the backdrop.
   * @memberof Cast
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
   * @memberof Cast
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

Cast.displayName = COMPONENT_NAME;
export {Cast};
