//@flow
import {BaseComponent} from '../components/base';
import {h} from 'preact';
import {KeyMap} from '../utils/key-map';

/**
 * @param {BaseComponent} WrappedComponent - The popup component to implement keyboard accessibility
 * @returns {BaseComponent} - HOC that handles animation
 */
export const popupWithKeyboardA11y: Function = (WrappedComponent: BaseComponent): typeof BaseComponent =>
  class extends BaseComponent {
    _firstFocusedElement: HTMLElement;
    _accessibleChildren: Array<HTMLElement> = [];
    _activeElement: ?HTMLElement;
    _previouslyActiveElement: ?HTMLElement;

    /**
     * after component mounted, listen to events
     *
     * @returns {void}
     * @memberof HOC
     */
    componentDidMount() {
      this._activeElement = this._firstFocusedElement || (this._accessibleChildren.length && this._accessibleChildren[0]);
      if (this._activeElement) {
        this._previouslyActiveElement = document.activeElement;
        this._activeElement.focus();
      }
    }

    /**
     * handles keydown events
     * @param {KeyboardEvent} e - the keyboard event
     * @returns {void}
     * @memberof HOC
     */
    onKeyDown(e: KeyboardEvent): void {
      switch (e.keyCode) {
        case KeyMap.DOWN:
        case KeyMap.UP:
          if (!this.props.tabbable) {
            if (this._activeElement) {
              let activeElementIndex = this._accessibleChildren.indexOf(this._activeElement);
              activeElementIndex =
                (activeElementIndex + (e.keyCode == KeyMap.DOWN ? 1 : -1) + this._accessibleChildren.length) % this._accessibleChildren.length;
              this._activeElement = this._accessibleChildren[activeElementIndex];
              this._activeElement.focus();
            }
            e.preventDefault();
            e.stopPropagation();
          }

          break;
        case KeyMap.TAB:
          if (!this.props.tabbable) {
            this._previouslyActiveElement = null;
            if (this.props.onClose) {
              this.props.onClose();
            }
          }
          break;
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
      return h(
        'div',
        {onKeyDown: this.onKeyDown.bind(this)},
        h(WrappedComponent, {
          ...props,
          setFirstFocusedElement: this.setFirstFocusedElement.bind(this),
          addAccessibleChild: this.addAccessibleChild.bind(this)
        })
      );
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

    /**
     * sets the accessible children elements
     * @param {HTMLElement} element - a child element to be accessible through keyboard nav
     * @returns {void}
     * @memberof HOC
     */
    addAccessibleChild(element: HTMLElement): void {
      this._accessibleChildren.push(element);
    }
  };
