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

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof HOC
     */
    render(props: any): React$Element<any> | void {
      return h(
        'div',
        {onKeyDown: e => this.onKeyDown(e, props)},
        h(WrappedComponent, {
          ...props,
          setSelectCallback: this.setSelectCallback.bind(this)
        })
      );
    }

    setSelectCallback(callback: Function) {
      this._selectCallback = callback;
    }

    onKeyDown(e: KeyboardEvent, props: any): void {
      switch (e.keyCode) {
        case KeyMap.ENTER:
          this._selectCallback(props);
          e.stopPropagation();
          break;

        default:
          break;
      }
    }
  };
