//@flow
import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from '../utils/component-config';
import {types as configReducerTypes} from './config';

const component = 'engine';

export const types = {
  UPDATE_PLAYER_STATE: 'engine/UPDATE_PLAYER_STATE',
  UPDATE_IS_PLAYING: 'engine/UPDATE_IS_PLAYING',
  UPDATE_IS_PAUSED: 'engine/UPDATE_IS_PAUSED',
  UPDATE_IS_CHANGING_SOURCE: 'engine/UPDATE_IS_CHANGING_SOURCE',
  UPDATE_IS_ENDED: 'engine/UPDATE_IS_ENDED',
  UPDATE_CURRENT_TIME: 'engine/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'engine/UPDATE_DURATION',
  UPDATE_VOLUME: 'engine/UPDATE_VOLUME',
  UPDATE_MUTED: 'engine/UPDATE_MUTED',
  UPDATE_METADATA_LOADING_STATUS: 'engine/UPDATE_METADATA_LOADING_STATUS',
  UPDATE_AUDIO_TRACKS: 'engine/UPDATE_AUDIO_TRACKS',
  UPDATE_VIDEO_TRACKS: 'engine/UPDATE_VIDEO_TRACKS',
  UPDATE_TEXT_TRACKS: 'engine/UPDATE_TEXT_TRACKS',
  UPDATE_AD_BREAK: 'engine/UPDATE_AD_BREAK',
  UPDATE_AD_BREAK_PROGRESS: 'engine/UPDATE_AD_BREAK_PROGRESS',
  UPDATE_AD_BREAK_COMPLETED: 'engine/UPDATE_AD_BREAK_COMPLETED',
  UPDATE_AD_IS_PLAYING: 'engine/UPDATE_AD_IS_PLAYING',
  UPDATE_AD_SKIP_TIME_OFFSET: 'engine/UPDATE_AD_SKIP_TIME_OFFSET',
  UPDATE_AD_SKIPPABLE_STATE: 'engine/UPDATE_AD_SKIPPABLE_STATE',
  UPDATE_AD_URL: 'engine/UPDATE_AD_URL',
  UPDATE_AD_IS_LINEAR: 'engine/UPDATE_AD_IS_LINEAR',
  UPDATE_PLAYER_POSTER: 'engine/UPDATE_PLAYER_POSTER',
  UPDATE_IS_LIVE: 'engine/UPDATE_IS_LIVE',
  UPDATE_IS_DVR: 'engine/UPDATE_IS_DVR',
  UPDATE_ERROR: 'engine/ERROR',
  UPDATE_IS_IDLE: 'engine/UPDATE_IS_IDLE',
  UPDATE_FALLBACK_TO_MUTED_AUTOPLAY: 'engine/UPDATE_FALLBACK_TO_MUTED_AUTOPLAY',
  UPDATE_IS_VR: 'engine/UPDATE_IS_VR',
  UPDATE_VR_STEREO_MODE: 'engine/UPDATE_VR_STEREO_MODE',
  UPDATE_IS_CASTING: 'engine/UPDATE_IS_CASTING',
  UPDATE_CAST_SESSION: 'engine/UPDATE_CAST_SESSION',
  UPDATE_IS_CAST_AVAILABLE: 'engine/UPDATE_IS_CAST_AVAILABLE',
  UPDATE_CAST_AVAILABLE_TYPES: 'engine/UPDATE_CAST_AVAILABLE_TYPES'
};

export const initialState = {
  isIdle: false,
  isPlaying: false,
  isPaused: false,
  isEnded: false,
  isChangingSource: false,
  metadataLoaded: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  fallbackToMutedAutoPlay: false,
  poster: '',
  currentTime: 0,
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
  isLive: false,
  isDvr: false,
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
  castAvailableTypes: []
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

    case types.UPDATE_IS_ENDED:
      return {
        ...state,
        isEnded: action.isEnded
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

    case types.UPDATE_PLAYER_POSTER:
      return {
        ...state,
        poster: action.poster
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

    case types.UPDATE_CAST_AVAILABLE_TYPES: {
      if (!state.castAvailableTypes.includes(action.castType)) {
        state.castAvailableTypes.push(action.castType);
      }
      return state;
    }

    case types.UPDATE_IS_CHANGING_SOURCE:
      return {
        ...state,
        isChangingSource: action.isChangingSource
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
  updateIsPlaying: (isPlaying: boolean) => ({type: types.UPDATE_IS_PLAYING, isPlaying}),
  updateIsPaused: (isPaused: boolean) => ({type: types.UPDATE_IS_PAUSED, isPaused}),
  updateIsEnded: (isEnded: boolean) => ({type: types.UPDATE_IS_ENDED, isEnded}),
  updateCurrentTime: (currentTime: number) => ({type: types.UPDATE_CURRENT_TIME, currentTime}),
  updateDuration: (duration: number) => ({type: types.UPDATE_DURATION, duration}),
  updateVolume: (volume: number) => ({type: types.UPDATE_VOLUME, volume}),
  updateMuted: (muted: boolean) => ({type: types.UPDATE_MUTED, muted}),
  updateMetadataLoadingStatus: (metadataLoaded: boolean) => ({
    type: types.UPDATE_METADATA_LOADING_STATUS,
    metadataLoaded
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
  updatePlayerPoster: (poster: string) => ({type: types.UPDATE_PLAYER_POSTER, poster}),
  updateIsLive: (isLive: boolean) => ({type: types.UPDATE_IS_LIVE, isLive}),
  updateIsDvr: (isDvr: boolean) => ({type: types.UPDATE_IS_DVR, isDvr}),
  updateIsIdle: (IsIdle: boolean) => ({type: types.UPDATE_IS_IDLE, IsIdle: IsIdle}),
  updateFallbackToMutedAutoPlay: (fallback: boolean) => ({type: types.UPDATE_FALLBACK_TO_MUTED_AUTOPLAY, fallback}),
  updateIsVr: (isVr: boolean) => ({type: types.UPDATE_IS_VR, isVr}),
  updateVrStereoMode: (vrStereoMode: boolean) => ({type: types.UPDATE_VR_STEREO_MODE, vrStereoMode}),
  updateIsCasting: (isCasting: boolean) => ({type: types.UPDATE_IS_CASTING, isCasting}),
  updateCastSession: (castSession: Object) => ({type: types.UPDATE_CAST_SESSION, castSession}),
  updateIsCastAvailable: (isCastAvailable: boolean) => ({type: types.UPDATE_IS_CAST_AVAILABLE, isCastAvailable}),
  updateCastAvailableTypes: (castType: string) => ({type: types.UPDATE_CAST_AVAILABLE_TYPES, castType}),
  updateIsChangingSource: (isChangingSource: boolean) => ({
    type: types.UPDATE_IS_CHANGING_SOURCE,
    isChangingSource
  })
};
