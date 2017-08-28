//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  isLive: state.engine.isLive,
  isDvr: state.engine.isDvr,
  currentTime: state.engine.currentTime,
  duration: state.engine.duration
});

@connect(mapStateToProps)
class LiveTag extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'LiveTag', player: obj.player});
  }

  /**
   * returns a boolean to detect if player is on live edge with buffer of 1 second
   *
   * @returns {boolean} - is player on live edge
   * @memberof LiveTag
   */
  isOnLiveEdge(): boolean {
    return (this.props.currentTime >= this.props.duration - 1);
  }

  /**
   * click handler to live tag
   * if not on live edge, seeking to live edge and if paused, call play method
   *
   * @returns {void}
   * @memberof LiveTag
   */
  onClick(): void {
    if (!this.isOnLiveEdge()) {
      this.player.seekToLiveEdge();
      if (this.player.paused) {
        this.player.play();
      }
    }
  }

  render(props) {
    var tagStyleClass = 'live-tag';
    if (props.isDvr && !this.isOnLiveEdge()) tagStyleClass += ' non-live-playhead';

    return (
      <div className={tagStyleClass} onClick={() => this.onClick()}>Live</div>
    )
  }
}

export default LiveTag;
