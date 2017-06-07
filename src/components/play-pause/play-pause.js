//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  isPlaying: state.playPause.isPlaying
});

@connect(mapStateToProps, bindActions(actions))
class PlayPauseControl extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'PlayPause', player: obj.player, config: obj.config});
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    if (this.player.paused) {
      this.player.play();
      this.props.toggleIsPlaying(true);
    }
    else {
      this.player.pause();
      this.props.toggleIsPlaying(false);
    }
  }

  render() {
    return (
      <div className='control-button-container control-play-pause'>
        <button className={this.props.isPlaying ? 'control-button is-playing' : 'control-button'} onClick={() => this.togglePlayPause()}>
          <svg className='icon-play' viewBox='0 0 1024 1024'>
            <path d='M796.806 461.202c44.919 28.075 44.739 73.706 0 101.668l-459.472 287.171c-44.919 28.075-81.334 7.915-81.334-45.305v-585.4c0-53.096 36.595-73.266 81.334-45.305l459.472 287.171z' />
          </svg>
          <svg className='icon-pause' viewBox='0 0 1024 1024'>
            <path d='M256 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314zM640 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314z' />
          </svg>
        </button>
      </div>
    )
  }
}

export default PlayPauseControl;
