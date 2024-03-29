import {KPUIComponentOptions} from './ui-component-options';

export interface KPUIAddComponent extends KPUIComponentOptions {
  get: (() => any) | string;
  props?: object;
}

export interface KPUIRemoveComponent {
  /** @deprecated Use area instead. */
  container?: string;
  removeComponent: string;
  presets: Array<string>;
  area: string;
}

export interface KPUIComponent extends KPUIAddComponent, KPUIRemoveComponent {}
