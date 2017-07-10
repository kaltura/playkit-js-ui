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

@connect(mapStateToProps, bindActions(actions))
class ShareOverlay extends BaseComponent {

  _shareUrlInput: HTMLInputElement;

  constructor() {
    super({name: 'ShareOverlay'});
  }

  componentWillUnmount() {
    this.setState({state: shareOverlayState.Main});
  }

  componentWillMount() {
    this.setState({
      state: shareOverlayState.Main,
      shareUrl: 'https://cdnapisec.kaltura.com/index.php?assetId=123456'
    });
  }

  transitionToState(stateName: string) {
    this.setState({state: stateName});
  }

  copyUrl() {
    try {
      this._shareUrlInput.select();
      document.execCommand('copy');
      this._shareUrlInput.blur();

      this.setState({copySuccess: true});
      setTimeout(() => this.setState({copySuccess: false}) , 2000);

    } catch(e) {

    }
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
              <input type='text' placeholder='Share URL' className='form-control' value={this.state.shareUrl} readOnly />
              <Icon type='link' />
            </div>
          </div>
          <a onClick={() => this.setState({state: shareOverlayState.LinkOptions})}><Text id='share.link_options' /></a>
        </div>
      </div>
    )
  }

  renderLinkOptionsState() {
    var copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
    copyUrlClasses += this.state.copySuccess ? ' copied' : '';

    return (
      <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>Link options</div>
        <div className='link-options-container'>
          <div className='copy-url-row'>
            <div className='form-group has-icon input-copy-url' style='width: 350px;'>
              <input
                type='text'
                ref={c => this._shareUrlInput=c}
                placeholder='Share URL'
                className='form-control'
                value={this.state.shareUrl}
                readOnly
              />
              <Icon type='link' />
            </div>
            <a
              className={copyUrlClasses}
              onClick={() => this.copyUrl()}>
              <Icon type='copy' />
              <Icon type='check' />
            </a>
          </div>
          <div className='video-start-options-row'>
            <div className="checkbox d-inline-block">
              <label><input type='checkbox' value='' />Start video at</label>
            </div>
            <div className='form-group d-inline-block'>
              <input
                type='text'
                className='form-control'
                value='05:34'
                style='width: 72px;'
              />
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
