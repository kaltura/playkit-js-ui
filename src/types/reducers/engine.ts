import { AudioTrack, PKTextTrack, VideoTrack } from '@playkit-js/playkit-js';

export interface EngineState {
  isIdle: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isSeeking: boolean;
  isEnded: boolean;
  isPlaybackStarted: boolean;
  isPlaybackEnded: boolean;
  isChangingSource: boolean;
  prePlayback: boolean;
  metadataLoaded: boolean;
  dataLoaded: boolean;
  playerState: {
    previousState: string;
    currentState: string;
  };
  fallbackToMutedAutoPlay: boolean;
  poster: string;
  currentTime: number;
  lastSeekPoint: number;
  duration: number;
  volume: number;
  muted: boolean;
  videoTracks: VideoTrack[];
  audioTracks: AudioTrack[];
  textTracks: PKTextTrack[];
  adIsLinear: boolean;
  adBreak: boolean;
  adIsPlaying: boolean;
  adSkipTimeOffset: number;
  adSkippableState: boolean;
  adIsBumper: boolean;
  adContentType: string | null;
  isLive: boolean;
  isDvr: boolean;
  isImg: boolean;
  isAudio: boolean;
  adProgress: {
    currentTime: number;
    duration: number;
  };
  adUrl: string;
  hasError: boolean;
  isVr: boolean;
  vrStereoMode: boolean;
  isCasting: boolean;
  castSession: any; // Specify a more detailed type if possible
  isCastAvailable: boolean;
  pictureInPictureSupported: boolean;
  isInPictureInPicture: boolean;
  playlist: any; // Specify a more detailed type if possible
  fullscreen: boolean;
}
