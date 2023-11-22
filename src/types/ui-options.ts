import {LoggerType} from '../utils/logger';
import {ComponentsConfig} from './components-config';
import {UserTheme} from './user-theme';
import {KPUIComponent} from '@playkit-js/kaltura-player-js';

export interface UIOptionsObject {
  targetId?: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  showCCButton?: boolean,
  settings?: {
    showAudioMenu?: boolean,
    showCaptionsMenu?: boolean,
    showQualityMenu?: boolean,
    showSpeedMenu?: boolean,
    showAdvancedAudioDescToggle?: boolean,
    showAdvancedCaptionsMenu?: boolean
  },
  hoverTimeout?: number,
  logger?: LoggerType,
  components: ComponentsConfig,
  uiComponents?: Array<KPUIComponent>,
  translations?: {[langKey: string]: any},
  locale?: string;
  userTheme?: UserTheme
};
