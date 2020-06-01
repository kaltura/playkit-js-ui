//@flow
import {h} from 'preact';
import {Component} from 'preact';

const COMPONENT_NAME = 'Button';

/**
 * Button component
 *
 * @class Button
 * @example <Button/>
 * @extends {Component}
 */
class Button extends Component {
  /**
   * render component
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Button
   */
  render(props: any): ?React$Element<any> {
    return <button type={'button'} {...props} />;
  }
}

Button.displayName = COMPONENT_NAME;
export {Button};
