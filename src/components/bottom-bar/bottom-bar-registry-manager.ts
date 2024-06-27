export interface IconComponent {
  registerComponent(): any;
  getSvgIcon(): any;
  getComponentText(): any;
}

export class BottomBarRegistry {
  private _registry: Map<string, any>;

  constructor() {
    this._registry = new Map();
  }

  public register(component: string, componentIcon: any): void {
    if(!this._registry.get(component)) {
      this._registry.set(component, componentIcon);
    }
  }

  public unregister(component: string): void {
    if (this._registry.get(component)) {
      this._registry.delete(component);
    }
  }

  public get registry(): Map<string, any> {
    return this._registry;
  }

  public clear(): void {
    this._registry.clear();
  }
}

export const bottomBarRegistryManager: string = 'bottomBarRegistryManager';

export const registerToBottomBar = (compName: string, player: any, getIconDtoCallback: () => any): void => {
  const bottomBarRegistry = player?.getService(bottomBarRegistryManager) as BottomBarRegistry || undefined;
  if (bottomBarRegistry && !bottomBarRegistry.registry.get(compName)) {
    bottomBarRegistry.register(compName, getIconDtoCallback());
  }
}
