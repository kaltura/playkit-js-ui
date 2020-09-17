// @flow

import {Component} from 'preact';

declare type CuePointOptionsObject = {
  time: number,
  presets?: Array<string>,
  marker?: MarkerOptionsObject,
  preview?: PreviewOptionsObject
};

declare type MarkerOptionsObject = {
  get: Component | string,
  props?: Object,
  color?: string,
  width?: number,
  className?: string
};

declare type PreviewOptionsObject = {
  get: Component | string,
  props?: Object,
  width?: number,
  height?: number,
  className?: string,
  hideTime?: boolean,
  sticky?: boolean
};


