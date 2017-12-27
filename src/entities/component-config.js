// @flow
export type UIComponentConfigObject = {
  component: string,
  config: Object
};

export default class UIComponentConfig {
  _component: string;
  _config: Object;

  get component(): string {
    return this._component;
  }

  get config(): Object {
    return this._config;
  }

  set config(value: Object): void {
    this._config = value;
  }

  constructor(component: string, config: Object) {
    this._component = component;
    this._config = config;
  }

  toJSON(): UIComponentConfigObject {
    return {
      component: this.component,
      config: this.config
    };
  }
}
