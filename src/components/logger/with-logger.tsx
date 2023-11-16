import {h, Component, ComponentType} from 'preact';
import getLogger from '../../utils/logger';

export type WithLoggerProps = {
  logger: any
}

/**
 * @param {string} name - the component display name
 * @returns {Component} - the wrapped component
 */
// <P extends object>(ComponentToWrap: ComponentType<P>)
// export const withLogger = <P extends object>(name: string) => (WrappedComponent: ComponentType<P>): ComponentType<P & withLoggerProps> =>
export const withLogger = <P extends object>(name: string) => (WrappedComponent: any): any =>
  class LoggerComponent extends Component<P & WithLoggerProps, any> {
    logger: any;

    /**
     * When component is initialized create event manager instance.
     * @returns {void}
     *
     * @memberof LoggerComponent
     */
    constructor(props: P) {
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
