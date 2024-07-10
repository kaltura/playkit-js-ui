import '../../src/index';
import {BottomBarRegistryManager} from '../../src/components/bottom-bar';

describe('BottomBarRegistryManager', function () {
  const myComponentName = 'MyComponent';
  const iconDto = {
    ariaLabel: 'aria label',
    displayName: myComponentName,
    order: 5,
    svgIcon: 'svg',
    onClick: () => {},
    component: () => {},
    shouldHandleOnClick: false
  };

  let bottomBarRegistryManager;

  beforeEach(function () {
    bottomBarRegistryManager = new BottomBarRegistryManager();
  });

  afterEach(function () {
    bottomBarRegistryManager = null;
  });

  describe('register API', function () {
    it('Should register a component to the manager', function (done) {
      bottomBarRegistryManager.register(myComponentName, iconDto);
      bottomBarRegistryManager.registry.size.should.equal(1);
      done();
    });
  });

  describe('unregister API', function () {
    it('Should unregister a component from the manager', function (done) {
      bottomBarRegistryManager.register(myComponentName, iconDto);
      bottomBarRegistryManager.registry.size.should.equal(1);
      bottomBarRegistryManager.unregister(myComponentName);
      bottomBarRegistryManager.registry.size.should.equal(0);
      done();
    });
  });

  describe('clear API', function () {
    it('Should clear the registry of the manager', function (done) {
      bottomBarRegistryManager.register(myComponentName, iconDto);
      bottomBarRegistryManager.registry.size.should.equal(1);
      bottomBarRegistryManager.clear();
      bottomBarRegistryManager.registry.size.should.equal(0);
      done();
    });
  });
});
