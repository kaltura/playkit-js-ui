// @flow
import {loggerType} from '../../src/utils/logger';

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  showCCButton?: boolean,
  hoverTimeout?: number,
  logger?: loggerType,
  components?: ComponentsConfig,
  uiComponents?: Array<KPUIComponent>,
  translations?: {[langKey: string]: Object},
  locale?: string;
  userTheme?: UserTheme
};
