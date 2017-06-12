//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
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
        <Localizer>
          <button aria-label={<Text id='controls.fullscreen' />} className={this.props.fullscreen ? 'control-button is-fullscreen' : 'control-button'} onClick={() => this.toggleFullscreen()}>
            <Icon type='maximize' />
            <Icon type='minimize' />
          </button>
        </Localizer>
      </div>
    )
  }
}

export default FullscreenControl;
