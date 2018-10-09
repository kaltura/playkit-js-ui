//@flow
import {h, Component} from 'preact';
import {Provider} from 'preact-redux';
import {EngineConnector} from './components/engine-connector';
import {Shell} from './components/shell';
import {VideoPlayer} from './components/video-player';
import {PlayerGUI} from './player-gui';
import {getStore} from './store';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
class App extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof SeekBarControl
   */
  render(props: any): React$Element<any> {
    return (
      <Provider store={getStore()}>
        <Shell player={props.player}>
          <EngineConnector player={props.player} />
          <VideoPlayer player={props.player} />
          <PlayerGUI uis={props.uis} player={props.player} playerContainer={props.container} />
        </Shell>
      </Provider>
    );
  }
}

export {App};
