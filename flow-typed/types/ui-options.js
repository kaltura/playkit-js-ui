// @flow
declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  logLevel?: string,
  components?: ComponentsConfig,
  translations?: {[langKey: string]: Object},
  locale?: string
};
