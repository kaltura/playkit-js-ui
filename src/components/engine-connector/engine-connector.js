//@flow
import {h} from 'preact';
import style from '../../styles/style.scss';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {default as reduce, actions} from '../../reducers/engine';
import {actions as loadingActions} from '../../reducers/loading';
import {actions as shellActions} from '../../reducers/shell';
import BaseComponent from '../base';

@connect(
  reduce,
  bindActions({...actions, ...loadingActions, ...shellActions})
)
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

    this.eventManager.listen(this.player, this.player.Event.PLAYER_RESET, () => {
      this.props.updateIsIdle(true);
    });

    this.eventManager.listen(this.player, this.player.Event.SOURCE_SELECTED, () => {
      this.props.updateIsVr(this.player.isVr());
      if (this.player.config.playback.autoplay) {
        this.props.updateLoadingSpinnerState(true);
      } else {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_STARTED, () => {
      this.props.updateIsChangingSource(true);
      this.props.updateFallbackToMutedAutoPlay(false);
      this.props.updateAdBreak(false);
      this.props.updateAdIsPlaying(false);
      this.props.updateIsPlaying(false);
      if (this.props.engine.isCasting) {
        this.props.updateLoadingSpinnerState(true);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_ENDED, () => {
      this.props.updateIsChangingSource(false);
      this.props.updatePlayerPoster(this.player.poster);
      this.props.updateIsIdle(false);
      if (!this.player.config.playback.autoplay) {
        this.props.updatePrePlayback(true);
        this.props.addPlayerClass(style.prePlayback);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.PLAYER_STATE_CHANGED, e => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    this.eventManager.listen(this.player, this.player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(this.player.currentTime);
    });

    this.eventManager.listen(this.player, this.player.Event.DURATION_CHANGE, () => {
      this.props.updateDuration(this.player.duration);
    });

    this.eventManager.listen(this.player, this.player.Event.LOADED_DATA, () => {
      this.props.updateDuration(this.player.duration);
    });

    this.eventManager.listen(this.player, this.player.Event.LOADED_METADATA, () => {
      this.props.updateMuted(this.player.muted);
      this.props.updateMetadataLoadingStatus(true);
      this.props.updateIsLive(this.player.isLive());
      this.props.updateIsDvr(this.player.isDvr());
      this.props.updatePlayerPoster(this.player.poster);
    });

    this.eventManager.listen(this.player, this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });

    this.eventManager.listen(this.player, this.player.Event.MUTE_CHANGE, () => {
      this.props.updateMuted(this.player.muted);
      if (this.props.engine.fallbackToMutedAutoPlay) {
        this.props.updateFallbackToMutedAutoPlay(this.player.muted);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.PLAY, () => {
      this.props.updateIsPlaying(true);
      this.props.updateIsEnded(false);
    });

    this.eventManager.listen(this.player, this.player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    this.eventManager.listen(this.player, this.player.Event.ENDED, () => {
      this.props.updateIsEnded(true);
    });

    this.eventManager.listen(this.player, this.player.Event.TRACKS_CHANGED, () => {
      let audioTracks = this.player.getTracks(TrackType.AUDIO);
      let videoTracks = this.player.getTracks(TrackType.VIDEO);
      let textTracks = this.player.getTracks(TrackType.TEXT);

      this.props.updateAudioTracks(audioTracks);
      this.props.updateVideoTracks(videoTracks);
      this.props.updateTextTracks(textTracks);
    });

    this.eventManager.listen(this.player, this.player.Event.TEXT_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.TEXT);
      this.props.updateTextTracks(tracks);
    });

    this.eventManager.listen(this.player, this.player.Event.AUDIO_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.AUDIO);
      this.props.updateAudioTracks(tracks);
    });

    this.eventManager.listen(this.player, this.player.Event.VIDEO_TRACK_CHANGED, () => {
      let tracks = this.player.getTracks(TrackType.VIDEO);
      this.props.updateVideoTracks(tracks);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_BREAK_START, () => {
      this.props.updateHasError(false);
      this.props.updateAdBreak(true);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_BREAK_END, () => {
      this.props.updateAdBreak(false);
    });

    this.eventManager.listen(this.player, this.player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateAdBreak(false);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_PROGRESS, e => {
      let currentTime = e.payload.adProgress.currentTime;
      let duration = e.payload.adProgress.duration;

      this.props.updateAdBreakProgress(currentTime, duration);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_COMPLETED, () => {
      this.props.updateAdBreakCompleted();
    });

    this.eventManager.listen(this.player, this.player.Event.AD_STARTED, () => {
      this.props.updateAdIsPlaying(true);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_RESUMED, () => {
      this.props.updateAdIsPlaying(true);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_PAUSED, () => {
      this.props.updateAdIsPlaying(false);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_ERROR, e => {
      if (e.payload.fatal) {
        this.props.updateAdBreak(false);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.props.updateFallbackToMutedAutoPlay(true);
    });

    this.eventManager.listen(this.player, this.player.Event.AD_LOADED, e => {
      const ad = e.payload.ad;
      this.props.updateAdIsLinear(ad.linear);
      this.props.updateAdClickUrl(ad.clickThroughUrl);
      this.props.updateAdSkipTimeOffset(ad.skipOffset);
      this.props.updateAdSkippableState(ad.skippable);
    });

    this.eventManager.listen(this.player, this.player.Event.VR_STEREO_MODE_CHANGED, e => {
      this.props.updateVrStereoMode(e.payload.mode);
    });

    this.eventManager.listen(this.player, this.player.Event.ERROR, e => {
      if (e.payload && e.payload.severity === 2) {
        this.props.updateHasError(true);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.Cast.CAST_SESSION_STARTED, e => {
      const session = e.payload.session;
      this.props.updateIsCasting(true);
      this.props.updateCastSession(session);
      if (session.resuming) {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    this.eventManager.listen(this.player, this.player.Event.Cast.CAST_SESSION_ENDED, () => {
      this.props.updateIsCasting(false);
      this.props.updateCastSession(null);
    });

    this.eventManager.listen(this.player, this.player.Event.Cast.CAST_AVAILABLE, e => {
      const {available} = e.payload;
      this.props.updateIsCastAvailable(available);
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
    return <span/>;
  }
}

export {EngineConnector};
