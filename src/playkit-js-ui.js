// @flow
import UIManager from './ui-manager';

export {h} from 'preact';

// ui presets
export {default as playbackUI} from './ui-presets/playback';
export {default as adsUI} from './ui-presets/ads';
export {default as liveUI} from './ui-presets/live';

// components
export {OverlayPlay} from './components/overlay-play';
export {PrePlaybackPlayOverlay} from './components/pre-playback-play-overlay';
export {Loading} from './components/loading';
export {PlayPauseControl} from './components/play-pause';
export {SeekBarControl} from './components/seekbar';
export {VolumeControl} from './components/volume';
export {ShareControl} from './components/share'
export {SettingsControl} from './components/settings';
export {LanguageControl} from './components/language';
export {FullscreenControl} from './components/fullscreen';
export {TimeDisplay} from './components/time-display';
export {TopBar} from './components/top-bar';
export {BottomBar} from './components/bottom-bar';
export {OverlayPortal} from './components/overlay-portal';
export {KeyboardControl} from './components/keyboard';

export default UIManager;
