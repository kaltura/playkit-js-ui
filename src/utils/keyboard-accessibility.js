//@flow
import {BaseComponent} from '../components/base';
import {h} from 'preact';

/**
 * @param {BaseComponent} WrappedComponent - The component to implement keyboard accessibility
 * @returns {BaseComponent} - HOC that handles animation
 */
export const withKeyboardA11y: Function = (WrappedComponent: BaseComponent): typeof BaseComponent =>
  class extends BaseComponent {
    _firstFocusedElement: HTMLElement;
    _previouslyActiveElement: ?HTMLElement;

    /**
     * after component mounted, listen to events
     *
     * @returns {void}
     * @memberof HOC
     */
    componentDidMount() {
      if (this._firstFocusedElement) {
        this._previouslyActiveElement = document.activeElement;
        this._firstFocusedElement.focus();
      }
    }

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof HOC
     */
    componentWillUnmount(): void {
      super.componentWillUnmount();
      if (this._previouslyActiveElement) {
        this._previouslyActiveElement.focus();
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof HOC
     */
    render(props: any): React$Element<any> | void {
      return h(WrappedComponent, {
        ...props,
        setFirstFocusedElement: this.setFirstFocusedElement.bind(this)
      });
    }

    /**
     * sets the child element to focus on mount
     * @param {HTMLElement} element - first element to focus on
     * @returns {void}
     * @memberof HOC
     */
    setFirstFocusedElement(element: HTMLElement): void {
      this._firstFocusedElement = element;
    }
  };
