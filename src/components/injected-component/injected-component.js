//@flow
import {h, Component} from 'preact';
import getLogger from '../../utils/logger';

// TODO sakal check with Oren if should inherit from 'BaseComponent'
// TODO sakal if using base component, use its' logger

const logger = getLogger('InjectedComponent');

/**
 * injected component wrapper with support for life-cycle events
 */
class InjectedComponent extends Component {
  _root = null;

  /**
   * constructor
   * @param {*} props props
   * @param {*} context context
   * @return {void}
   */
  constructor(props, context) {
    super(props, context);
  }

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
    const {create, label} = this.props;

    if (!create) {
      logger.warn(`Cannot inject preset item with label '${label}', missing 'create' method`);
      return;
    }

    if (!this._root) {
      logger.warn(`Cannot inject preset item with label '${label}', failed to create parent component`);
      return;
    }

    logger.debug(`[componentDidMount('${label || ''}')]: inject preset component`);
    create({parent: this._root});
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {destroy, label} = this.props;
    if (!this._root || !destroy) {
      return;
    }

    destroy({parent: this._root});
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
