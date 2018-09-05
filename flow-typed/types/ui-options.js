// @flow
declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  logLevel?: string,
  components?: ComponentsConfig
  _translations?: {[langKey: string]: Object},
  _locale?: string
};
