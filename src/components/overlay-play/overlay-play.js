//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { keyCode } from '../../utils/keycodes';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import Icon from '../icon';

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

  onKeyDown(e) {
    if (e.which === keyCode.SPACE) {
      this.logger.debug("Keydown space");
      this.player.paused ? this.player.play() : this.player.pause();
    }
  }

  render(props: any) {
    return (
      <div
        tabIndex='0'
        className={`overlay-play ${this.state.animation ? 'in' : ''}`}
        onClick={() => this.togglePlayPause()}
        onKeyDown={e => this.onKeyDown(e)}
      >
        { props.isPlaying ? <Icon type='play' /> : <Icon type='pause' /> }
      </div>
    )
  }
}

export default OverlayPlay;
