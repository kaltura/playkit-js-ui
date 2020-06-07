//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {PlaylistButton} from '../playlist-button';
import {PlayPause} from '../play-pause';

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
    const {className} = props;
    return (
      <div className={[style.playbackControls, className].join(' ')}>
        {props.playlist ? <PlaylistButton type="prev" /> : undefined}
        <PlayPause />
        {props.playlist ? <PlaylistButton type="next" /> : undefined}
      </div>
    );
  }
}

PlaybackControls.displayName = COMPONENT_NAME;
export {PlaybackControls};
