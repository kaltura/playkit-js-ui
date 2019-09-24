//@flow
import {BaseComponent} from '../components/base';
import {h} from 'preact';
import {KeyMap} from '../utils/key-map';

/**
 * @param {BaseComponent} WrappedComponent - The popup item component to implement keyboard accessibility
 * @returns {BaseComponent} - HOC that handles animation
 */
export const popupItemWithKeyboardA11y: Function = (WrappedComponent: BaseComponent): typeof BaseComponent =>
  class extends BaseComponent {
    _selectCallback: Function;
    _closeCallback: Function;

    /**
     * render component
     * @param {any} props - component props
     * @returns {React$Element} - component element
     * @memberof HOC
     */
    render(props: any): React$Element<any> | void {
      return h(
        'div',
        {onKeyDown: e => this.onKeyDown(e, props)},
        h(WrappedComponent, {
          ...props,
          setSelectCallback: this.setSelectCallback.bind(this),
          setCloseCallback: this.setCloseCallback.bind(this)
        })
      );
    }

    /**
     * sets the callback to execute if item is selected (enter pressed)
     * @param {Function} callback - the callback function
     * @returns {void}
     * @memberof HOC
     */
    setSelectCallback(callback: Function): void {
      this._selectCallback = callback;
    }

    /**
     * sets the callback to execute if canceled (esc pressed)
     * @param {Function} callback - the callback function
     * @returns {void}
     * @memberof HOC
     */
    setCloseCallback(callback: Function): void {
      this._closeCallback = callback;
    }

    /**
     * handles keydown events
     * @param {KeyboardEvent} e - the keyboard event
     * @param {any} props - the keyboard event
     * @returns {void}
     * @memberof HOC
     */
    onKeyDown(e: KeyboardEvent, props: any): void {
      switch (e.keyCode) {
        case KeyMap.ENTER:
          this._selectCallback(props);
          e.stopPropagation();
          break;
        case KeyMap.ESC:
          this._closeCallback();
          e.stopPropagation();
          break;

        default:
          break;
      }
    }
  };
