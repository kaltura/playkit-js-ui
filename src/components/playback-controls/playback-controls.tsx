import style from '../../styles/style.scss';
import {h, Component, Fragment, VNode} from 'preact';
import {connect} from 'react-redux';
import {PlaylistButton} from '../playlist-button';
import {PlayPause} from '../play-pause';
import {PlayerArea} from '../../components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist,
  image: state.engine.isImg
});

const COMPONENT_NAME = 'PlaybackControls';

/**
 * PlaybackControls component
 *
 * @class PlaybackControls
 * @example <PlaybackControls>...</PlaybackControls>
 * @extends {Component}
 */
@connect(mapStateToProps)
class PlaybackControls extends Component<any, any> {
  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    this.setState({
      shouldUpdate: false
    });
  }

  /**
   * component will update
   * @param {Object} prevProps - the next props
   * @return {void}
   */
  componentDidUpdate(prevProps: any) {
    if (!!prevProps.playlist !== !!this.props.playlist) {
      this.setState({
        shouldUpdate: true
      });
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaybackControls
   */
  render({showPreview = true, playlist, className}: any): VNode<any> {
    const shouldUpdate = this.state.shouldUpdate;
    if (shouldUpdate) {
      this.setState({shouldUpdate: false});
    }
    const imageClass = this.props.image ? style.image : '';

    return (
      <div className={[style.playbackControls, className, imageClass].join(' ')}>
        <PlayerArea name={'BottomBarPlaybackControls'} shouldUpdate={shouldUpdate}>
          {playlist ? (
            <Fragment>
              <PlaylistButton type="prev" showPreview={showPreview} />
              <PlayPause />
              <PlaylistButton type="next" showPreview={showPreview} />
            </Fragment>
          ) : (
            <PlayPause />
          )}
        </PlayerArea>
      </div>
    );
  }
}

PlaybackControls.displayName = COMPONENT_NAME;
export {PlaybackControls};
