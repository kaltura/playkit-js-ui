/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
//@flow

import {h} from 'preact';
import {useState, useRef, useLayoutEffect} from 'preact/hooks';

import styles from '../../styles/style.scss';

const COMPONENT_NAME = 'ExpandableText';

const ExpandableText = (props: any) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isTextTrimmed, setIsTextTrimmed] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const comparisonTextRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef?.current && comparisonTextRef?.current) {
      setIsFinalized(true);
      setIsTextTrimmed(textRef?.current?.getBoundingClientRect().height < comparisonTextRef?.current?.getBoundingClientRect().height);
    }
  }, [isFinalized]);

  if (!isTextTrimmed) {
    return (
      <div className={styles.contentText}>
        <div className={styles.titleWrapper}>
          <div ref={textRef} style={{'-webkit-line-clamp': props.lines}} className={styles.expandableText}>
            {props.text}
          </div>
          {!isFinalized ? (
            <div ref={comparisonTextRef} style={{'-webkit-line-clamp': props.lines + 1}} className={styles.expandableText}>
              {props.text}
            </div>
          ) : undefined}
        </div>
      </div>
    );
  }

  return (
    <div>
      {isTextExpanded ? (
        props.text
      ) : (
        <div className={styles.expandableText} style={{'-webkit-line-clamp': props.lines}}>
          {props.text}
        </div>
      )}
      <div className={styles.moreButtonText} onClick={() => setIsTextExpanded(!isTextExpanded)}>
        {isTextExpanded ? 'Less' : 'More'}
      </div>
    </div>
  );
};

ExpandableText.displayName = COMPONENT_NAME;
export {ExpandableText};
