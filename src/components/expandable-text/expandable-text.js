//@flow
import {h, ComponentChildren} from 'preact';
import {withText} from 'preact-i18n';

import {useState, useRef, useLayoutEffect} from 'preact/hooks';

import styles from '../../styles/style.scss';

const COMPONENT_NAME = 'ExpandableText';

interface ExpandableTextProps {
  text: string;
  lines: number;
  forceShowMore: boolean;
  onClick?: (e: MouseEvent) => void;
  readMoreLabel?: string;
  readLessLabel?: string;
  children: ComponentChildren;
}

const ExpandableText = withText({
  readMoreLabel: 'controls.readMore',
  readLessLabel: 'controls.readLess'
})((props: ExpandableTextProps) => {
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

  // eslint-disable-next-line require-jsdoc
  const onClick = (e: MouseEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }

    setIsTextExpanded(!isTextExpanded);
  };

  if (!isTextTrimmed && !props.forceShowMore) {
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
        props.children
      ) : (
        <div className={styles.expandableText} style={{'-webkit-line-clamp': props.lines}}>
          {props.text}
        </div>
      )}
      <div className={styles.moreButtonText} onClick={onClick}>
        {isTextExpanded ? props.readLessLabel : props.readMoreLabel}
      </div>
    </div>
  );
});

ExpandableText.displayName = COMPONENT_NAME;
export {ExpandableText};
