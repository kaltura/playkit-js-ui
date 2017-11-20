//@flow
import style from './_error-overlay.scss';
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import Overlay from '../overlay';
import Portal from 'preact-portal';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  error: state.engine.error
});

@connect(mapStateToProps)
/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {BaseComponent}
 */
class ErrorOverlay extends BaseComponent {
  /**
   * Creates an instance of ErrorObejct.
   * @param {Object} obj obj
   * @memberof ErrorObejct
   */
  constructor(obj: object) {
    super({name: 'ErrorOverlay', player: obj.player});
  }

  /**
   * render main state
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  render(): React$Element<any> {
      if (this.props && this.props.error) {
         return (
          <Portal into="#overlay-portal">
            <Overlay open onClose={() => {}} type='error'>
              <div className={style.errorOverlay}>
                <div className={style.headline}>something went wrong :(</div>
                <div className={style.errorSession}>{this.props.error}</div>
                <div className={style.retryBtn}>Retry</div>
              </div>
            </Overlay>
          </Portal>
      )
      }else{
        return undefined;
      }
  }
}

export default ErrorOverlay;
