//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import Icon from '../icon';

const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying
});

@connect(mapStateToProps, bindActions(actions))
class OverlayPlay extends BaseComponent {
  state: Object;

  constructor(obj: Object) {
    super({name: 'OverlayPlay', player: obj.player});
  }

  isPlayingAdOrPlayback() {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    this.setState({animation: true});
    setTimeout(() => {
      this.setState({animation: false});
    }, 400);

    this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
  }

  render() {
    return (
      <div className={`overlay-play ${this.state.animation ? 'in' : ''}`} onClick={() => this.togglePlayPause()}>
        { this.isPlayingAdOrPlayback() ? <Icon type='play' /> : <Icon type='pause' /> }
      </div>
    )
  }
}

export default OverlayPlay;
