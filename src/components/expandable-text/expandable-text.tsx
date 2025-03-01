import {h, ComponentChildren} from 'preact';
import {withText} from 'preact-i18n';

import {useState, useRef, useLayoutEffect, useEffect} from 'preact/hooks';
import {KeyMap} from '../../utils';

import styles from '../../styles/style.scss';

const COMPONENT_NAME = 'ExpandableText';
const {ENTER, SPACE} = KeyMap;

interface ExpandableTextProps {
  text: string;
  lines: number;
  forceShowMore: boolean;
  onClick?: (e: MouseEvent | KeyboardEvent) => void;
  onExpand?: (isTextExpanded: boolean) => void;
  className?: string;
  classNameExpanded?: string;
  readMoreLabel?: string;
  readLessLabel?: string;
  buttonProps?: any;
  children: ComponentChildren;
}

const ReadMoreLessButton = ({isTextExpanded, readLessLabel, readMoreLabel, onClick, onKeyDown, ...otherProps}) => {
  return (
    <div role="button" tabIndex={0} className={styles.moreButtonText} onClick={onClick} onKeyDown={onKeyDown} {...otherProps}>
      {isTextExpanded ? readLessLabel : readMoreLabel}
    </div>
  );
};

const ExpandableText: new (props?: any, context?: any) => any = withText({
  readMoreLabel: 'controls.readMore',
  readLessLabel: 'controls.readLess'
})((props: ExpandableTextProps) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isTextTrimmed, setIsTextTrimmed] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const comparisonTextRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (textRef?.current && comparisonTextRef?.current) {
      setIsFinalized(true);
      setIsTextTrimmed(textRef?.current?.getBoundingClientRect().height < comparisonTextRef?.current?.getBoundingClientRect().height);
    }
  }, [isFinalized]);

  const handleExpand = (e: MouseEvent | KeyboardEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }
    setIsTextExpanded(prevState => {
      const newState = !prevState;
      if (props.onExpand) {
        props.onExpand(newState);
      }
      return newState;
    });
  };

  const onClick = (e: MouseEvent) => {
    handleExpand(e);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      handleExpand(e);
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
    <div className={[props.className, isTextExpanded ? props.classNameExpanded : ''].join(' ')}>
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
ExpandableText['defaultProps'] = {
  buttonProps: {}
};
ExpandableText['displayName'] = COMPONENT_NAME;
export {ExpandableText};
