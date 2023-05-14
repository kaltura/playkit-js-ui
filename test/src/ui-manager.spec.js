import {setup} from '@playkit-js/kaltura-player-js';
import * as TestUtils from './utils/test-utils';
import {h, Component} from 'preact';

describe('UIManager', function () {
  const targetId = 'player-placeholder_ui.spec';
  class customComponent extends Component {
    render() {
      return <div className={'custom-component'} />;
    }
  }

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
    player.destroy();
  });

  after(function () {
    TestUtils.removeVideoElementsFromTestPage();
  });

  describe('addComponent', function () {
    it('Should exist but do nothing before ui built', function (done) {
      try {
        const func = player.ui.addComponent();
        (typeof func).should.equals('function');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('Should add a component in BottomBarLeftControls', function (done) {
      const removeFunc = player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarRightControls',
        get: customComponent
      });
      try {
        (typeof removeFunc).should.equals('function');
        setTimeout(() => {
          const rightControls = document.querySelector('.playkit-bottom-bar .playkit-right-controls');
          rightControls.lastElementChild.className.should.equals('custom-component');
          done();
        }, 0);
      } catch (e) {
        done(e);
      }
    });

    it('Should remove the injected component', function (done) {
      let rightControls;
      const removeFunc = player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarRightControls',
        get: customComponent
      });
      setTimeout(() => {
        try {
          rightControls = document.querySelector('.playkit-bottom-bar .playkit-right-controls');
          rightControls.lastElementChild.className.should.equals('custom-component');
          removeFunc();
          setTimeout(() => {
            rightControls.lastElementChild.className.should.not.equals('custom-component');
            done();
          }, 0);
        } catch (e) {
          done(e);
        }
      }, 0);
    });

    it('Should add a component before other', function (done) {
      let leftControls;
      player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarLeftControls',
        beforeComponent: 'Rewind',
        get: customComponent
      });
      setTimeout(() => {
        try {
          leftControls = document.querySelector('.playkit-bottom-bar .playkit-left-controls');
          const rewindIndex = Array.from(leftControls.children).findIndex(
            child => child.className === 'playkit-control-button-container playkit-control-rewind playkit-no-idle-control'
          );
          leftControls.children[rewindIndex - 1].className.should.equals('custom-component');
          done();
        } catch (e) {
          done(e);
        }
      }, 0);
    });

    it('Should add a component after other', function (done) {
      let leftControls;
      player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarLeftControls',
        afterComponent: 'Rewind',
        get: customComponent
      });
      setTimeout(() => {
        try {
          leftControls = document.querySelector('.playkit-bottom-bar .playkit-left-controls');
          const rewindIndex = Array.from(leftControls.children).findIndex(
            child => child.className === 'playkit-control-button-container playkit-control-rewind playkit-no-idle-control'
          );
          leftControls.children[rewindIndex + 1].className.should.equals('custom-component');
          done();
        } catch (e) {
          done(e);
        }
      }, 0);
    });

    it('Should replace a component', function (done) {
      let leftControls;
      player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarLeftControls',
        replaceComponent: 'Rewind',
        get: customComponent
      });
      setTimeout(() => {
        try {
          leftControls = document.querySelector('.playkit-bottom-bar .playkit-left-controls');
          const forwardIndex = Array.from(leftControls.children).findIndex(
            child => child.className === 'playkit-control-button-container playkit-control-forward playkit-no-idle-control'
          );
          leftControls.children[forwardIndex - 1].className.should.equals('custom-component');
          done();
        } catch (e) {
          done(e);
        }
      }, 0);
    });

    it('Should remove the injected component and re-append the replaced one', function (done) {
      let leftControls;
      const removeFunc = player.ui.addComponent({
        label: 'customComponent',
        presets: ['Playback'],
        container: 'BottomBarLeftControls',
        replaceComponent: 'Rewind',
        get: customComponent
      });
      setTimeout(() => {
        try {
          leftControls = document.querySelector('.playkit-bottom-bar .playkit-left-controls');
          const forwardIndex = Array.from(leftControls.children).findIndex(
            child => child.className === 'playkit-control-button-container playkit-control-forward playkit-no-idle-control'
          );
          leftControls.children[forwardIndex - 1].className.should.equals('custom-component');
          removeFunc();
          setTimeout(() => {
            leftControls.children[forwardIndex - 1].className.should.equals(
              'playkit-control-button-container playkit-control-rewind playkit-no-idle-control'
            );
            done();
          });
        } catch (e) {
          done(e);
        }
      }, 0);
    });
  });
});
