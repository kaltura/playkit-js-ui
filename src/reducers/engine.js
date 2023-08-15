//@flow
import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from '../utils/component-config';
import {types as configReducerTypes} from './config';

const component = 'engine';

export const types = {
  UPDATE_PLAYER_STATE: `${component}/UPDATE_PLAYER_STATE`,
  UPDATE_PRE_PLAYBACK: `${component}/UPDATE_PRE_PLAYBACK`,
  UPDATE_IS_PLAYING: `${component}/UPDATE_IS_PLAYING`,
  UPDATE_IS_PAUSED: `${component}/UPDATE_IS_PAUSED`,
  UPDATE_IS_SEEKING: `${component}/UPDATE_IS_SEEKING`,
  UPDATE_LAST_SEEK_POINT: `${component}/UPDATE_LAST_SEEK_POINT`,
  UPDATE_IS_CHANGING_SOURCE: `${component}/UPDATE_IS_CHANGING_SOURCE`,
  UPDATE_IS_ENDED: `${component}/UPDATE_IS_ENDED`,
  UPDATE_IS_PLAYBACK_STARTED: `${component}/UPDATE_IS_PLAYBACK_STARTED`,
  UPDATE_IS_PLAYBACK_ENDED: `${component}/UPDATE_IS_PLAYBACK_ENDED`,
  UPDATE_CURRENT_TIME: `${component}/UPDATE_CURRENT_TIME`,
  UPDATE_DURATION: `${component}/UPDATE_DURATION`,
  UPDATE_VOLUME: `${component}/UPDATE_VOLUME`,
  UPDATE_MUTED: `${component}/UPDATE_MUTED`,
  UPDATE_METADATA_LOADING_STATUS: `${component}/UPDATE_METADATA_LOADING_STATUS`,
  UPDATE_DATA_LOADING_STATUS: `${component}/UPDATE_DATA_LOADING_STATUS`,
  UPDATE_AUDIO_TRACKS: `${component}/UPDATE_AUDIO_TRACKS`,
  UPDATE_VIDEO_TRACKS: `${component}/UPDATE_VIDEO_TRACKS`,
  UPDATE_TEXT_TRACKS: `${component}/UPDATE_TEXT_TRACKS`,
  UPDATE_AD_BREAK: `${component}/UPDATE_AD_BREAK`,
  UPDATE_AD_BREAK_PROGRESS: `${component}/UPDATE_AD_BREAK_PROGRESS`,
  UPDATE_AD_BREAK_COMPLETED: `${component}/UPDATE_AD_BREAK_COMPLETED`,
  UPDATE_AD_IS_PLAYING: `${component}/UPDATE_AD_IS_PLAYING`,
  UPDATE_AD_SKIP_TIME_OFFSET: `${component}/UPDATE_AD_SKIP_TIME_OFFSET`,
  UPDATE_AD_SKIPPABLE_STATE: `${component}/UPDATE_AD_SKIPPABLE_STATE`,
  UPDATE_AD_URL: `${component}/UPDATE_AD_URL`,
  UPDATE_AD_IS_LINEAR: `${component}/UPDATE_AD_IS_LINEAR`,
  UPDATE_AD_IS_BUMPER: `${component}/UPDATE_AD_IS_BUMPER`,
  UPDATE_AD_CONTENT_TYPE: `${component}/UPDATE_AD_CONTENT_TYPE`,
  UPDATE_PLAYER_POSTER: `${component}/UPDATE_PLAYER_POSTER`,
  UPDATE_IS_AUDIO: `${component}/UPDATE_IS_AUDIO`,
  UPDATE_IS_LIVE: `${component}/UPDATE_IS_LIVE`,
  UPDATE_IS_DVR: `${component}/UPDATE_IS_DVR`,
  UPDATE_IS_IMG: `${component}/UPDATE_IS_IMG`,
  UPDATE_ERROR: `${component}/ERROR`,
  UPDATE_IS_IDLE: `${component}/UPDATE_IS_IDLE`,
  UPDATE_FALLBACK_TO_MUTED_AUTOPLAY: `${component}/UPDATE_FALLBACK_TO_MUTED_AUTOPLAY`,
  UPDATE_IS_VR: `${component}/UPDATE_IS_VR`,
  UPDATE_VR_STEREO_MODE: `${component}/UPDATE_VR_STEREO_MODE`,
  UPDATE_IS_CASTING: `${component}/UPDATE_IS_CASTING`,
  UPDATE_CAST_SESSION: `${component}/UPDATE_CAST_SESSION`,
  UPDATE_IS_CAST_AVAILABLE: `${component}/UPDATE_IS_CAST_AVAILABLE`,
  UPDATE_PLAYLIST: `${component}/UPDATE_PLAYLIST`,
  UPDATE_PICTURE_IN_PICTURE_SUPPORTED: `${component}/UPDATE_PICTURE_IN_PICTURE_SUPPORTED`,
  UPDATE_PICTURE_IN_PICTURE_MODE: `${component}/UPDATE_PICTURE_IN_PICTURE_MODE`,
  UPDATE_FULLSCREEN: `${component}/UPDATE_FULLSCREEN`
};

export const initialState = {
  isIdle: false,
  isPlaying: false,
  isPaused: false,
  isSeeking: false,
  isEnded: false,
  isPlaybackStarted: false,
  isPlaybackEnded: false,
  isChangingSource: false,
  prePlayback: true,
  metadataLoaded: false,
  dataLoaded: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  fallbackToMutedAutoPlay: false,
  poster: '',
  currentTime: 0,
  lastSeekPoint: 0,
  duration: 0,
  volume: 1,
  muted: false,
  videoTracks: [],
  audioTracks: [],
  textTracks: [],
  adIsLinear: false,
  adBreak: false,
  adIsPlaying: false,
  adSkipTimeOffset: 0,
  adSkippableState: false,
  adIsBumper: false,
  adContentType: null,
  isLive: false,
  isDvr: false,
  isImg: false,
  isAudio: false,
  adProgress: {
    currentTime: 0,
    duration: 0
  },
  adUrl: '',
  hasError: false,
  isVr: false,
  vrStereoMode: false,
  isCasting: false,
  castSession: null,
  isCastAvailable: false,
  pictureInPictureSupported: false,
  isInPictureInPicture: false,
  playlist: null,
  fullscreen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_ERROR:
      return {
        ...state,
        hasError: action.hasError
      };

    case types.UPDATE_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState
      };

    case types.UPDATE_PRE_PLAYBACK:
      return {
        ...state,
        prePlayback: action.prePlayback
      };

    case types.UPDATE_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying
      };

    case types.UPDATE_IS_PAUSED:
      return {
        ...state,
        isPaused: action.isPaused
      };

    case types.UPDATE_IS_SEEKING:
      return {
        ...state,
        isSeeking: action.isSeeking
      };

    case types.UPDATE_LAST_SEEK_POINT:
      return {
        ...state,
        lastSeekPoint: action.lastSeekPoint
      };

    case types.UPDATE_IS_ENDED:
      return {
        ...state,
        isEnded: action.isEnded
      };

    case types.UPDATE_IS_PLAYBACK_STARTED:
      return {
        ...state,
        isPlaybackStarted: action.isPlaybackStarted
      };

    case types.UPDATE_IS_PLAYBACK_ENDED:
      return {
        ...state,
        isPlaybackEnded: action.isPlaybackEnded
      };

    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };

    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };

    case types.UPDATE_VOLUME:
      return {
        ...state,
        volume: action.volume
      };

    case types.UPDATE_MUTED:
      return {
        ...state,
        muted: action.muted
      };

    case types.UPDATE_METADATA_LOADING_STATUS:
      return {
        ...state,
        metadataLoaded: action.metadataLoaded
      };

    case types.UPDATE_DATA_LOADING_STATUS:
      return {
        ...state,
        dataLoaded: action.dataLoaded
      };

    case types.UPDATE_AUDIO_TRACKS:
      return {
        ...state,
        audioTracks: action.tracks
      };

    case types.UPDATE_VIDEO_TRACKS:
      return {
        ...state,
        videoTracks: action.tracks
      };

    case types.UPDATE_TEXT_TRACKS:
      return {
        ...state,
        textTracks: action.tracks
      };

    case types.UPDATE_AD_BREAK:
      return {
        ...state,
        adBreak: action.adBreak
      };

    case types.UPDATE_AD_BREAK_PROGRESS:
      return {
        ...state,
        adProgress: action.adProgress
      };

    case types.UPDATE_AD_BREAK_COMPLETED:
      return {
        ...state,
        adProgress: {
          currentTime: state.adProgress.duration,
          duration: state.adProgress.duration
        }
      };

    case types.UPDATE_AD_IS_PLAYING:
      return {
        ...state,
        adIsPlaying: action.adIsPlaying
      };

    case types.UPDATE_AD_IS_LINEAR:
      return {
        ...state,
        adIsLinear: action.adIsLinear
      };

    case types.UPDATE_AD_SKIP_TIME_OFFSET:
      return {
        ...state,
        adSkipTimeOffset: action.adSkipTimeOffset
      };

    case types.UPDATE_AD_SKIPPABLE_STATE:
      return {
        ...state,
        adSkippableState: action.adSkippableState
      };

    case types.UPDATE_AD_URL:
      return {
        ...state,
        adUrl: action.adUrl
      };

    case types.UPDATE_AD_IS_BUMPER:
      return {
        ...state,
        adIsBumper: action.adIsBumper
      };

    case types.UPDATE_AD_CONTENT_TYPE:
      return {
        ...state,
        adContentType: action.adContentType
      };

    case types.UPDATE_PLAYER_POSTER:
      return {
        ...state,
        poster: action.poster
      };

    case types.UPDATE_IS_AUDIO:
      return {
        ...state,
        isAudio: action.isAudio
      };

    case types.UPDATE_IS_LIVE:
      return {
        ...state,
        isLive: action.isLive
      };

    case types.UPDATE_IS_DVR:
      return {
        ...state,
        isDvr: action.isDvr
      };

    case types.UPDATE_IS_IMG:
      return {
        ...state,
        isImg: action.isImg
      };

    case types.UPDATE_IS_IDLE:
      return {
        ...state,
        isIdle: action.IsIdle
      };

    case types.UPDATE_FALLBACK_TO_MUTED_AUTOPLAY:
      return {
        ...state,
        fallbackToMutedAutoPlay: action.fallback
      };

    case types.UPDATE_IS_VR:
      return {
        ...state,
        isVr: action.isVr
      };

    case types.UPDATE_VR_STEREO_MODE:
      return {
        ...state,
        vrStereoMode: action.vrStereoMode
      };

    case types.UPDATE_IS_CASTING:
      return {
        ...state,
        isCasting: action.isCasting
      };

    case types.UPDATE_CAST_SESSION:
      return {
        ...state,
        castSession: action.castSession
      };

    case types.UPDATE_IS_CAST_AVAILABLE:
      return {
        ...state,
        isCastAvailable: action.isCastAvailable
      };

    case types.UPDATE_IS_CHANGING_SOURCE:
      return {
        ...state,
        isChangingSource: action.isChangingSource
      };

    case types.UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist
      };

    case types.UPDATE_PICTURE_IN_PICTURE_SUPPORTED:
      return {
        ...state,
        isPictureInPictureSupported: action.isPictureInPictureSupported
      };

    case types.UPDATE_PICTURE_IN_PICTURE_MODE:
      return {
        ...state,
        isInPictureInPicture: action.isInPictureInPicture
      };

    case types.UPDATE_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.fullscreen
      };

    default:
      return state;
  }
};

export const actions = {
  updateHasError: (hasError: boolean) => ({type: types.UPDATE_ERROR, hasError: hasError}),
  updatePlayerState: (prevoiusState: string, currentState: string) => ({
    type: types.UPDATE_PLAYER_STATE,
    playerState: {prevoiusState, currentState}
  }),
  updatePrePlayback: (prePlayback: boolean) => ({type: types.UPDATE_PRE_PLAYBACK, prePlayback}),
  updateIsPlaying: (isPlaying: boolean) => ({type: types.UPDATE_IS_PLAYING, isPlaying}),
  updateIsPaused: (isPaused: boolean) => ({type: types.UPDATE_IS_PAUSED, isPaused}),
  updateIsSeeking: (isSeeking: boolean) => ({type: types.UPDATE_IS_SEEKING, isSeeking}),
  updateLastSeekPoint: (lastSeekPoint: number) => ({type: types.UPDATE_LAST_SEEK_POINT, lastSeekPoint}),
  updateIsEnded: (isEnded: boolean) => ({type: types.UPDATE_IS_ENDED, isEnded}),
  updateIsPlaybackStarted: (isPlaybackStarted: boolean) => ({type: types.UPDATE_IS_PLAYBACK_STARTED, isPlaybackStarted}),
  updateIsPlaybackEnded: (isPlaybackEnded: boolean) => ({type: types.UPDATE_IS_PLAYBACK_ENDED, isPlaybackEnded}),
  updateCurrentTime: (currentTime: number) => ({type: types.UPDATE_CURRENT_TIME, currentTime}),
  updateDuration: (duration: number) => ({type: types.UPDATE_DURATION, duration}),
  updateVolume: (volume: number) => ({type: types.UPDATE_VOLUME, volume}),
  updateMuted: (muted: boolean) => ({type: types.UPDATE_MUTED, muted}),
  updateMetadataLoadingStatus: (metadataLoaded: boolean) => ({
    type: types.UPDATE_METADATA_LOADING_STATUS,
    metadataLoaded
  }),
  updateDataLoadingStatus: (dataLoaded: boolean) => ({
    type: types.UPDATE_DATA_LOADING_STATUS,
    dataLoaded
  }),
  updateAudioTracks: (tracks: Array<any>) => ({type: types.UPDATE_AUDIO_TRACKS, tracks}),
  updateVideoTracks: (tracks: Array<any>) => ({type: types.UPDATE_VIDEO_TRACKS, tracks}),
  updateTextTracks: (tracks: Array<any>) => ({type: types.UPDATE_TEXT_TRACKS, tracks}),
  updateAdBreak: (adBreak: boolean) => ({type: types.UPDATE_AD_BREAK, adBreak}),
  updateAdBreakProgress: (currentTime: number, duration: number) => ({
    type: types.UPDATE_AD_BREAK_PROGRESS,
    adProgress: {currentTime, duration}
  }),
  updateAdBreakCompleted: () => ({type: types.UPDATE_AD_BREAK_COMPLETED}),
  updateAdIsPlaying: (adIsPlaying: boolean) => ({type: types.UPDATE_AD_IS_PLAYING, adIsPlaying}),
  updateAdSkipTimeOffset: (adSkipTimeOffset: boolean) => ({type: types.UPDATE_AD_SKIP_TIME_OFFSET, adSkipTimeOffset}),
  updateAdSkippableState: (adSkippableState: boolean) => ({type: types.UPDATE_AD_SKIPPABLE_STATE, adSkippableState}),
  updateAdClickUrl: (adUrl: string) => ({type: types.UPDATE_AD_URL, adUrl}),
  updateAdIsLinear: (adIsLinear: boolean) => ({type: types.UPDATE_AD_IS_LINEAR, adIsLinear}),
  updateAdIsBumper: (adIsBumper: boolean) => ({type: types.UPDATE_AD_IS_BUMPER, adIsBumper}),
  updateAdContentType: (adContentType: string) => ({type: types.UPDATE_AD_CONTENT_TYPE, adContentType}),
  updatePlayerPoster: (poster: string) => ({type: types.UPDATE_PLAYER_POSTER, poster}),
  updateIsAudio: (isAudio: boolean) => ({type: types.UPDATE_IS_AUDIO, isAudio}),
  updateIsLive: (isLive: boolean) => ({type: types.UPDATE_IS_LIVE, isLive}),
  updateIsDvr: (isDvr: boolean) => ({type: types.UPDATE_IS_DVR, isDvr}),
  updateIsImg: (isImg: boolean) => ({type: types.UPDATE_IS_IMG, isImg}),
  updateIsIdle: (IsIdle: boolean) => ({type: types.UPDATE_IS_IDLE, IsIdle: IsIdle}),
  updateFallbackToMutedAutoPlay: (fallback: boolean) => ({type: types.UPDATE_FALLBACK_TO_MUTED_AUTOPLAY, fallback}),
  updateIsVr: (isVr: boolean) => ({type: types.UPDATE_IS_VR, isVr}),
  updateVrStereoMode: (vrStereoMode: boolean) => ({type: types.UPDATE_VR_STEREO_MODE, vrStereoMode}),
  updateIsCasting: (isCasting: boolean) => ({type: types.UPDATE_IS_CASTING, isCasting}),
  updateCastSession: (castSession: Object) => ({type: types.UPDATE_CAST_SESSION, castSession}),
  updateIsCastAvailable: (isCastAvailable: boolean) => ({type: types.UPDATE_IS_CAST_AVAILABLE, isCastAvailable}),
  updateIsChangingSource: (isChangingSource: boolean) => ({
    type: types.UPDATE_IS_CHANGING_SOURCE,
    isChangingSource
  }),
  updatePlaylist: (playlist: Object) => ({type: types.UPDATE_PLAYLIST, playlist}),
  updatePictureInPictureSupport: (isPictureInPictureSupported: boolean) => ({
    type: types.UPDATE_PICTURE_IN_PICTURE_SUPPORTED,
    isPictureInPictureSupported
  }),
  updateIsInPictureInPicture: (isInPictureInPicture: boolean) => ({type: types.UPDATE_PICTURE_IN_PICTURE_MODE, isInPictureInPicture}),
  updateFullscreen: (fullscreen: boolean) => ({type: types.UPDATE_FULLSCREEN, fullscreen})
};
