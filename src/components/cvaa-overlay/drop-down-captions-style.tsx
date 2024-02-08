import {Text} from 'preact-i18n';
import {DropDown} from '../dropdown';
import {h, VNode} from 'preact';

/**
 * renders a custom dropdown style option
 * @param {*} props - component props
 * @returns {React$Element} - component element
 */
const DropDownCaptionsStyle = (props: any): VNode<any> => {
  return (
    <div className={props.classNames.join(' ')}>
      <label id={props.styleName}>
        <Text id={props.labelId} />
      </label>
      <DropDown
        name={props.styleName}
        pushRef={el => {
          props.addAccessibleChild(el);
        }}
        tabbable
        onMenuChosen={chosenOption => {
          let changedStyle = {};
          changedStyle[props.styleName] = chosenOption;
          props.changeCustomStyle(changedStyle);
        }}
        options={props.options}
      />
    </div>
  );
};
export {DropDownCaptionsStyle};
