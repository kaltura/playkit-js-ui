//@flow
import {h, Component} from 'preact';
import getLogger from 'utils/logger';

/**
 * @param {string} name - the component display name
 * @returns {Component} - the wrapped component
 */
export const withLogger: Function = (name: string) => (WrappedComponent: Component): typeof Component =>
  class LoggerComponent extends Component {
    logger: any;

    /**
     * When component is initialized create event manager instance.
     * @returns {void}
     *
     * @memberof LoggerComponent
     */
    constructor() {
      super();
      this.logger = getLogger(`UI ${name}`);
      this.logger.debug(`Initialized`);
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof LoggerComponent
     */
    render(): React$Element<any> | void {
      return (
        <span>
          <WrappedComponent {...this.props} logger={this.logger} />
        </span>
      );
    }
  };
