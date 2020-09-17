// @flow

import {Component} from 'preact';

declare type SeekbarPreviewOptionsObject = {
  get: Component | string,
  props?: Object,
  presets?: Array<string>,
  width?: number,
  height?: number,
  className?: string,
  hideTime?: boolean,
  sticky?: boolean
};
