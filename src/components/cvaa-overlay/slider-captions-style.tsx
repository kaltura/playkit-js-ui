import {Text} from 'preact-i18n';
import {h} from 'preact';
import {Slider} from '../slider';

/**
 * renders a custom slider style option
 *
 * @param {*} props - component props
 * @param {string} labelId - the label id to localize
 * @param {number} value - the current value of the slider
 * @param {classNames} classNames - the css classes to apply
 * @param {string} styleName - the property name to change
 * @returns {React$Element} - component element
 * @memberof CustomCaptionsWindow
 */
const SliderCaptionsStyle = (props: any) => {
  return (
    <div className={props.classNames.join(' ')}>
      <label id={props.styleName}>
        <Text id={props.labelId} />
      </label>
      <Slider
        name={props.styleName}
        pushRef={el => {
          props.addAccessibleChild(el);
        }}
        min={0}
        max={100}
        value={props.value * 100}
        onChange={valueChanged => {
          let changedStyle = {};
          changedStyle[props.styleName] = valueChanged / 100;
          props.changeCustomStyle(changedStyle);
        }}
      />
    </div>
  );
};
export {SliderCaptionsStyle};
