//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { default as reduce, actions } from '../../reducers/engine';
import BaseComponent from '../base';

@connect(reduce, bindActions(actions))
class EngineConnector extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'EngineConnector', player: obj.player});
  }

  componentDidMount() {
    const TrackType = this.player.Track;

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

      if (this.props.engine.isEnded) {
        this.props.updateIsEnded(false);
      }
    });

    this.player.addEventListener(this.player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
    });

    this.player.addEventListener(this.player.Event.ENDED, () => {
      this.props.updateIsEnded(true);
    });

    this.player.addEventListener(this.player.Event.TRACKS_CHANGED, () => {
      let audioTracks = this.player.getTracks(TrackType.AUDIO);
      let videoTracks = this.player.getTracks(TrackType.VIDEO);
      let textTracks = this.player.getTracks(TrackType.TEXT);

      this.props.updateAudioTracks(audioTracks);
      this.props.updateVideoTracks(videoTracks);
      this.props.updateTextTracks(textTracks);
    });


    this.player.addEventListener(this.player.Event.TEXT_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.TEXT);
      this.props.updateTextTracks(tracks);
    });

    this.player.addEventListener(this.player.Event.AUDIO_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.AUDIO);
      this.props.updateAudioTracks(tracks);
    });

    this.player.addEventListener(this.player.Event.VIDEO_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.VIDEO);
      this.props.updateVideoTracks(tracks);
    });
  }

  shouldComponentUpdate() { return false; }

  render() {
    return <span />
  }
}

export default EngineConnector;
