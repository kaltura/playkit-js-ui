//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying
});

@connect(mapStateToProps, bindActions(actions))
class OverlayPlay extends BaseComponent {
  state: Object;

  constructor(obj: Object) {
    super({name: 'OverlayPlay', player: obj.player});
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    this.setState({animation: true});
    setTimeout(() => {
      this.setState({animation: false});
    }, 400);
    if (this.player.paused) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  render(props: any) {
    return (
      <div className={`overlay-play ${this.state.animation ? 'in' : ''}`} onClick={() => this.togglePlayPause()}>
        { props.isPlaying ? <Icon type={IconType.Play} /> : <Icon type={IconType.Pause} /> }
      </div>
    )
  }
}

export default OverlayPlay;
