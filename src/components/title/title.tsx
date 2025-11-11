import {h, VNode} from 'preact'; // h is needed for JSX transpilation
import {connect} from 'react-redux';
import style from './title.scss';
import {withPlayer} from '../player';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

/**
 * Mapping state to props
 * @param {Object} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = (state: any): {isPlaybackStarted: boolean, showTitleOnUpperBar: boolean} => ({
  isPlaybackStarted: state.engine.isPlaybackStarted,
  showTitleOnUpperBar: state.config.showTitleOnUpperBar
});

interface TitleProps {
  player?: KalturaPlayer;
  isPlaybackStarted?: boolean;
  showTitleOnUpperBar?: boolean;
}

/**
 * Title component
 * @param {TitleProps} props Component props
 * @returns {VNode|null} Rendered component or null if playback hasn't started
 */
const TitleComponent = (props: TitleProps): VNode | null => {
  // Don't render anything if playback hasn't started
  if (!props.isPlaybackStarted || !props.showTitleOnUpperBar) {
    return null;
  }

  let title = '';
  // If no text provided, try to get it from the player sources
  try {
    const sources = props.player?.sources;
    if (sources && sources.metadata && sources.metadata.name) {
      title = sources.metadata.name;
    }
  } catch (e) {
    // Do nothing if accessing sources fails
  }

  return <span className={style.title}>{title}</span>;
};

// Connect component to Redux and apply withPlayer HOC
const Title = connect(mapStateToProps)(withPlayer(TitleComponent));
export {Title};
