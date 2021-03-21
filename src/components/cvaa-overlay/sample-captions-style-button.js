//@flow
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import style from '../../styles/style.scss';
import {default as Icon, IconType} from '../icon';
import {h} from 'preact';

/**
 * renders a default style pick button
 * @param {*} props - component props
 * @returns {React$Element} - component element
 */
const SampleCaptionsStyleButton = (props: any): React$Element<any> => {
  /**
   * @returns {void}
   */
  const changeCaptionsStyle = (): void => {
    props.changeCaptionsStyle(props.captionsStyle);
  };

  /**
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   */
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      changeCaptionsStyle();
    }
  };

  return (
    <div
      role="button"
      tabIndex="0"
      ref={el => {
        props.addAccessibleChild(el);
      }}
      className={props.classNames.join(' ')}
      onClick={changeCaptionsStyle}
      onKeyDown={onKeyDown}>
      <Text id={'cvaa.sample_caption_tag'} />
      {props.player.textStyle.isEqual(props.captionsStyle) ? (
        <div className={style.activeTick}>
          <Icon type={IconType.Check} />
        </div>
      ) : undefined}
    </div>
  );
};
export {SampleCaptionsStyleButton};
