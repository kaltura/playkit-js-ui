//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import Icon from '../icon/icon';
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
          <Icon type='share' />
        </button>
        { this.state.overlay ? (
          <Portal into="#overlay-portal">
            <ShareOverlay onClose={() => this.toggleOverlay()} />
          </Portal>
          ) : null }
      </div>
    )
  }
}

export default ShareControl;
