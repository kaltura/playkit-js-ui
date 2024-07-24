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
  const scrollableRef: MutableRef<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const itemsContainerRef: MutableRef<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [scrollTimeoutId, setScrollTimeoutId] = useState<number>(-1);
  const [scrollableHeight, setScrollableHeight] = useState<number>(-1);

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
    if (scrollableRef?.current) {
      scrollableRef.current.scrollLeft += e.deltaY;
      handleScroll();
    }
  };

  useLayoutEffect(() => {
    if (isVertical && scrollableRef?.current && itemsContainerRef?.current) {
      const scrollableEl = scrollableRef.current;
      const parentHeight = scrollableEl.parentElement?.clientHeight;
      if (parentHeight) {
        const cs = getComputedStyle(scrollableEl.parentElement);
        const verticalPadding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const availableHeight = parentHeight - verticalPadding;
        const itemsHeight = itemsContainerRef.current.clientHeight;

        if (itemsHeight > availableHeight) {
          setScrollableHeight(availableHeight);
        } else if (scrollableHeight !== -1) {
          // there is enough space for the items - remove the height style
          setScrollableHeight(-1);
        }
      }
    }
  });

  const scrollableParams = useMemo(() => (isVertical ? {onScroll: handleScroll} : {onWheel: handleWheel, ref: scrollableRef}), [isVertical]);

  return (
    <div
      className={`${styles.scrollable} ${scrolling ? styles.scrolling : ''} ${isVertical ? styles.vertical : styles.horizontal}`}
      style={`${isVertical && scrollableHeight > -1 ? `height: ${scrollableHeight}px` : ''}`}
      ref={scrollableRef}
      {...scrollableParams}
    >
      <div className={styles.itemsContainer} ref={itemsContainerRef}>
        {children}
      </div>
    </div>
  );
};

export {Scrollable};
