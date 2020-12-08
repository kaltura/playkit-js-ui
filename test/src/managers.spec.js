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

  it('should register custom manager', function () {
    player.ui.hasManager('custom').should.be.false;
    player.ui.registerManager('custom', {key: 1});
    player.ui.hasManager('custom').should.be.true;
    player.ui.getManager('custom').key.should.equals(1);
  });

  it('should not register custom manager if already registered', function () {
    player.ui.registerManager('custom', {key: 1});
    player.ui.registerManager('custom', {key: 2});
    player.ui.getManager('custom').key.should.equals(1);
  });

  it('should call to manager destroy on player destroy', function (done) {
    player.ui.registerManager('custom', {destroy: () => done()});
    player.destroy();
  });
});
