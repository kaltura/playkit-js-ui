//@flow
import style from '../../styles/style.scss';
import {h, Component, Fragment} from 'preact';
import {connect} from 'react-redux';
import {PlaylistButton} from '../playlist-button';
import {PlayPause} from '../play-pause';
import {PlayerArea} from 'components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist
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
class PlaybackControls extends Component {
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
  render(props: any): React$Element<any> {
    const {name, className} = props;
    const shouldUpdate = this.state.shouldUpdate;
    if (shouldUpdate) {
      this.setState({
        shouldUpdate: false
      });
    }

    return (
      <div className={[style.playbackControls, className].join(' ')}>
        <PlayerArea name={name} shouldUpdate={shouldUpdate}>
          {props.playlist ? (
            <Fragment>
              <PlaylistButton type="prev" showPreview={props.showPreview} />
              <PlayPause />
              <PlaylistButton type="next" showPreview={props.showPreview} />
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
