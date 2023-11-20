import {h, Component} from 'preact';

export type WithEventDispatcherProps = {
  notifyClick?(payload?: any): void
  notifyChange?(payload?: any): void
  notifyHoverChange?(payload?: any): void
}

/**
 *
 * @param {string} name - the component name
 * @returns {Component} - the wrapped component
 */
export const withEventDispatcher = <P extends object>(name: string) => (WrappedComponent: any): any =>
  class EventDispatcherComponent extends Component<P & WithEventDispatcherProps, any> {
    /**
     * Notify that a clickable component has been clicked.
     * @param {any} payload - Optional payload.
     * @returns {void}
     *
     * @memberof EventDispatcherComponent
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
     * @memberof EventDispatcherComponent
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
    render() {
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
