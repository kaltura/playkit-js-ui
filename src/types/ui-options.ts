import {LoggerType} from '../utils/logger';
import {ComponentsConfig} from './components-config';
import {UserTheme} from './user-theme';
import {KPUIComponent} from './ui-component';
import {MediaInfoConfig} from './media-info-config';
import {ButtonsConfig} from './buttons-config';

export interface UIOptionsObject {
  targetId: string;
  debugActions?: boolean;
  forceTouchUI?: boolean;
  allowPlayPause?: boolean;
  allowLivePlayPause?: boolean;
  showCCButton?: boolean;
  showSpeedButton?: boolean;
  showTitleOnUpperBar?: boolean;
  showAudioDescriptionButton?: boolean;
  showMediaInfo?: MediaInfoConfig;
  openMenuFromCCButton?: boolean;
  openMenuFromAudioDescriptionButton?: boolean;
  showAudioButton?: boolean;
  showQualityButton?: boolean;
  settings?: {
    showAudioMenu?: boolean;
    showCaptionsMenu?: boolean;
    showQualityMenu?: boolean;
    showSpeedMenu?: boolean;
    showAdvancedCaptionsMenu?: boolean;
    showAudioDescriptionMenu?: boolean;
  };
  seekSeconds?: number;
  hoverTimeout?: number;
  logger?: LoggerType;
  buttons?: ButtonsConfig;
  components?: ComponentsConfig;
  uiComponents?: Array<KPUIComponent>;
  translations?: {[langKey: string]: any};
  locale?: string;
  userTheme?: UserTheme;
  isCopyProtected?: boolean;
}
