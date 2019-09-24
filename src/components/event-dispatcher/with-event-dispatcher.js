//@flow
import {h, Component} from 'preact';

/**
 *
 * @param {string} name - the component name
 * @returns {Component} - the wrapped component
 */
export const withEventDispatcher: Function = (name: string) => (WrappedComponent: Component): typeof Component =>
  class EventDispatcherComponent extends Component {
    /**
     * Notify that a clickable component has been clicked.
     * @param {any} payload - Optional payload.
     * @returns {void}
     *
     * @memberof BaseComponent
     */
    notifyClick(payload?: any): void {
      this.context.notifyClick({
        name: name,
        payload: payload
      });
    }

    /**
     * Notify that a changeable component has been change.
     * @param {any} payload - Optional payload.
     * @returns {void}
     *
     * @memberof EventDispatcherComponent
     */
    notifyChange(payload?: any): void {
      this.context.notifyChange({
        name: name,
        payload: payload
      });
    }

    /**
     * Notify the hover state has change.
     * @param {any} payload - Optional payload.
     * @returns {void}
     *
     * @memberof BaseComponent
     */
    notifyHoverChange(payload?: any): void {
      this.context.notifyHoverChange({
        name: name,
        payload: payload
      });
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof LoggerComponent
     */
    render(): React$Element<any> | void {
      return (
        <WrappedComponent
          {...this.props}
          notifyHoverChange={payload => this.notifyHoverChange(payload)}
          notifyChange={payload => this.notifyChange(payload)}
          notifyClick={payload => this.notifyClick(payload)}
        />
      );
    }
  };
