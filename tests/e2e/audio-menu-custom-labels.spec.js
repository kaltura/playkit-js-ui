import '../../src/index';
import {h, render, Component} from 'preact';
import {Provider} from 'react-redux';
import {AudioMenu} from '../../src/components/audio-menu';

class TestProvider extends Component {
  getChildContext() {
    return {
      player: this.props.player,
      notifyClick: () => {},
      notifyChange: () => {},
      notifyHoverChange: () => {}
    };
  }
  render() {
    return this.props.children;
  }
}

function createMockStore(audioTracks) {
  const state = {
    engine: {audioTracks},
    audioDescription: {
      isEnabled: false,
      audioDescriptionLanguages: [],
      advancedAudioDescriptionLanguages: [],
      selectionByLanguage: new Map(),
      isDefaultValueSet: false,
      selectedAudioLanguage: null
    },
    shell: {
      isMobile: false,
      isSmallSize: false,
      guiClientRect: {bottom: 1000, height: 800},
      topBarClientRect: {bottom: 0, height: 50}
    },
    settings: {}
  };
  return {
    getState: () => state,
    subscribe: () => () => {},
    dispatch: () => {}
  };
}

function createMockPlayer(customLabelsAudio) {
  return {
    config: customLabelsAudio ? {customLabels: {audio: customLabelsAudio}} : {},
    Track: {AUDIO: 'audio'},
    selectTrack: () => {},
    getActiveTracks: () => ({audio: {language: 'en'}}),
    ui: {
      store: {
        getState: () => ({overlay: {isOpen: false}})
      }
    }
  };
}

const mockAudioTracks = [
  {id: 0, label: 'English', language: 'en'},
  {id: 1, label: 'French', language: 'fr'}
];

describe('AudioMenu - customLabels.audio resolver', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    render(null, container);
    document.body.removeChild(container);
  });

  it('should apply customLabels.audio resolver to rendered audio track labels', done => {
    const customResolver = track => `Resolved-${track.language.toUpperCase()}`;
    const mockPlayer = createMockPlayer(customResolver);

    render(
      <Provider store={createMockStore(mockAudioTracks)}>
        <TestProvider player={mockPlayer}>
          <AudioMenu />
        </TestProvider>
      </Provider>,
      container
    );

    setTimeout(() => {
      try {
        const options = container.querySelectorAll('[role="option"]');
        options.length.should.equal(2);
        const labels = Array.from(options).map(el => el.querySelector('span').textContent.trim());
        labels[0].should.include('Resolved-EN');
        labels[1].should.include('Resolved-FR');
        done();
      } catch (e) {
        done(e);
      }
    }, 0);
  });

  it('should fall back to track.label when customLabels.audio is not configured', done => {
    const mockPlayer = createMockPlayer(null);

    render(
      <Provider store={createMockStore(mockAudioTracks)}>
        <TestProvider player={mockPlayer}>
          <AudioMenu />
        </TestProvider>
      </Provider>,
      container
    );

    setTimeout(() => {
      try {
        const options = container.querySelectorAll('[role="option"]');
        options.length.should.equal(2);
        const labels = Array.from(options).map(el => el.querySelector('span').textContent.trim());
        labels[0].should.include('English');
        labels[1].should.include('French');
        done();
      } catch (e) {
        done(e);
      }
    }, 0);
  });
});
