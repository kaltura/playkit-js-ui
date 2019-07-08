// @flow

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  log?: UILogConfigObject,
  components?: ComponentsConfig,
  presetComponents?: PresetComponent[],
  translations?: {[langKey: string]: Object},
  locale?: string
};
