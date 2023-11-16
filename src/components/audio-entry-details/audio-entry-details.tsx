import style from '../../styles/style.scss';
import {connect, ConnectedComponent} from 'react-redux';
import {FunctionComponent, h} from 'preact';
import {useState, useLayoutEffect, useRef} from 'preact/hooks';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {ExpandableText} from '../expandable-text';
import {Scrollable} from '../scrollable';
import {withEventManager} from '../../event';
import {EventManager} from '@playkit-js/playkit-js';
import {WithPlayerProps} from '../player/with-player';
import {WithEventManagerProps} from '../../event/with-event-manager';

interface AudioEntryDetailsProps {
  player: any;
  isAudio: boolean;
  playerSize: typeof PLAYER_SIZE;
  eventManager: EventManager;
}

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

const AudioEntryDetailsComp: FunctionComponent<AudioEntryDetailsProps> = (props: AudioEntryDetailsProps) => {
  // eslint-disable-next-line require-jsdoc
  const getSizeClass = (playerSize: typeof PLAYER_SIZE) => {
    switch (playerSize) {
    case PLAYER_SIZE.EXTRA_LARGE:
    case PLAYER_SIZE.LARGE:
      return style.audioEntryL;
    case PLAYER_SIZE.MEDIUM:
      return style.audioEntryM;
    default:
      return style.audioEntryT;
    }
  };

  // eslint-disable-next-line require-jsdoc
  const sanitizeText = text => {
    const parsed = domParser!.parseFromString(text, 'text/html');
    return parsed.body.textContent || '';
  };

  const textRef = useRef<HTMLDivElement | null>(null);
  const comparisonTextRef = useRef<HTMLDivElement | null>(null);

  const [domParser, setDomParser] = useState<DOMParser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isTitleTrimmed, setIsTitleTrimmed] = useState(false);
  const [forceShowMore, setForceShowMore] = useState(false);

  useLayoutEffect(() => {
    if (textRef?.current && comparisonTextRef?.current) {
      setIsFinalized(true);
      setIsTitleTrimmed(textRef?.current?.getBoundingClientRect().height > comparisonTextRef?.current?.getBoundingClientRect().height);
    }

    if (!forceShowMore) {
      setForceShowMore(textRef?.current?.getBoundingClientRect().height! > comparisonTextRef?.current?.getBoundingClientRect().height!);
    }
  });

  useLayoutEffect(() => {
    props.eventManager.listen(props.player, props.player.Event.CHANGE_SOURCE_STARTED, () => {
      setIsReady(false);
    });
    props.eventManager.listen(props.player, props.player.Event.CHANGE_SOURCE_ENDED, () => {
      setIsReady(true);
    });

    setDomParser(new DOMParser());
  }, []);

  if (!isReady || !props.isAudio || !(props.player.sources?.metadata?.name || props.player.sources?.metadata.description)) {
    return null;
  }

  let {name = '', description = ''} = props.player.sources.metadata;
  name = sanitizeText(name);
  description = sanitizeText(description);

  const sizeClass = getSizeClass(props.playerSize);
  const titleClass = `${style.audioEntryTitle} ${isTitleTrimmed ? style.audioEntryTitleTrimmed : ''}`;

  let expandedClass = isTitleTrimmed ? '' : style.audioEntryExpanded;

  // eslint-disable-next-line require-jsdoc
  const onClick = () => {
    setIsTitleTrimmed(!isTitleTrimmed);
  };

  return (
    <div className={`${style.audioEntryBackdrop} ${expandedClass}`}>
      <div className={`${style.audioEntryDetails} ${sizeClass}`}>
        <Scrollable isVertical={true}>
          <div className={style.audioEntryContent}>
            <div ref={textRef} className={titleClass}>
              {name}
            </div>
            {isFinalized ? undefined : (
              <div ref={comparisonTextRef} className={`${style.audioEntryTitle} ${style.audioEntryTitleTrimmed}`}>
                {name}
              </div>
            )}
            <div className={style.audioEntryDescription}>
              <ExpandableText text={description} lines={3} onClick={onClick} forceShowMore={forceShowMore}>
                {description}
              </ExpandableText>
            </div>
          </div>
        </Scrollable>
      </div>
    </div>
  );
}

/**
 * AudioEntryDetails component
 *
 * @class AudioEntryDetails
 * @example <AudioEntryDetails />
 * @extends {Component}
 */

const AudioEntryDetails: ConnectedComponent<FunctionComponent<AudioEntryDetailsProps>, AudioEntryDetailsProps & WithPlayerProps & WithEventManagerProps> = connect(mapStateToProps)(
  withEventManager<AudioEntryDetailsProps>(
    withPlayer<AudioEntryDetailsProps>(AudioEntryDetailsComp)
  )
);


AudioEntryDetails.displayName = COMPONENT_NAME;
export {AudioEntryDetails};
