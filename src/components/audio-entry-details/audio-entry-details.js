//@flow
import style from '../../styles/style.scss';

import {connect} from 'react-redux';

import {h} from 'preact';
import {useState, useLayoutEffect, useRef} from 'preact/hooks';

import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';

import {ExpandableText} from '../expandable-text/expandable-text';

interface AudioEntryDetailsProps {
  player: any;
  isAudio: boolean;
  playerSize: typeof PLAYER_SIZE;
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

/**
 * AudioEntryDetails component
 *
 * @class AudioEntryDetails
 * @example <AudioEntryDetails />
 * @extends {Component}
 */

const AudioEntryDetails = connect(mapStateToProps)(
  withPlayer((props: AudioEntryDetailsProps) => {
    // eslint-disable-next-line require-jsdoc
    const getSizeClass = (playerSize: typeof PLAYER_SIZE) => {
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
    };

    const textRef = useRef(null);
    const comparisonTextRef = useRef(null);

    const [isFinalized, setIsFinalized] = useState(false);
    const [isTitleTrimmed, setIsTitleTrimmed] = useState(false);
    const [forceShowMore, setForceShowMore] = useState(false);

    useLayoutEffect(() => {
      if (textRef?.current && comparisonTextRef?.current) {
        setIsFinalized(true);
        setIsTitleTrimmed(textRef?.current?.getBoundingClientRect().height > comparisonTextRef?.current?.getBoundingClientRect().height);
      }

      if (!forceShowMore) {
        setForceShowMore(textRef?.current?.getBoundingClientRect().height > comparisonTextRef?.current?.getBoundingClientRect().height);
      }
    });

    if (!props.isAudio || !(props.player.sources?.metadata?.name || props.player.sources?.metadata.description)) {
      return undefined;
    }

    const {name = '', description = ''} = props.player.sources.metadata;
    const sizeClass = getSizeClass(props.playerSize);
    const titleClass = `${style.audioEntryTitle} ${isTitleTrimmed ? style.audioEntryTitleTrimmed : ''}`;

    return (
      <div className={style.audioEntryBackdrop}>
        <div className={`${style.audioEntryDetails} ${sizeClass}`}>
          <div ref={textRef} className={titleClass}>
            {name}
          </div>
          {isFinalized ? undefined : (
            <div ref={comparisonTextRef} className={`${style.audioEntryTitle} ${style.audioEntryTitleTrimmed}`}>
              {name}
            </div>
          )}
          <div className={style.audioEntryDescription}>
            <ExpandableText text={description} lines={3} onClick={() => setIsTitleTrimmed(!isTitleTrimmed)} forceShowMore={forceShowMore}>
              {description}
            </ExpandableText>
          </div>
        </div>
      </div>
    );
  })
);

AudioEntryDetails.displayName = COMPONENT_NAME;
export {AudioEntryDetails};
