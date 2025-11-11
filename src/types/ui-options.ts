import {LoggerType} from '../utils/logger';
import {ComponentsConfig} from './components-config';
import {UserTheme} from './user-theme';
import {KPUIComponent} from './ui-component';

export interface UIOptionsObject {
  targetId: string;
  debugActions?: boolean;
  forceTouchUI?: boolean;
  showCCButton?: boolean;
  showTitleOnUpperBar?: boolean;
  showAudioDescriptionButton?: boolean;
  openMenuFromCCButton?: boolean;
  openMenuFromAudioDescriptionButton?: boolean;
  showAudioButton?: boolean;
  settings?: {
    showAudioMenu?: boolean;
    showCaptionsMenu?: boolean;
    showQualityMenu?: boolean;
    showSpeedMenu?: boolean;
    showAdvancedCaptionsMenu?: boolean;
    showAudioDescriptionMenu?: boolean;
  };
  hoverTimeout?: number;
  logger?: LoggerType;
  components?: ComponentsConfig;
  uiComponents?: Array<KPUIComponent>;
  translations?: {[langKey: string]: any};
  locale?: string;
  userTheme?: UserTheme;
  isCopyProtected?: boolean;
}
