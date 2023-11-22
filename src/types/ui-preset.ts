import {ComponentChild} from 'preact';

export type UIPreset = {
  template: (props: any) => ComponentChild,
  condition?: (state: any) => boolean
};
