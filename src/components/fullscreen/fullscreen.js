//@flow
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/fullscreen';
import BaseComponent from '../base';
import Icon from '../icon';

const mapStateToProps = state => ({
  fullscreen: state.fullscreen.fullscreen
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
    let isFullscreen = Boolean(document.fullscreenElement) ||
      Boolean(document.webkitFullscreenElement) ||
      Boolean(document.mozFullScreenElement) ||
      Boolean(document.msFullscreenElement);

    this.props.updateFullscreen(isFullscreen);
  }

  requestFullscreen(element: HTMLElement) {
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
    this.requestFullscreen(this.player._el.parentElement);
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
            <Icon type='maximize'/>
            <Icon type='minimize'/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export default FullscreenControl;
