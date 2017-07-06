//@flow
import { h } from 'preact';
import { Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/share';
import BaseComponent from '../base';
import Overlay from '../overlay/overlay';

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

  constructor() {
    super({name: 'ShareOverlay'});
  }

  componentWillUnmount() {
    this.setState({state: shareOverlayState.Main});
  }

  componentWillMount() {
    this.setState({state: shareOverlayState.Main});
  }

  transitionToState(stateName) {
    this.setState({state: stateName});
  }

  render(props: any) {
    return (
      <Overlay open onClose={() => props.onClose()} type='share'>
        <div className={this.state.state === shareOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
          <div className='title'>
            <Text id='share.share_title' />
          </div>
          <div className='share-icons'>
            <a className='share-btn facebook-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M432 405.333h-80v106.667h80v320h133.333v-320h97.12l9.547-106.667h-106.667v-44.453c0-25.467 5.12-35.547 29.733-35.547h76.933v-133.333h-101.547c-95.893 0-138.453 42.213-138.453 123.067v90.267z' />
              </svg>
            </a>
            <a className='share-btn twitter-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M832 316.614c-23.547 10.29-48.853 17.221-75.413 20.345 27.12-15.987 47.947-41.319 57.733-71.508-25.36 14.806-53.467 25.568-83.387 31.37-23.92-25.122-58.080-40.82-95.84-40.82-84.773 0-147.067 77.861-127.92 158.687-109.093-5.381-205.84-56.833-270.613-135.035-34.4 58.094-17.84 134.090 40.613 172.574-21.493-0.683-41.76-6.484-59.44-16.171-1.44 59.879 42.16 115.898 105.307 128.368-18.48 4.935-38.72 6.090-59.307 2.205 16.693 51.347 65.173 88.702 122.667 89.752-55.2 42.605-124.747 61.637-194.4 53.552 58.107 36.673 127.147 58.067 201.28 58.067 243.787 0 381.52-202.684 373.2-384.473 25.653-18.244 47.92-41.004 65.52-66.914v0z' />
              </svg>
            </a>
            <a className='share-btn google-plus-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M352 556.8h127.040c-5.12 32.928-38.4 96.64-127.040 96.64-76.48 0-138.88-63.328-138.88-141.44 0-78.080 62.4-141.44 138.88-141.44 43.52 0 72.64 18.56 89.28 34.56l60.8-58.56c-39.040-36.48-89.6-58.56-150.080-58.56-123.84 0-224 100.16-224 224s100.16 224 224 224c129.28 0 215.072-90.88 215.072-218.88 0-14.72-1.632-25.92-3.552-37.12h-211.52v76.8zM800 544v96h-64v-96h-96v-64h96v-96h64v96h96v64h-96z' />
              </svg>
            </a>
            <a className='share-btn linkedin-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M324.8 290.087c0 36.506-29.6 66.087-66.133 66.087s-66.133-29.581-66.133-66.087c0-36.48 29.6-66.087 66.133-66.087s66.133 29.607 66.133 66.087zM325.333 409.043h-133.333v422.957h133.333v-422.957zM538.187 409.043h-132.48v422.957h132.507v-222.026c0-123.45 160.773-133.549 160.773 0v222.026h133.013v-267.811c0-208.306-237.92-200.719-293.813-98.179v-56.967z' />
              </svg>
            </a>
            <a className='share-btn email-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M256 768c-35.346 0-64-28.654-64-64v-352c0-35.346 28.654-64 64-64h512c35.346 0 64 28.654 64 64v352c0 35.346-28.654 64-64 64h-512zM512 467.488l147.52-115.488h-295.040l147.52 115.488zM748.48 352l-211.2 179.2c-0.713 1.308-1.572 2.532-2.56 3.648-12.707 12.158-32.733 12.158-45.44 0-0.988-1.116-1.847-2.34-2.56-3.648l-211.2-179.2h-19.52v352h512v-352h-19.52z' />
              </svg>
            </a>
            <a className='share-btn embed-share-btn'>
              <svg style='width:32px;height:32px' viewBox='0 0 1024 1024'>
                <path fill='#fff' d='M377.989 579.335c12.669 12.904 12.669 33.777 0 46.68-12.733 12.969-33.427 12.969-46.16 0l-104.727-106.667c-12.669-12.904-12.669-33.777 0-46.68l104.727-106.667c12.733-12.969 33.427-12.969 46.16 0 12.669 12.904 12.669 33.777 0 46.68l-81.812 83.327 81.812 83.327zM646.011 412.68c-12.669-12.904-12.669-33.777 0-46.68 12.733-12.969 33.427-12.969 46.16 0l104.727 106.667c12.669 12.904 12.669 33.777 0 46.68l-104.727 106.667c-12.733 12.969-33.427 12.969-46.16 0-12.669-12.904-12.669-33.777 0-46.68l81.812-83.327-81.812-83.327zM572.293 250.6c17.455 4.445 28.025 22.388 23.686 40.066l-104.727 426.669c-4.349 17.719-22.048 28.535-39.545 24.079-17.455-4.445-28.025-22.388-23.686-40.066l104.727-426.669c4.349-17.719 22.048-28.535 39.545-24.079z' />
              </svg>
            </a>
          </div>
          <div>
            <div className='form-group has-icon' style='width: 300px;'>
              <input type='text' placeholder='Share URL' className='form-control' value='https://cdnapisec.kaltura.com/index.php?assetId=123456' readOnly />
              <svg className='icon' style='width:32px;height:32px;' viewBox='0 0 1024 1024'>
                <path d='M355.028 445.537c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-24.141-24.141c-49.92-49.92-49.832-130.999 0.094-180.925 49.984-49.984 130.995-50.025 180.955-0.064l113.266 113.266c49.964 49.964 49.935 130.955-0.064 180.955-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255c25.013-25.013 25.027-65.482 0.064-90.445l-113.266-113.266c-24.957-24.957-65.445-24.936-90.445 0.064-24.955 24.955-24.998 65.511-0.094 90.416l24.141 24.141zM668.972 578.463c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l24.141 24.141c49.92 49.92 49.832 130.999-0.094 180.925-49.984 49.984-130.995 50.025-180.955 0.064l-113.266-113.266c-49.964-49.964-49.935-130.955 0.064-180.955 12.497-12.497 32.758-12.497 45.255 0s12.497 32.758 0 45.255c-25.013 25.013-25.027 65.482-0.064 90.445l113.266 113.266c24.957 24.957 65.445 24.936 90.445-0.064 24.955-24.955 24.998-65.511 0.094-90.416l-24.141-24.141z' />
              </svg>
            </div>
          </div>
          <a onClick={() => this.setState({state: shareOverlayState.LinkOptions})}><Text id='share.link_options' /></a>
        </div>
        <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
          <div className='title'>Link options</div>
        </div>
      </Overlay>
    )
  }
}

export default ShareOverlay;
