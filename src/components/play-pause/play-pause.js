//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  isPlaying: state.playPause.isPlaying
});

@connect(mapStateToProps, bindActions(actions))
class PlayPauseControl extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'PlayPause', player: obj.player});
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
    var controlButtonClass = this.props.isPlaying ? 'control-button is-playing' : 'control-button';

    return (
      <div className='control-button-container control-play-pause'>
        <button className={controlButtonClass} onClick={() => this.togglePlayPause()}>
          <Icon type='play' />
          <Icon type='pause' />
        </button>
      </div>
    )
  }
}

export default PlayPauseControl;
