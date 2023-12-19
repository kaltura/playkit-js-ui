//@flow
import {h, ComponentChildren} from 'preact';
import {withText} from 'preact-i18n';

import {useState, useRef, useLayoutEffect} from 'preact/hooks';
import {KeyMap} from '../../utils/key-map';

import styles from '../../styles/style.scss';

const COMPONENT_NAME = 'ExpandableText';
const {ENTER, SPACE} = KeyMap;

interface ExpandableTextProps {
  text: string;
  lines: number;
  forceShowMore: boolean;
  onClick?: (e: MouseEvent | KeyboardEvent) => void;
  readMoreLabel?: string;
  readLessLabel?: string;
  buttonProps?: any;
  children: ComponentChildren;
}

// eslint-disable-next-line require-jsdoc
const ReadMoreLessButton = ({isTextExpanded, readLessLabel, readMoreLabel, onClick, onKeyDown, ...otherProps}) => {
  return (
    <div className={styles.moreButtonText} onClick={onClick} onKeyDown={onKeyDown} {...otherProps}>
      {isTextExpanded ? readLessLabel : readMoreLabel}
    </div>
  );
};

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

  // eslint-disable-next-line require-jsdoc
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      if (props.onClick) {
        props.onClick(e);
      }

      setIsTextExpanded(!isTextExpanded);
    }
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
      <ReadMoreLessButton
        onClick={onClick}
        onKeyDown={onKeyDown}
        isTextExpanded={isTextExpanded}
        readLessLabel={props.readLessLabel}
        readMoreLabel={props.readMoreLabel}
        {...props.buttonProps}
      />
    </div>
  );
});

ExpandableText.defaultProps = {
  buttonProps: {}
};

ExpandableText.displayName = COMPONENT_NAME;
export {ExpandableText};
