// @flow
declare type UIPreset = {
  template: (props: Object) => any,
  condition?: (state: Object) => boolean
};
