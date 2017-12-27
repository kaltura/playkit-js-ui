// @flow
import UIManager from './ui-manager';
import UIOptions from './entities/ui-options';
import UIComponentConfig from './entities/component-config';

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';

// ui presets
export {default as playbackUI} from './ui-presets/playback';
export {default as adsUI} from './ui-presets/ads';
export {default as liveUI} from './ui-presets/live';
export {default as errorUI} from './ui-presets/error'

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
export {ErrorOverlay} from './components/error-overlay';

export {UIOptions};
export {UIComponentConfig};

export default UIManager;
export {__VERSION__ as VERSION, __NAME__ as NAME};
