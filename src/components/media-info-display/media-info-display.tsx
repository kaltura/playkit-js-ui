import {h, Fragment} from 'preact'; // eslint-disable-line @typescript-eslint/no-unused-vars
import {useState, useEffect, useRef, useLayoutEffect} from 'preact/hooks';
import {withText} from 'preact-i18n';
import style from '../../styles/style.scss';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {TimeDisplay} from '../time-display';
import {Tooltip} from '../tooltip';
import {MediaInfoConfig, MediaInfoDetailsMode, MediaInfoPosition} from '../../types';
import {EventType} from '../../event';
import {FakeEvent} from '@playkit-js/playkit-js';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {any} - mapped state to this component
 */
const mapStateToProps = (state: any): any => ({
  prePlayback: state.engine.prePlayback,
  loading: state.loading.show,
  duration: state.engine.duration,
  sources: state.engine.sources,
  config: state.config.showMediaInfo,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'MediaInfoDisplay';

interface MediaInfoDisplayProps {
  prePlayback: boolean;
  loading: boolean;
  duration: number;
  sources: any;
  config: MediaInfoConfig;
  player: any;
  playerSize: string;
  seeMoreText?: string;
  seeLessText?: string;
}

const defaultConfig: MediaInfoConfig = {
  showDuration: false,
  detailsMode: MediaInfoDetailsMode.None,
  position: MediaInfoPosition.Bottom
};

/**
 * MediaTitle component - renders media title
 */
const MediaTitle = ({title}: {title: string}): any => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useLayoutEffect(() => {
    if (textRef.current) {
      // for text-overflow - check if scrollWidth > clientWidth
      const isTextTruncated = textRef.current.scrollWidth > textRef.current.clientWidth;
      setShowTooltip(isTextTruncated);
    }
  });

  const textElement = (
    <div ref={textRef} className={style.mediaInfoTitle}>
      {title}
    </div>
  );

  return showTooltip ? <Tooltip label={title}>{textElement}</Tooltip> : textElement;
};

const SCROLL_BAR_TIMEOUT = 250;

/**
 * MediaDescription component - renders media description with expand/collapse functionality
 */
const MediaDescription = ({
  description,
  isExpanded,
  onToggle,
  seeMoreText,
  seeLessText
}: {
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  seeMoreText?: string;
  seeLessText?: string;
}): any => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTimeoutId, setScrollTimeoutId] = useState<number>(-1);

  const handleScroll = (): void => {
    clearTimeout(scrollTimeoutId);
    setScrolling(true);
    setScrollTimeoutId(
      window.setTimeout(() => {
        setScrolling(false);
      }, SCROLL_BAR_TIMEOUT)
    );
  };

  return (
    <div className={`${style.mediaInfoDescription} ${scrolling ? 'scrolling' : ''}`} onScroll={handleScroll}>
      {description.length > 100 ? (
        isExpanded ? (
          <>
            {description}{' '}
            <span className={style.seeMore} onClick={onToggle}>
              {seeLessText}
            </span>
          </>
        ) : (
          <>
            {description.substring(0, 100)}...{' '}
            <span className={style.seeMore} onClick={onToggle}>
              {seeMoreText}
            </span>
          </>
        )
      ) : (
        description
      )}
    </div>
  );
};

/**
 * MediaInfoDisplayComponent
 * Shows media information (title, description, duration) before playback
 *
 * @example <MediaInfoDisplay />
 */
const MediaInfoDisplayComponent = (props: MediaInfoDisplayProps): any => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // reset description expansion when component updates with new metadata
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [props.sources?.metadata?.description]);

  // toggle description expansion
  const toggleDescription = (): void => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (!props.prePlayback || props.loading) {
    return null;
  }

  const {player} = props;

  const config = {
    ...defaultConfig,
    ...props.config
  };
  const metadata = props.sources?.metadata;

  // try to get duration from props or from player sources
  let duration = (props.duration > 0 ? props.duration : player.sources?.duration) || 0;

  // for live streams - calculate duration from activeLiveStreamTime if available
  if (player.isLive && player.isLive() && player.sources?.activeLiveStreamTime) {
    const liveStreamTime = player.sources.activeLiveStreamTime;
    if (liveStreamTime.startTime !== undefined && liveStreamTime.endTime !== undefined) {
      duration = liveStreamTime.endTime - liveStreamTime.startTime;
    }
  }

  if (!metadata && !config.showDuration) {
    return null;
  }

  const shouldShowDetails = config.detailsMode !== MediaInfoDetailsMode.None && metadata;
  // for live players - only show duration if activeLiveStreamTime is available
  const isLiveWithoutActiveStreamTime = player.isLive && player.isLive() && !player.sources?.activeLiveStreamTime;
  const shouldShowDuration = config.showDuration && duration > 0 && !isLiveWithoutActiveStreamTime;

  if (!shouldShowDetails && !shouldShowDuration) {
    return null;
  }

  // dispatch event when media info is displayed
  player.dispatchEvent(new FakeEvent(EventType.DISPLAY_INFO_BEFORE_PLAYBACK));

  const positionClass = config.position === MediaInfoPosition.Top ? style.mediaInfoTop : style.mediaInfoBottom;

  return (
    <div className={`${style.mediaInfoDisplay} ${positionClass}`} data-player-size={props.playerSize}>
      {shouldShowDuration && (
        <div className={style.mediaInfoDuration}>
          <TimeDisplay currentTime={0} duration={duration} format="total" />
        </div>
      )}
      {shouldShowDetails && (
        <div className={style.mediaInfoDetails}>
          {config.detailsMode === MediaInfoDetailsMode.Title && metadata?.name && <MediaTitle title={metadata.name} />}
          {config.detailsMode === MediaInfoDetailsMode.TitleAndDescription && (
            <>
              {metadata?.name && <MediaTitle title={metadata.name} />}
              {metadata?.description && (
                <MediaDescription
                  description={metadata.description}
                  isExpanded={isDescriptionExpanded}
                  onToggle={toggleDescription}
                  seeMoreText={props.seeMoreText}
                  seeLessText={props.seeLessText}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MediaInfoDisplay = withText({
  seeMoreText: 'mediaInfo.seeMore',
  seeLessText: 'mediaInfo.seeLess'
})(withLogger(COMPONENT_NAME)(withPlayer(connect(mapStateToProps)(MediaInfoDisplayComponent))));

MediaInfoDisplay.displayName = COMPONENT_NAME;

export {MediaInfoDisplay};
