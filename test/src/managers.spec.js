import {setup} from 'kaltura-player-js';
import * as TestUtils from './utils/test-utils';

describe('Managers', function () {
  const targetId = 'player-placeholder_ui.spec';
  let player;
  const config = {
    targetId,
    provider: {}
  };

  before(function () {
    TestUtils.createElement('DIV', targetId);
  });

  beforeEach(function () {
    player = setup(config);
  });

  afterEach(function () {
    try {
      player.destroy();
    } catch (e) {
      // Do nothing
    }
  });

  after(function () {
    TestUtils.removeVideoElementsFromTestPage();
  });

  it('should register timeline manager by default', function () {
    player.ui.managers.hasManager('timeline').should.be.true;
    player.ui.managers.getManager('timeline').should.be.exist;
  });

  it('should register custom manager', function () {
    player.ui.managers.hasManager('custom').should.be.false;
    player.ui.managers.registerManager('custom', {key: 1});
    player.ui.managers.hasManager('custom').should.be.true;
    player.ui.managers.getManager('custom').key.should.equals(1);
  });

  it('should not register custom manager if already registered', function () {
    player.ui.managers.registerManager('custom', {key: 1});
    player.ui.managers.registerManager('custom', {key: 2});
    player.ui.managers.getManager('custom').key.should.equals(1);
  });

  it('should call to manager destroy on player destroy', function (done) {
    player.ui.managers.registerManager('custom', {destroy: () => done()});
    player.destroy();
  });
});
