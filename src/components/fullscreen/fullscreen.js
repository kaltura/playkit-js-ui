//@flow
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/fullscreen';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

const mapStateToProps = state => ({
  fullscreen: state.fullscreen.fullscreen,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class FullscreenControl extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'Fullscreen', player: obj.player});
  }

  componentDidMount() {
    document.addEventListener('webkitfullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('mozfullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('fullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('MSFullscreenChange', () => this.fullscreenChangeHandler());

  }

  fullscreenChangeHandler() {
    let isFullscreen = typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement) ||
      typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement) ||
      typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement) ||
      typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement);

    this.props.updateFullscreen(isFullscreen);
  }

  requestFullscreen(element: HTMLElement) {
    if (this.props.isMobile) {
      this.player.getView().getElementsByTagName('video').webkitEnterFullscreen();
      return;
    }

    if (typeof element.requestFullscreen === 'function') {
      element.requestFullscreen();
    } else if (typeof element.mozRequestFullScreen === 'function') {
      element.mozRequestFullScreen();
    } else if (typeof element.webkitRequestFullScreen === 'function') {
      element.webkitRequestFullScreen();
    } else if (typeof element.msRequestFullscreen === 'function') {
      element.msRequestFullscreen();
    }
  }

  enterFullscreen() {
    this.requestFullscreen(this.player.getView().parentElement);
  }

  exitFullscreen() {
    if (typeof document.exitFullscreen === 'function') {
      document.exitFullscreen();
    } else if (typeof document.webkitExitFullscreen === 'function') {
      document.webkitExitFullscreen();
    } else if (typeof document.mozCancelFullScreen === 'function') {
      document.mozCancelFullScreen();
    } else if (typeof document.msExitFullscreen === 'function') {
      document.msExitFullscreen();
    }
  }

  toggleFullscreen() {
    this.logger.debug(`Toggle fullscreen`);
    this.props.fullscreen ? this.exitFullscreen() : this.enterFullscreen();
  }

  render() {
    return (
      <div className='control-button-container control-fullscreen'>
        <Localizer>
          <button aria-label={<Text id='controls.fullscreen'/>}
                  className={this.props.fullscreen ? 'control-button is-fullscreen' : 'control-button'}
                  onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </button>
        </Localizer>
      </div>
    )
  }
}

export default FullscreenControl;
