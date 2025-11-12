import {h, VNode} from 'preact'; // h is needed for JSX transpilation
import {connect} from 'react-redux';
import style from './title.scss';
import {withPlayer} from '../player';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {TextWithTooltip} from '../text-with-tooltip';

/**
 * Mapping state to props
 * @param {Object} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = (state: any): {isPlaybackStarted: boolean; showTitleOnUpperBar: boolean} => ({
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
 * @param {TitleProps} props
 * @returns {VNode|null}
 */
const TitleComponent = (props: TitleProps): VNode | null => {
  // Don't render anything if playback hasn't started or if showTitleOnUpperBar is false
  if (!props.isPlaybackStarted || !props.showTitleOnUpperBar) {
    return null;
  }

  let title = '';
  const sources = props.player?.sources;
  if (sources && sources.metadata && sources.metadata.name) {
    title = sources.metadata.name;
  } else {
    return null;
  }

  return (
    <div className={style.titleContainer}>
      <TextWithTooltip text={title} numberOfLines={1} />
    </div>
  );
};

const Title = connect(mapStateToProps)(withPlayer(TitleComponent));
export {Title};
