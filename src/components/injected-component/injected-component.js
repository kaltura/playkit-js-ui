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
    const {presetComponent} = this.props;
    if (!presetComponent) {
      logger.warn('Cannot inject preset item, presetComponent prop is missing');
      return;
    }
    if (!presetComponent.create) {
      logger.warn(`Cannot inject preset item with label '${presetComponent.label}', missing 'create' method`);
      return;
    }

    if (!this._root) {
      logger.warn(`Cannot inject preset item with label '${presetComponent.label}', failed to create parent component`);
      return;
    }

    logger.debug(`[componentDidMount('${presetComponent.label || ''}')]: inject preset component`);
    presetComponent.create({context: presetComponent.context, parent: this._root});
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {presetComponent} = this.props;
    if (!this._root || !presetComponent || !presetComponent.onDestroy) {
      return;
    }

    presetComponent.onDestroy({context: presetComponent.context, parent: this._root});
    logger.debug(`[componentWillUnmount('${presetComponent.label || ''}')]: destory preset component`);
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
    const {presetComponent} = this.props;
    const label = presetComponent ? presetComponent.label : '';
    return <div data-kp-injected={label} ref={ref => (this._root = ref)} />;
  }
}

export {InjectedComponent};
