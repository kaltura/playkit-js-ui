import {h, Component} from 'preact';
import getLogger from '../../utils/logger';

/**
 * @param {string} name - the component display name
 * @returns {Component} - the wrapped component
 */
export const withLogger = (name: string) => (WrappedComponent) =>
  class LoggerComponent extends Component<any, any> {
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
    render() {
      return <WrappedComponent {...this.props} logger={this.logger} />;
    }
  };
