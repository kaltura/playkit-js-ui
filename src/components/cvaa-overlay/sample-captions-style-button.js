//@flow
import {KeyMap} from '../../utils/key-map';
import style from '../../styles/style.scss';
import {default as Icon, IconType} from '../icon';
import {h} from 'preact';
import {useEffect, useRef} from 'preact/compat';

/**
 * renders a default style pick button
 * @param {*} props - component props
 * @returns {React$Element} - component element
 */
const SampleCaptionsStyleButton = (props: any): React$Element<any> => {
  let _sampleCaptionsElRef = useRef(null);

  /**
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   */
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      props.changeCaptionsStyle();
    }
  };

  useEffect(() => {
    // force focus to active sample button once mounted
    if (props.isActive) {
      _sampleCaptionsElRef?.focus();
    }
  }, []);

  return (
    <div
      role="menuitemradio"
      tabIndex="0"
      aria-checked={props.isActive ? 'true' : 'false'}
      ref={el => {
        _sampleCaptionsElRef = el;
        props.addAccessibleChild(el);
      }}
      className={props.classNames.join(' ')}
      onClick={props.changeCaptionsStyle}
      onKeyDown={onKeyDown}>
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
