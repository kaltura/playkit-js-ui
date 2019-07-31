//@flow
import {h, Component} from 'preact';
import getLogger from '../../utils/logger';

// TODO sakal check with Oren if should inherit from 'BaseComponent'

const logger = getLogger('InjectedComponent');

/**
 * injected component wrapper with support for life-cycle events
 */
class InjectedComponent extends Component {
  _root = null;

  /**
   * change in component props or state shouldn't render the component again
   *
   * @returns {boolean} shouldComponentUpdate
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    const {onCreate, label} = this.props;

    if (!onCreate) {
      logger.warn(`Cannot inject preset item with label '${label}', missing 'onCreate' method`);
      return;
    }

    if (!this._root) {
      logger.warn(`Cannot inject preset item with label '${label}', failed to create parent component`);
      return;
    }

    logger.debug(`[componentDidMount('${label || ''}')]: inject preset component`);
    onCreate({parent: this._root});
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {onDestroy, label} = this.props;
    if (!this._root || !onDestroy) {
      return;
    }

    onDestroy({parent: this._root});
    logger.debug(`[componentWillUnmount('${label || ''}')]: destroy preset component`);
  }

  /**
   * render component
   *
   * @param {*} props - props
   * @param {*} state - state
   * @param {*} context - context
   * @returns {React$Element} - component
   * @memberof Container
   */
  render(): React$Element<any> {
    const {label} = this.props;
    return <div data-kp-injected={label} ref={ref => (this._root = ref)} />;
  }
}

export {InjectedComponent};
