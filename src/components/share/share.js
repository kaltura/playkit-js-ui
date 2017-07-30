//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import ShareOverlay from '../share-overlay';
import Portal from 'preact-portal';

class ShareControl extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'Share', player: obj.player});
  }

  componentWillMount() {
    this.setState({overlay: false});
  }

  toggleOverlay() {
    this.setState({overlay: !this.state.overlay});
  }

  render() {
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
