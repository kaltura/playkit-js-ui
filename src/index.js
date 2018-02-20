// @flow
import UIManager from './ui-manager'

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';

// ui presets
import * as presets from './ui-presets';
export {presets};
// components
import * as components from './components'
export {components};
// export {OverlayAction} from './components/overlay-action';
// export {PrePlaybackPlayOverlay} from './components/pre-playback-play-overlay';
// export {Loading} from './components/loading';
// export {PlayPauseControl} from './components/play-pause';
// export {SeekBarControl} from './components/seekbar';
// export {VolumeControl} from './components/volume';
// export {ShareControl} from './components/share'
// export {SettingsControl} from './components/settings';
// export {LanguageControl} from './components/language';
// export {FullscreenControl} from './components/fullscreen';
// export {TimeDisplay} from './components/time-display';
// export {TopBar} from './components/top-bar';
// export {BottomBar} from './components/bottom-bar';
// export {OverlayPortal} from './components/overlay-portal';
// export {KeyboardControl} from './components/keyboard';
// export {ErrorOverlay} from './components/error-overlay';

export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
