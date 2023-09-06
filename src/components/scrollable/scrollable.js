//@flow

import {ComponentChildren, h} from 'preact';
import {useState, useRef, useMemo} from 'preact/hooks';
import styles from '../../styles/style.scss';

const SCROLL_BAR_TIMEOUT = 250;

/**
 * Wraps around child components and displays a styled scrollbar with vertical or horizontal orientation.
 *
 * @param {object} props Component props.
 * @param {ComponentChildren} props.children Child components.
 * @param {boolean} props.isVertical If true, scrollbar has vertical orientation, otherwise - it has horizontal orientation.
 * @returns {any} Scrollable component
 */
const Scrollable = ({children, isVertical}: {children: ComponentChildren, isVertical: boolean}) => {
  const ref = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTimeoutId, setScrollTimeoutId] = useState(-1);

  // eslint-disable-next-line require-jsdoc
  const handleScroll = () => {
    clearTimeout(scrollTimeoutId);
    setScrolling(true);
    setScrollTimeoutId(
      window.setTimeout(() => {
        setScrolling(false);
      }, SCROLL_BAR_TIMEOUT)
    );
  };

  // eslint-disable-next-line require-jsdoc
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (ref?.current) {
      ref.current.scrollLeft += e.deltaY;
      handleScroll();
    }
  };

  const scrollableParams = useMemo(() => (isVertical ? {onScroll: handleScroll} : {onWheel: handleWheel, ref}), [isVertical]);

  return (
    <div
      className={`${styles.scrollable} ${scrolling ? styles.scrolling : ''} ${isVertical ? styles.vertical : styles.horizontal}`}
      {...scrollableParams}>
      {children}
    </div>
  );
};

export {Scrollable};
