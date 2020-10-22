// @flow

declare type SeekbarPreviewOptionsObject = {
  get: Function | string,
  props?: Object,
  presets?: Array<string>,
  width?: number,
  height?: number,
  className?: string,
  hideTime?: boolean,
  sticky?: boolean
};
