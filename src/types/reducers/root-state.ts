import {ShellState} from './shell';
import {VolumeState} from './voluem';
import {SeekbarState} from './seekbar';
import {SettingsState} from './settings';
import {LoadingState} from './loading';
import {OverlayActionsState} from './overlay-actions';
import {OverlayState} from './overlay';
import {CvaaState} from './cvaa';
import {EngineState} from './engine';
import {ConfigState} from './config';
import { PlaylistState } from './playlist';

export interface RootState {
  config: ConfigState;
  engine: EngineState;
  shell: ShellState;
  seekbar: SeekbarState;
  volume: VolumeState;
  loading: LoadingState;
  cvaa: CvaaState;
  settings: SettingsState;
  overlayAction: OverlayActionsState;
  playlist: PlaylistState;
  overlay: OverlayState;
}
