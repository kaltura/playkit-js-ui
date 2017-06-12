//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying
});

@connect(mapStateToProps, bindActions(actions))
class OverlayPlay extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'OverlayPlay', player: obj.player});
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    if (this.player.paused) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  render() {
    return (
      <div className='overlay-play' onClick={() => this.togglePlayPause()} />
    )
  }
}

export default OverlayPlay;
