//@flow
import {h, Component} from 'preact';
import style from '../styles/style.scss';

/**
 * withEventManager component
 * @param {Component} componentName - the component name
 * @returns {React$Element} - component element
 */
const controlButton: Function = (componentName: string) => (ComponentToWrap: Component) => {
  return class ControlButtonComponent extends Component {
    _buttonElement: HTMLElement;
    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof ControlButtonComponent
     */
    render(): React$Element<any> {
      return (
        <div
          ref={c => (c ? (this._buttonElement = c) : undefined)}
          className={[style.controlButtonContainer, `${__CSS_MODULE_PREFIX__}-${componentName.toLowerCase()}-control`].join(' ')}>
          <ComponentToWrap {...this.props} buttonElement={this._buttonElement} />
        </div>
      );
    }
  };
};

export {controlButton};
