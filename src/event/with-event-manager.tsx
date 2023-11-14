import {h, Component, ComponentClass, ComponentChild} from 'preact';
import {EventManager} from './event-manager';

/**
 * withEventManager component
 * @param {Component} ComponentToWrap - the component to wrap
 * @returns {React$Element} - component element
 */
const withEventManager = (ComponentToWrap: ComponentClass)=> {
  return class EventManagerComponent extends Component<any, any> {
    eventManager: EventManager | null = new EventManager();
    /**
     * Before component is unmounted remove all event manager listeners.
     * @returns {void}
     *
     * @memberof withEventManager
     */
    componentWillUnmount(): void {
      if (this.eventManager) {
        this.eventManager.destroy();
        this.eventManager = null;
      }
    }
    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof withEventManager
     */
    render(): ComponentChild {
      return <ComponentToWrap {...this.props} eventManager={this.eventManager} />;
    }
  };
};

export {withEventManager};
