// @flow

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  log?: UILogConfigObject,
  components?: ComponentsConfig,
  uiComponents?: Array<UIComponent>,
  translations?: {[langKey: string]: Object},
  locale?: string
};
