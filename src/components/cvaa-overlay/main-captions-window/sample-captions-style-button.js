//@flow
import {KeyMap} from 'utils/key-map';
import {Text} from 'preact-i18n';
import isEqual from 'utils/is-equal';
import style from '../../../styles/style.scss';
import {default as Icon, IconType} from 'components/icon';
import {h} from 'preact';

/**
 * renders a default style pick button
 * @param {*} props - component props
 * @returns {React$Element} - component element
 */
const SampleCaptionsStyleButton = (props: any): React$Element<any> => {
  return (
    <div
      tabIndex="0"
      ref={el => {
        props.addAccessibleChild(el);
      }}
      className={props.classNames.join(' ')}
      onClick={() => props.changeCaptionsStyle(props.captionsStyle)}
      onKeyDown={e => {
        if (e.keyCode === KeyMap.ENTER) {
          props.changeCaptionsStyle(props.captionsStyle);
        }
      }}>
      <Text id={'cvaa.sample_caption_tag'} />
      {isEqual(props.player.textStyle, props.captionsStyle) ? (
        <div className={style.activeTick}>
          <Icon type={IconType.Check} />
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
export {SampleCaptionsStyleButton};
