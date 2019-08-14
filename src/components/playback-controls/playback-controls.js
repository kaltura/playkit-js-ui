//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {PlaylistButton} from '../playlist-button';
import {PlayPauseControl} from '../play-pause';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist
});

const COMPONENT_NAME = 'PlaybackControls';

@connect(mapStateToProps)
/**
 * PlaybackControls component
 *
 * @class PlaybackControls
 * @example <PlaybackControls>...</PlaybackControls>
 * @extends {Component}
 */
class PlaybackControls extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaybackControls
   */
  render(props: any): React$Element<any> {
    return (
      <div className={[style.playbackControls]}>
        {props.playlist ? <PlaylistButton player={props.player} type="prev" /> : undefined}
        <PlayPauseControl player={props.player} />
        {props.playlist ? <PlaylistButton player={props.player} type="next" /> : undefined}
      </div>
    );
  }
}

PlaybackControls.displayName = COMPONENT_NAME;
export {PlaybackControls};
