import {ComponentChildren, h} from 'preact';
//@ts-ignore
import {useState, useRef, useMemo, MutableRef, useLayoutEffect} from 'preact/hooks';
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
const Scrollable = ({children, isVertical}: {children: ComponentChildren; isVertical: boolean}) => {
  const ref: MutableRef<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [scrollTimeoutId, setScrollTimeoutId] = useState<number>(-1);
  const [scrollableHeight, setScrollableHeight] = useState<string>('');

  const handleScroll = (): void => {
    clearTimeout(scrollTimeoutId);
    setScrolling(true);
    setScrollTimeoutId(
      window.setTimeout(() => {
        setScrolling(false);
      }, SCROLL_BAR_TIMEOUT)
    );
  };

  const handleWheel = (e: WheelEvent): void => {
    e.preventDefault();
    if (ref?.current) {
      ref.current.scrollLeft += e.deltaY;
      handleScroll();
    }
  };

  useLayoutEffect(() => {
    if (isVertical) {
      const scrollableEl = document.getElementsByClassName('playkit-scrollable')[0];
      const parentHeight = scrollableEl && scrollableEl.parentElement?.clientHeight;
      if (parentHeight) {
        const cs = getComputedStyle(scrollableEl.parentElement);
        const verticalPadding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        setScrollableHeight(`${parentHeight - verticalPadding}px`);
      }
    }
  }, []);

  const scrollableParams = useMemo(() => (isVertical ? {onScroll: handleScroll} : {onWheel: handleWheel, ref}), [isVertical]);

  return (
    <div
      className={`${styles.scrollable} ${scrolling ? styles.scrolling : ''} ${isVertical ? styles.vertical : styles.horizontal}`}
      style={`${isVertical && scrollableHeight ? `height: ${scrollableHeight}` : ''}`}
      {...scrollableParams}
    >
      {children}
    </div>
  );
};

export {Scrollable};
