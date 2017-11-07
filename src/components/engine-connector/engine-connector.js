//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {default as reduce, actions} from '../../reducers/engine';
import BaseComponent from '../base';

@connect(reduce, bindActions(actions))
  /**
   * EngineConnector component
   *
   * @class EngineConnector
   * @example <EngineConnector player={this.player} />
   * @extends {BaseComponent}
   */
class EngineConnector extends BaseComponent {

  /**
   * Creates an instance of EngineConnector.
   * @param {Object} obj obj
   * @memberof EngineConnector
   */
  constructor(obj: Object) {
    super({name: 'EngineConnector', player: obj.player});
  }

  /**
   * after component mounted, set event listeners and update redux store
   *
   * @returns {void}
   * @memberof EngineConnector
   */
  componentDidMount() {
    const TrackType = this.player.Track;

    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_STARTED, () => {
      this.props.updateAdBreak(false);
      this.props.updateAdIsPlaying(false);
      this.props.updateIsPlaying(false);
    });

    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_ENDED, () => {
      this.props.updatePlayerPoster(this.player.poster);
    });

    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, (e) => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(this.player.currentTime);
    });

    this.player.addEventListener(this.player.Event.DURATION_CHANGE, () => {
      this.props.updateDuration(this.player.duration);
    });

    this.player.addEventListener(this.player.Event.LOADED_DATA, () => {
      this.props.updateDuration(this.player.duration);
    });

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateMuted(this.player.muted);
      this.props.updateMetadataLoadingStatus(true);
      this.props.updateIsLive(this.player.isLive());
      this.props.updateIsDvr(this.player.isDvr());
      this.props.updatePlayerPoster(this.player.poster);
    });

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });

    this.player.addEventListener(this.player.Event.MUTE_CHANGE, () => {
      this.props.updateMuted(this.player.muted);
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

    this.player.addEventListener(this.player.Event.AD_BREAK_START, () => {
      this.props.updateAdBreak(true);
    });

    this.player.addEventListener(this.player.Event.AD_BREAK_END, () => {
      this.props.updateAdBreak(false);
    });

    this.player.addEventListener(this.player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateAdBreak(false);
    });

    this.player.addEventListener(this.player.Event.AD_PROGRESS, e => {
      let currentTime = e.payload.adProgress.currentTime;
      let duration = e.payload.adProgress.duration;

      this.props.updateAdBreakProgress(currentTime, duration);
    });

    this.player.addEventListener(this.player.Event.AD_COMPLETED, ()=> {
      this.props.updateAdBreakCompleted();
    });

    this.player.addEventListener(this.player.Event.AD_STARTED, () => {
      this.props.updateAdIsPlaying(true);
    });

    this.player.addEventListener(this.player.Event.AD_RESUMED, () => {
      this.props.updateAdIsPlaying(true);
    });

    this.player.addEventListener(this.player.Event.AD_PAUSED, () => {
      this.props.updateAdIsPlaying(false);
    });

    this.player.addEventListener(this.player.Event.AD_LOADED, e => {
      this.props.updateAdClickUrl(e.payload.ad.g.clickThroughUrl);
      this.props.updateAdSkipTimeOffset(e.payload.ad.getSkipTimeOffset());
      this.props.updateAdSkippableState(e.payload.ad.getAdSkippableState());
    });

  }

  /**
   * component shouldn't update the dom if props or internal state changed
   *
   * @returns {boolean} - should component update on changes or not
   * @memberof EngineConnector
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof EngineConnector
   */
  render(): React$Element<any> {
    return <span/>
  }
}

export default EngineConnector;
