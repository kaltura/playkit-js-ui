// @flow
declare type ComponentsConfig = {
  seekbar?: SeekbarConfig,
  watermark?: WatermarkConfig,
  share?: ShareConfig
};

type ExternalPresetComponent = {
  presets?: Array<string>,
  container: string,
  componentName?: string,
  component: Function,
  position?: string,
  context?: any
};
