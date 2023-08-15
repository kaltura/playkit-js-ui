//@flow
import style from '../../styles/style.scss';

import {connect} from 'react-redux';
import {h, Component} from 'preact';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isAudio: state.engine.isAudio,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'AudioEntryDetails';

/**
 * AudioEntryDetails component
 *
 * @class AudioEntryDetails
 * @example <AudioEntryDetails />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
class AudioEntryDetails extends Component {
  // eslint-disable-next-line require-jsdoc
  getSizeClass(playerSize: typeof PLAYER_SIZE) {
    switch (playerSize) {
      case PLAYER_SIZE.EXTRA_LARGE:
      case PLAYER_SIZE.LARGE:
        return style.audioEntryL;
      case PLAYER_SIZE.MEDIUM:
        return style.audioEntryM;
      case PLAYER_SIZE.SMALL:
      case PLAYER_SIZE.EXTRA_SMALL:
        return style.audioEntryS;
      case PLAYER_SIZE.TINY:
      default:
        return style.audioEntryT;
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Cast
   */
  render(props: any): ?React$Element<any> {
    if (!props.isAudio || !props.player.sources?.metadata?.name) {
      return undefined;
    }

    const {name, description} = props.player.sources.metadata;
    const sizeClass = this.getSizeClass(props.playerSize);

    return (
      <div className={style.audioEntryBackdrop}>
        <div className={`${style.audioEntryDetails} ${sizeClass}`}>
          <div className={style.audioEntryTitle}>{name}</div>
          <div className={style.audioEntryDescription}>{description ? description : ''}</div>
        </div>
      </div>
    );
  }
}

AudioEntryDetails.displayName = COMPONENT_NAME;
export {AudioEntryDetails};
