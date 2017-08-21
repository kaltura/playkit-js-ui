//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import ShareOverlay from '../share-overlay';
import Portal from 'preact-portal';

/**
 * ShareControl component
 *
 * @class ShareControl
 * @extends {BaseComponent}
 */
class ShareControl extends BaseComponent {

  /**
   * Creates an instance of ShareControl.
   * @param {Object} obj obj
   * @memberof ShareControl
   */
  constructor(obj: Object) {
    super({name: 'Share', player: obj.player});
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof ShareControl
   */
  componentWillMount() {
    this.setState({overlay: false});
  }

  /**
   * toggle overlay internal component state
   *
   * @returns {void}
   * @memberof ShareControl
   */
  toggleOverlay(): void {
    this.setState({overlay: !this.state.overlay});
  }

  /**
   * render element
   *
   * @returns {React$Element} component element
   * @memberof ShareControl
   */
  render(): React$Element<any> {
    return (
      <div className='control-button-container control-share'>
        <button className='control-button control-button-rounded' onClick={() => this.toggleOverlay()} aria-label='Share'>
          <Icon type={IconType.Share} />
        </button>
        { this.state.overlay ? (
          <Portal into="#overlay-portal">
            <ShareOverlay player={this.player} onClose={() => this.toggleOverlay()} />
          </Portal>
          ) : null }
      </div>
    )
  }
}

export default ShareControl;
