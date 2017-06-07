//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/fullscreen';
import BaseComponent from '../base';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  fullscreen: state.fullscreen.fullscreen
});

@connect(mapStateToProps, bindActions(actions))
class FullscreenControl extends BaseComponent {
  _playerElement: HTMLElement;

  constructor() {
    super({name: 'Fullscreen'});
  }

  componentDidMount() {
    this._playerElement = document.getElementsByClassName('player')[0];

    document.addEventListener('webkitfullscreenchange', () => {
      this.props.updateFullscreen(document.webkitIsFullScreen);
    });
  }

  enterFullscreen() {
    this._playerElement.webkitRequestFullscreen();
  }
  exitFullscreen() {
    document.webkitCancelFullScreen();
  }

  toggleFullscreen() {
    this.logger.debug(`Toggle fullscreen`);
    this.props.fullscreen ? this.exitFullscreen() : this.enterFullscreen();
  }

  render() {
    return (
      <div className='control-button-container control-fullscreen'>
        <button className={this.props.fullscreen ? 'control-button is-fullscreen' : 'control-button'} aria-label='Fullscreen' onClick={() => this.toggleFullscreen()}>
          <Icon type='maximize' />
          <Icon type='minimize' />
        </button>
      </div>
    )
  }
}

export default FullscreenControl;
