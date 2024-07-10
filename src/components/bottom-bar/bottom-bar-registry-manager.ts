export interface IconComponent {
  registerComponent(): any;
  getSvgIcon(): any;
  getComponentText(): any;
}

export class BottomBarRegistryManager {
  private _registry: Map<string, any>;

  constructor() {
    this._registry = new Map();
  }

  public register(componentName: string, componentIcon: any): void {
    if (!this.getComponentItem(componentName)) {
      this._registry.set(componentName, componentIcon);
    }
  }

  public unregister(componentName: string): void {
    if (this.getComponentItem(componentName)) {
      this._registry.delete(componentName);
    }
  }

  public getComponentItem(componentName: string): any {
    return this._registry.get(componentName);
  }

  public clear(): void {
    this._registry.clear();
  }
}

export const bottomBarRegistryManager: string = 'bottomBarRegistryManager';

export const registerToBottomBar = (componentName: string, player: any, getIconDtoCallback: () => any): void => {
  const bottomBarRegistry = (player?.getService(bottomBarRegistryManager) as BottomBarRegistryManager) || undefined;
  if (bottomBarRegistry && !bottomBarRegistry.getComponentItem(componentName)) {
    bottomBarRegistry.register(componentName, getIconDtoCallback());
  }
};
