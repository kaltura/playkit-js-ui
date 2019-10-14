//@flow
import {h, Component} from 'preact';
import {EventManager} from 'event/event-manager';

/**
 * withEventManager component
 * @param {Component} ComponentToWrap - the component to wrap
 * @returns {React$Element} - component element
 */
const withEventManager = (ComponentToWrap: Component) => {
  return class EventManagerComponent extends Component {
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
    render(): React$Element<any> {
      return <ComponentToWrap {...this.props} eventManager={this.eventManager} />;
    }
  };
};

export {withEventManager};
