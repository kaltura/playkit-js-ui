// @flow

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  log?: UILogConfigObject,
  components?: ComponentsConfig,
  uiComponents?: Array<PKUIComponent>,
  translations?: {[langKey: string]: Object},
  locale?: string,
  disable?: boolean,
  css?: string,
  customPreset?: Array<{template: Function, condition: Function}>
};
