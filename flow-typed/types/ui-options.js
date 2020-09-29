// @flow
import {loggerFunctionType} from '../../src/utils/logger';

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  logger?: loggerFunctionType,
  components?: ComponentsConfig,
  uiComponents?: Array<KPUIComponent>,
  translations?: {[langKey: string]: Object},
  locale?: string
};
