import {h} from 'preact';
import {useEffect, useRef} from 'preact/hooks';
const COMPONENT_NAME = 'Button';
/**
 * Button component
 *
 * @const Button
 * @example <Button/>
 */
const Button = (props) => {
  const { setRef, ref,...otherProps } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // if setRef is a function
    if (typeof setRef === 'function' && buttonRef.current) {
      setRef(buttonRef.current);
    }
    // if ref is a ref object
    if (ref && 'current' in ref && buttonRef.current) {
      ref.current = buttonRef.current;
    }
  },[buttonRef]);

  return <button type="button" ref={buttonRef} {...otherProps}/>;
};


Button.displayName = COMPONENT_NAME;
export {Button};
