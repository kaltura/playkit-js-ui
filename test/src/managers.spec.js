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
    player.ui.managers.has('custom').should.be.false;
    player.ui.managers.register('custom', {key: 1});
    player.ui.managers.has('custom').should.be.true;
    player.ui.managers.get('custom').key.should.equals(1);
  });

  it('should not register custom manager if already registered', function () {
    player.ui.managers.register('custom', {key: 1});
    player.ui.managers.register('custom', {key: 2});
    player.ui.managers.get('custom').key.should.equals(1);
  });

  it('should call to manager destroy on player destroy', function (done) {
    player.ui.managers.register('custom', {destroy: () => done()});
    player.destroy();
  });
});
