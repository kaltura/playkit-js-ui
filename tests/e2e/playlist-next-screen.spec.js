/**
 * Playlist end-slate countdown
 *
 * Without countdown.timeToShow the "Up next" countdown runs on the end-slate after the video ended,
 * instead of the in-video pop-up that can cover the captions. With countdown.timeToShow the pop-up stays.
 */

import {h, render} from 'preact';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {IntlProvider} from 'preact-i18n';
import {PlayerProvider} from '../../src/components/player';
import {PlaylistNextScreen} from '../../src/components/playlist-next-screen/playlist-next-screen';
import {hasTimeToShow} from '../../src/utils';
import playlistReducer from '../../src/reducers/playlist';

describe('Playlist end-slate countdown', function () {
  const realSetTimeout = window.setTimeout;
  const next = {sources: {id: '1_next', poster: '', metadata: {name: 'Next video'}}};
  let container, clock, store, player;

  const flush = () => new Promise(resolve => realSetTimeout(resolve, 0));
  const tick = async seconds => {
    for (let i = 0; i < seconds; i++) {
      clock.tick(1000);
      await flush();
    }
  };
  const keydown = (el, keyCode) => {
    const event = new KeyboardEvent('keydown', {bubbles: true, cancelable: true});
    Object.defineProperty(event, 'keyCode', {get: () => keyCode});
    el.dispatchEvent(event);
  };
  const createPlayer = ({countdown = {}, options = {}} = {}) => ({
    playlist: {
      countdown: {duration: 3, showing: true, ...countdown},
      options: {autoContinue: true, loop: false, ...options},
      playNext: sinon.spy()
    }
  });
  const mount = async (Component, ctx = {}) => {
    player = ctx.player || createPlayer();
    store = createStore(
      combineReducers({
        engine: (state = {playlist: {next}, isPlaybackEnded: ctx.ended !== false}, action) =>
          action.type === 'TEST_SET_ENDED' ? {...state, isPlaybackEnded: action.ended} : state,
        playlist: playlistReducer
      })
    );
    render(
      <Provider store={store}>
        <IntlProvider definition={{}}>
          <PlayerProvider player={player}>
            <Component />
          </PlayerProvider>
        </IntlProvider>
      </Provider>,
      container
    );
    await flush();
  };
  const setEnded = async ended => {
    store.dispatch({type: 'TEST_SET_ENDED', ended});
    await flush();
  };
  const mountAndEnd = async () => {
    await mount(PlaylistNextScreen, {ended: false});
    await setEnded(true);
  };
  const poster = () => container.querySelector('[role="button"]');
  const cancelButton = () => container.querySelector('button');
  const title = () => container.textContent;

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    clock = sinon.useFakeTimers({toFake: ['setInterval', 'clearInterval']});
  });

  afterEach(function () {
    clock.restore();
    render(null, container);
    document.body.removeChild(container);
  });

  describe('timeToShow not configured', function () {
    it('should count down on the end-slate and play the next item when the countdown is over', async function () {
      await mount(PlaylistNextScreen, {ended: false});
      (container.firstChild === null).should.equal(true);
      await setEnded(true);
      title().should.include('3');
      await tick(2);
      title().should.include('1');
      player.playlist.playNext.should.not.have.been.called;
      await tick(1);
      player.playlist.playNext.should.have.been.calledOnce;
    });

    it('should start the countdown when mounted while playback already ended', async function () {
      await mount(PlaylistNextScreen);
      await tick(3);
      player.playlist.playNext.should.have.been.calledOnce;
    });

    it('should play the next item at once when countdown.duration is 0', async function () {
      await mount(PlaylistNextScreen, {player: createPlayer({countdown: {duration: 0}})});
      player.playlist.playNext.should.have.been.calledOnce;
    });

    it('should cancel the countdown with the cancel button and give the focus back to the poster', async function () {
      await mountAndEnd();
      cancelButton().focus();
      cancelButton().click();
      await flush();
      await tick(10);
      player.playlist.playNext.should.not.have.been.called;
      (cancelButton() === null).should.equal(true);
      document.activeElement.should.equal(poster());
      poster().click();
      player.playlist.playNext.should.have.been.calledOnce;
    });

    it('should cancel the countdown with ESC while the cancel button has the focus', async function () {
      await mountAndEnd();
      cancelButton().focus();
      keydown(cancelButton(), 27);
      await flush();
      await tick(10);
      player.playlist.playNext.should.not.have.been.called;
    });

    it('should cancel the countdown with ESC while the poster has the focus', async function () {
      await mountAndEnd();
      poster().focus();
      keydown(poster(), 27);
      await flush();
      await tick(10);
      player.playlist.playNext.should.not.have.been.called;
    });

    it('should play the next item with ENTER on the poster', async function () {
      await mountAndEnd();
      keydown(poster(), 13);
      player.playlist.playNext.should.have.been.calledOnce;
    });

    it('should count down again after a canceled item is played again', async function () {
      await mountAndEnd();
      cancelButton().click();
      await flush();
      await setEnded(false);
      await setEnded(true);
      (cancelButton() === null).should.equal(false);
      await tick(3);
      player.playlist.playNext.should.have.been.calledOnce;
    });
  });

  describe('timeToShow configured', function () {
    it('should not show the end-slate countdown for a number', async function () {
      await mount(PlaylistNextScreen, {player: createPlayer({countdown: {timeToShow: 5}})});
      (container.firstChild === null).should.equal(true);
      await tick(10);
      player.playlist.playNext.should.not.have.been.called;
    });

    it('should not show the end-slate countdown for a numeric string', async function () {
      await mount(PlaylistNextScreen, {player: createPlayer({countdown: {timeToShow: '5'}})});
      (container.firstChild === null).should.equal(true);
    });

    it('should count 0 as configured', function () {
      hasTimeToShow(0).should.equal(true);
      hasTimeToShow('0').should.equal(true);
    });

    it('should count unset or not numeric values as not configured', function () {
      [undefined, null, '', 'abc', NaN].forEach(value => hasTimeToShow(value).should.equal(false));
    });
  });

  describe('other playlist settings', function () {
    it('should show the end-slate without a countdown when autoContinue is false', async function () {
      await mount(PlaylistNextScreen, {player: createPlayer({options: {autoContinue: false}})});
      poster().should.exist;
      (cancelButton() === null).should.equal(true);
      await tick(10);
      player.playlist.playNext.should.not.have.been.called;
    });

    it('should not show the end-slate when countdown.showing is false', async function () {
      await mount(PlaylistNextScreen, {player: createPlayer({countdown: {showing: false}})});
      (container.firstChild === null).should.equal(true);
    });
  });
});
