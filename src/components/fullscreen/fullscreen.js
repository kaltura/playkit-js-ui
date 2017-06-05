//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import reduce from '../../reducers';
import * as actions from '../../actions';
import store from '../../store';
import BaseComponent from '../base';

@connect(reduce, bindActions(actions))
class FullscreenControl extends BaseComponent {
  _playerElement: HTMLElement;

  constructor() {
    super({name: 'Fullscreen'});
  }

  componentDidMount() {
    this._playerElement = document.getElementsByClassName('player')[0];
    store.subscribe(() => {
      this.setState({ fullscreen: store.getState().fullscreen })
    })
  }

  enterFullscreen() {
    this._playerElement.webkitRequestFullscreen();
  }

  toggleFullscreen() {
    this.logger.debug(`Toggle fullscreen`);
    // this._fullscreenControlButtonElement.classList.add('is-fullscreen');
    this.props.updateFullscreen(true);
    this.enterFullscreen();
  }

  render() {
    return (
      <div className='control-button-container control-fullscreen'>
        <button className={this.state.fullscreen ? 'control-button is-fullscreen' : 'control-button'} aria-label='Fullscreen' onClick={() => this.toggleFullscreen()}>
          <svg className='icon-maximize' viewBox='0 0 1024 1024'>
            <path d='M800 269.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' />
            <path d='M224 754.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' />
          </svg>
          <svg className='icon-minimize' viewBox='0 0 1024 1024'>
            <path d='M672 306.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' />
            <path d='M352 717.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' />
          </svg>
        </button>
      </div>
    )
  }
}

export default FullscreenControl;
