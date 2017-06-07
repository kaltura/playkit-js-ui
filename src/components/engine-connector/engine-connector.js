//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { default as reduce, actions } from '../../reducers/engine';
import BaseComponent from '../base';

@connect(reduce, bindActions(actions))
class EngineConnector extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'EngineConnector', player: obj.player});
  }

  componentDidMount() {
    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, (e) => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(this.player.currentTime);
    });

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateDuration(this.player.duration);
      this.props.updateMetadataLoadingStatus(true);
    });

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });

    this.player.addEventListener(this.player.Event.PLAY, () => {
      this.props.updateIsPlaying(true);
    });

    this.player.addEventListener(this.player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
    });
  }

  render() {
    return <span />
  }
}

export default EngineConnector;
