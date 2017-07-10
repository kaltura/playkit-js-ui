// @flow
import UIManager from './ui-manager';
import { h } from 'preact';

// ui presets
import playbackUI from './ui-presets/playback';
import adsUI from './ui-presets/ads';
import fullscreenUI from './ui-presets/fullscreen';

// components
import OverlayPlay from './components/overlay-play/overlay-play';
import PrePlaybackPlayOverlay from './components/pre-playback-play-overlay/pre-playback-play-overlay';
import Loading from './components/loading/loading';
import PlayPauseControl from './components/play-pause/play-pause';
import SeekBarControl from './components/seekbar/seekbar';
import VolumeControl from './components/volume/volume';
import ShareControl from './components/share/share'
import SettingsControl from './components/settings/settings';
import LanguageControl from './components/language/language';
import FullscreenControl from './components/fullscreen/fullscreen';
import TimeDisplay from './components/time-display/time-display';
import TopBar from './components/top-bar/top-bar';
import BottomBar from './components/bottom-bar/bottom-bar';
import OverlayPortal from './components/overlay-portal/overlay-portal';
import KeyboardControl from './components/keyboard';

export default UIManager
export { h }
export { playbackUI, adsUI, fullscreenUI }
export {
  OverlayPlay,
  PrePlaybackPlayOverlay,
  Loading,
  PlayPauseControl,
  SeekBarControl,
  VolumeControl,
  ShareControl,
  SettingsControl,
  LanguageControl,
  FullscreenControl,
  TimeDisplay,
  TopBar,
  BottomBar,
  OverlayPortal,
  KeyboardControl
}
