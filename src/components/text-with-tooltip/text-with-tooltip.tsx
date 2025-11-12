import {h, Fragment, VNode} from 'preact'; // h is needed for JSX transpilation
import {useRef, useLayoutEffect, useState} from 'preact/hooks';
import style from './text-with-tooltip.scss';
import {Tooltip} from '../tooltip';

interface TextWithTooltipProps {
  text: string;
  className?: string;
  numberOfLines?: number;
}

/**
 * TextWithTooltip component
 * A component that shows a tooltip when text is truncated (e.g., with ellipsis)
 *
 * @param {TextWithTooltipProps} props
 * @returns {VNode | null}
 */
const TextWithTooltip = (props: TextWithTooltipProps): VNode => {
  const {text, className = '', numberOfLines = 1} = props;

  const textRef = useRef<HTMLSpanElement | null>(null);
  const comparisonTextRef = useRef<HTMLSpanElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [width, setWidth] = useState(0);

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
    <span
      ref={textRef}
      className={`${style.text} ${className}`}
      style={{'-webkit-line-clamp': numberOfLines}}
    >
      {text}
    </span>
  );

  const comparisonTextElement = (
    <span
      ref={comparisonTextRef}
      className={style.comparisonText}
      style={{'-webkit-line-clamp': numberOfLines + 1}}
    >
      {text}
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
    <div className={style.container}>
      {showTooltip ? (
        <Tooltip label={text}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
};

export {TextWithTooltip};
