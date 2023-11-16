import {h} from 'preact';
import {forwardRef} from 'preact/compat';

const COMPONENT_NAME = 'Button';
/**
 * Button component
 *
 * @const Button
 * @example <Button/>
 */
const Button = forwardRef<HTMLButtonElement, any>((props, ref) => <button type="button" ref={ref} {...props} />);

Button.displayName = COMPONENT_NAME;
export {Button};
