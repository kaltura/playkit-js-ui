//@flow
import {h} from 'preact';
import {forwardRef} from 'preact/compat';

const COMPONENT_NAME = 'Button';
/**
 * Button component
 *
 * @const Button
 * @example <Button/>
 * @extends {Component}
 */
const Button = forwardRef((props, ref) => <button type="button" ref={ref} {...props} />);

Button.displayName = COMPONENT_NAME;
export {Button};
