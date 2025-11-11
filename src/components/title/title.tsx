import {h, VNode} from 'preact'; // h is needed for JSX transpilation
import {connect} from 'react-redux';
import * as style from './title.scss';
import {withPlayer} from '../player';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

/**
 * Mapping state to props
 * @param {Object} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = (state: any): {isPlaybackStarted: boolean} => ({
  isPlaybackStarted: state.engine.isPlaybackStarted,
});

interface TitleProps {
  text?: string;
  player?: KalturaPlayer;
  isPlaybackStarted?: boolean;
}

/**
 * Title component
 * @param {TitleProps} props Component props
 * @returns {VNode|null} Rendered component or null if playback hasn't started
 */
const TitleComponent = (props: TitleProps): VNode | null => {
  // Don't render anything if playback hasn't started
  if (!props.isPlaybackStarted) {
    return null;
  }

  let title = props.text || '';
 // const showTitleOnUpperBar = props.showTitleOnUpperBar;
  // If no text provided, try to get it from the player sources
  if (!title && props.player) {
    try {
      const sources = props.player.sources;
      if (sources && sources.metadata && sources.metadata.name) {
        title = sources.metadata.name;
      }
    } catch (e) {
      // Do nothing if accessing sources fails
    }
  }

  return <span className={style.title}>{title}</span>;
};

// Connect component to Redux and apply withPlayer HOC
const Title = connect(mapStateToProps)(withPlayer(TitleComponent));
export {Title};
