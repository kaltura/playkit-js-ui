//@flow
import {h, Component} from 'preact';
import {KeyMap} from '../utils/key-map';

/**
 * wraps a component and handles all key navigation and focus
 * @param {Component} WrappedComponent - The popup component to implement keyboard accessibility
 * @returns {Component} - HOC that handles animation
 */
export const withKeyboardA11y: Function = (WrappedComponent: Component): typeof Component =>
  class KeyBoardAccessibility extends Component {
    _firstFocusedElement: HTMLElement;
    _accessibleChildren: Array<HTMLElement> = [];
    _activeElement: ?HTMLElement;
    _previouslyActiveElement: ?HTMLElement;

    /**
     * after component mounted, focus on relevant element
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
        case KeyMap.ESC:
          if (this.props.onClose) {
            this.props.onClose();
            e.stopPropagation();
          }
          break;
        case KeyMap.DOWN:
        case KeyMap.UP:
          if (this._activeElement) {
            let activeElementIndex = this._accessibleChildren.indexOf(this._activeElement);
            activeElementIndex =
              (activeElementIndex + (e.keyCode == KeyMap.DOWN ? 1 : -1) + this._accessibleChildren.length) % this._accessibleChildren.length;
            this._activeElement = this._accessibleChildren[activeElementIndex];
            this._activeElement.focus();
          }
          e.preventDefault();
          e.stopPropagation();

          break;
        case KeyMap.TAB:
          this._previouslyActiveElement = null;
          if (this.props.onClose) {
            this.props.onClose();
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
      return (
        <WrappedComponent
          {...props}
          setFirstFocusedElement={el => {
            this.setFirstFocusedElement(el);
          }}
          addAccessibleChild={el => {
            this.addAccessibleChild(el);
          }}
          handleKeyDown={e => {
            this.onKeyDown(e);
          }}
        />
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
