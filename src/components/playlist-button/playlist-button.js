//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {PrevNext} from './prev-next';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist
});

const COMPONENT_NAME = 'PlaylistButton';

/**
 * PlaylistButton component
 *
 * @class PlaylistButton
 * @example <PlaylistButton type="next"/>
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
class PlaylistButton extends Component {
  /**
   * playlist button click handler
   *
   * @returns {void}
   * @memberof PlaylistButton
   */
  onClick = (): void => {
    this.props.type === 'prev' ? this.props.player.playlist.playPrev() : this.props.player.playlist.playNext();
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistButton
   */
  render(props: any): React$Element<any> | void {
    const item = props.playlist[props.type];
    return <PrevNext type={props.type} item={item} onClick={this.onClick.bind(this)} />;
  }
}

PlaylistButton.displayName = COMPONENT_NAME;
export {PlaylistButton};
