import { h, ComponentChildren } from "preact";
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

const ReadMoreLessButton = ({isTextExpanded, readLessLabel, readMoreLabel, onClick, onKeyDown, ...otherProps}) => {
  return (
    <div className={styles.moreButtonText} onClick={onClick} onKeyDown={onKeyDown} {...otherProps}>
      {isTextExpanded ? readLessLabel : readMoreLabel}
    </div>
  );
};

const ExpandableText: new(props?: any, context?: any) => any = withText({
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

  const onClick = (e: MouseEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }

    setIsTextExpanded(!isTextExpanded);
  };

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
/*@ts-expect-error - Property 'defaultProps' does not exist on type 'new (props?: any, context?: any) => any */
ExpandableText.defaultProps = {
  buttonProps: {}
};
/*@ts-expect-error - Property 'displayName' does not exist on type 'new (props?: any, context?: any) => any'. */
ExpandableText.displayName = COMPONENT_NAME;
export {ExpandableText};
