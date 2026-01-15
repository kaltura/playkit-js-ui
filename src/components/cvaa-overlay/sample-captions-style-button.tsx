import style from '../../styles/style.scss';
import {Icon, IconType} from '../icon';
import {h} from 'preact';
import {useEffect, useRef} from 'preact/compat';
import { KeyCode } from '../../utils';

/**
 * renders a default style pick button
 * @param {*} props - component props
 * @returns {React$Element} - component element
 */
const SampleCaptionsStyleButton = (props: any) => {
  let _sampleCaptionsElRef = useRef<HTMLDivElement>(null);

  /**
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   */
  const onKeyDown = (e: KeyboardEvent): void => {
    if (props.onKeyDown) {
      props.onKeyDown(e);
      return;
    }
    if (e.code === KeyCode.Enter || e.code === KeyCode.Space) {
      e.preventDefault();
      e.stopPropagation();
      props.changeCaptionsStyle();
    }
  };

  useEffect(() => {
    // force focus to active sample button once mounted
    if (props.isActive && _sampleCaptionsElRef.current) {
      _sampleCaptionsElRef.current.focus();
    }
  }, []);

  return (
    <div
      role="radio"
      tabIndex={typeof props.tabIndex === 'number' ? props.tabIndex : (props.isActive ? 0 : -1)}
      aria-checked={props.isActive ? 'true' : 'false'}
      ref={el => {
        if (el) {
          _sampleCaptionsElRef.current = el;
          props.addAccessibleChild(el);
        }
        if (props.setRef) {
          props.setRef(el);
        }
      }}
      className={props.classNames.join(' ')}
      onClick={props.changeCaptionsStyle}
      onKeyDown={onKeyDown}
    >
      {props.children}
      {props.isActive ? (
        <div className={style.activeTick}>
          <Icon type={IconType.Check} />
        </div>
      ) : undefined}
    </div>
  );
};
export {SampleCaptionsStyleButton};
