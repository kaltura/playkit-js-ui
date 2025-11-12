import {h, Fragment, VNode} from 'preact'; // h is needed for JSX transpilation
import {connect} from 'react-redux';
import {useRef, useLayoutEffect, useState} from 'preact/hooks';
import style from './title.scss';
import {withPlayer} from '../player';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {Tooltip} from '../tooltip';

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
 * @param {TitleProps} props Component props
 * @returns {VNode|null} Rendered component or null if playback hasn't started
 */
const TitleComponent = (props: TitleProps): VNode | null => {
  // Don't render anything if playback hasn't started or if showTitleOnUpperBar is false
  if (!props.isPlaybackStarted || !props.showTitleOnUpperBar) {
    return null;
  }

  const textRef = useRef<HTMLSpanElement | null>(null);
  const comparisonTextRef = useRef<HTMLSpanElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [width, setWidth] = useState(0);

  let title = '';
  try {
    const sources = props.player?.sources;
    if (sources && sources.metadata && sources.metadata.name) {
      title = sources.metadata.name;
    }
  } catch (e) {
    // Do nothing if accessing sources fails
  }

  useLayoutEffect(() => {
    const newWidth = textRef.current?.getBoundingClientRect().width || 0;

    //if width got changed, reset finalized state to trigger remeasurement
    if (newWidth !== width) {
      setWidth(newWidth);
      setIsFinalized(false);
    }

    if (!isFinalized && textRef.current && comparisonTextRef.current) {
      setWidth(width);
      setIsFinalized(true);

      const textHeight = textRef.current.getBoundingClientRect().height;
      const comparisonTextHeight = comparisonTextRef.current.getBoundingClientRect().height;

      // Only show tooltip if text is truncated (heights differ)
      setShowTooltip(textHeight < comparisonTextHeight);
    }
  });

  const textElement = (
    <span ref={textRef} className={style.title} style={{'-webkit-line-clamp': 1}}>
      {title}
    </span>
  );

  const comparisonTextElement = (
    <span
      ref={comparisonTextRef}
      className={style.comparisonText}
      style={{'-webkit-line-clamp': 2}}>
      {title}
    </span>
  );

  const content = !isFinalized ? (
    <>
      {textElement}
      {comparisonTextElement}
    </>
  ) : (
    textElement
  );

  return (
    <div className={style.titleContainer}>
      {showTooltip ? (
        <Tooltip label={title}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
};

const Title = connect(mapStateToProps)(withPlayer(TitleComponent));
export {Title};
