import '../../src/index';
import {BottomBarRegistryManager} from '../../src/components/bottom-bar';

describe('BottomBarRegistryManager', () => {
  const myComponentName = 'MyComponent';
  const iconDtoObj = {
    ariaLabel: 'aria label',
    displayName: myComponentName,
    order: 5,
    svgIcon: 'svg',
    onClick: () => {},
    component: () => {},
    shouldHandleOnClick: false
  };

  let bottomBarRegistryManager;

  beforeEach(() => {
    bottomBarRegistryManager = new BottomBarRegistryManager();
  });

  afterEach(() => {
    bottomBarRegistryManager = null;
  });

  describe('register API', () => {
    it('Should register a component to the manager', () => {
      bottomBarRegistryManager.register(myComponentName, iconDtoObj);
      bottomBarRegistryManager._registry.size.should.equal(1);
    });
  });

  describe('unregister API', () => {
    it('Should unregister a component from the manager', () => {
      bottomBarRegistryManager.register(myComponentName, iconDtoObj);
      bottomBarRegistryManager._registry.size.should.equal(1);
      bottomBarRegistryManager.unregister(myComponentName);
      bottomBarRegistryManager._registry.size.should.equal(0);
    });
  });

  describe('clear API', () => {
    it('Should clear the registry of the manager', () => {
      bottomBarRegistryManager.register(myComponentName, iconDtoObj);
      bottomBarRegistryManager._registry.size.should.equal(1);
      bottomBarRegistryManager.clear();
      bottomBarRegistryManager._registry.size.should.equal(0);
    });
  });

  describe('getComponentItem API', () => {
    it('Should get the added component item from the manager', () => {
      bottomBarRegistryManager.register(myComponentName, iconDtoObj);
      bottomBarRegistryManager.getComponentItem(myComponentName).should.equal(iconDtoObj);
    });
  });
});
