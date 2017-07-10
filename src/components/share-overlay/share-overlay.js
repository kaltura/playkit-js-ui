//@flow
import { h } from 'preact';
import { Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/share';
import BaseComponent from '../base';
import Overlay from '../overlay/overlay';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  open: state.share.overlayOpen
});

const shareOverlayState: Object = {
  Main: 'main',
  LinkOptions: 'link-options',
  EmbedOptions: 'embed-options'
};

const dummyShareUrl = 'https://cdnapisec.kaltura.com/index.php?assetId=123456';

@connect(mapStateToProps, bindActions(actions))
class ShareOverlay extends BaseComponent {

  constructor() {
    super({name: 'ShareOverlay'});
  }

  componentWillUnmount() {
    this.setState({state: shareOverlayState.Main});
  }

  componentWillMount() {
    this.setState({state: shareOverlayState.Main});
  }

  transitionToState(stateName: string) {
    this.setState({state: stateName});
  }

  renderMainState() {
    return (
      <div className={this.state.state === shareOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>
          <Text id='share.share_title' />
        </div>
        <div className="share-main-container">
          <div className='share-icons'>
            <a className='btn-rounded facebook-share-btn'><Icon type='facebook' /></a>
            <a className='btn-rounded twitter-share-btn'><Icon type='twitter' /></a>
            <a className='btn-rounded google-plus-share-btn'><Icon type='google-plus' /></a>
            <a className='btn-rounded linkedin-share-btn'><Icon type='linkedin' /></a>
            <a className='btn-rounded email-share-btn'><Icon type='email' /></a>
            <a className='btn-rounded embed-share-btn'><Icon type='embed' /></a>
          </div>
          <div>
            <div className='form-group has-icon'>
              <input type='text' placeholder='Share URL' className='form-control' value={dummyShareUrl} readOnly />
              <Icon type='link' />
            </div>
          </div>
          <a onClick={() => this.setState({state: shareOverlayState.LinkOptions})}><Text id='share.link_options' /></a>
        </div>
      </div>
    )
  }

  renderLinkOptionsState() {
    return (
      <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>Link options</div>
        <div className='link-options-container'>
          <div className='copy-url-row'>
            <div className='form-group has-icon input-copy-url' style='width: 350px;'>
              <input type='text' placeholder='Share URL' className='form-control' value={dummyShareUrl} readOnly />
              <Icon type='link' />
            </div>
            <a className='btn-rounded btn-branded btn-copy-url'>
              <Icon type='copy' />
            </a>
          </div>
          <div className='video-start-options-row'>
            <div className="checkbox d-inline-block">
              <label><input type='checkbox' value='' />Start video at</label>
            </div>
            <div className='form-group d-inline-block'>
              <input type='text' className='form-control' value='05:34' style='width: 72px;' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render(props: any) {
    return (
      <Overlay open onClose={() => props.onClose()} type='share'>
        {this.renderMainState()}
        {this.renderLinkOptionsState()}
      </Overlay>
    )
  }
}

export default ShareOverlay;
