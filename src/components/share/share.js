//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/share';
import BaseComponent from '../base';
import Icon from '../icon/icon';
import ShareOverlay from '../share-overlay/share-overlay';
import Portal from 'preact-portal';

const mapStateToProps = state => ({
  overlayOpen: state.share.overlayOpen
});

@connect(mapStateToProps, bindActions(actions))
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

  render(props: any) {
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
