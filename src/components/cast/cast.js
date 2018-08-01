//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isCastAvailable: state.engine.isCastAvailable,
  castAvailableTypes: state.engine.castAvailableTypes
});

@connect(
  mapStateToProps,
  null
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
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastControl
   */
  render(props: any): ?React$Element<any> {
    if (props.isCasting || (props.isCastAvailable && props.castAvailableTypes.includes('chromecast'))) {
      return h(
        'div',
        {
          class: style.controlButtonContainer
        },
        h('google-cast-launcher', {
          class: style.castButton
        })
      );
    }
  }
}

export {CastControl};
