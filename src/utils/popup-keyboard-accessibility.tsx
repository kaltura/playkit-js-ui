import {h, Component} from 'preact';
import {withPlayer} from './../components/player';
import {KeyMap} from './key-map';
import {focusElement} from './focus-element';

/**
 * wraps a component and handles all key navigation and focus
 * @param {Component} WrappedComponent - The popup component to implement keyboard accessibility
 * @returns {Component} - HOC that handles animation
 */
export const withKeyboardA11y = (WrappedComponent): any => {
  @withPlayer
  class KeyBoardAccessibility extends Component<any, any> {
    _defaultFocusedElement!: HTMLElement;
    _accessibleChildren: Array<HTMLElement> = [];
    _previouslyActiveElement?: HTMLElement | null;
    _isModal: boolean = false;
    _morePluginButton: HTMLButtonElement | null = null;

    /**
     * after component mounted, focus on relevant element
     *
     * @returns {void}
     * @memberof HOC
     */
    componentDidMount() {
      this.focusOnDefault();
    }

    /**
     * checks if the overlay is open
     * @returns {boolean} - true if the overlay is open
     * @memberof HOC
     */
    get isOverlayOpen() {
      return this.props.player.ui.store.getState().overlay.isOpen;
    }

    /**
     * setter to change to modal state
     * @param {boolean} value - the modal state
     * @memberOf HOC
     */
    set isModal(value: boolean) {
      this._isModal = value;
    }

    /**
     * setter to change to more button state
     * @param {boolean} value - the modal state
     * @memberOf HOC
     */
    set morePluginButton(button: HTMLButtonElement | null) {
      this._morePluginButton = button;
    }

    /**
     * handles keydown events
     * @param {KeyboardEvent} e - the keyboard event
     * @returns {void}
     * @memberof HOC
     */
    onKeyDown = (e: KeyboardEvent): void => {
      switch (e.keyCode) {
        case KeyMap.ESC:
          if (this.props.onClose) {
            this.props.onClose();
            e.stopPropagation();
          }
          break;
        case KeyMap.DOWN:
        case KeyMap.UP:
          if (document.activeElement && !this._isModal) {
            let activeElementIndex = this._accessibleChildren.indexOf(document.activeElement as HTMLElement);
            activeElementIndex =
              (activeElementIndex + (e.keyCode == KeyMap.DOWN ? 1 : -1) + this._accessibleChildren.length) % this._accessibleChildren.length;
            this._accessibleChildren[activeElementIndex].focus();
            e.preventDefault();
            e.stopPropagation();
          }

          break;
        case KeyMap.TAB:
          // hijack tab click to enforce accessibility only inside the modal
          if (this._isModal) {
            if (!e.shiftKey && document.activeElement === this._accessibleChildren[this._accessibleChildren.length - 1]) {
              this._accessibleChildren[0].focus();
              e.preventDefault();
              e.stopPropagation();
            } else if (e.shiftKey && document.activeElement === this._accessibleChildren[0]) {
              this._accessibleChildren[this._accessibleChildren.length - 1].focus();
              e.preventDefault();
              e.stopPropagation();
            }
          } else {
            // if not a modal, tabbing should close the window and continue with default behaviour
            this._previouslyActiveElement = null;
            if (this.props.onClose) {
              this.props.onClose();
            }
          }

          break;
      }
    };

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof HOC
     */
    componentWillUnmount(): void {
      if (this._previouslyActiveElement && document.contains(this._previouslyActiveElement) && !this.isOverlayOpen) {
        focusElement(this._previouslyActiveElement);
      } else if (this._previouslyActiveElement?.classList.contains('playkit-dropdown-item_kw')) {
        focusElement(this._morePluginButton);
      }
    }

    /**
     * render component
     *
     * @param {*} props - component props
     * @returns {React$Element} - component element
     * @memberof HOC
     */
    render(props: any) {
      return (
        <WrappedComponent
          {...props}
          setDefaultFocusedElement={this.setDefaultFocusedElement}
          focusOnDefault={this.focusOnDefault}
          addAccessibleChild={this.addAccessibleChild}
          clearAccessibleChildren={this.clearAccessibleChildren}
          handleKeyDown={this.onKeyDown}
          setIsModal={this.setIsModel}
          setMoreButton={this.setMoreButton}
        />
      );
    }

    /**
     * sets the child element to focus on mount
     * @param {HTMLElement} element - first element to focus on
     * @returns {void}
     * @memberof HOC
     */
    setDefaultFocusedElement = (element: HTMLElement): void => {
      if (element) {
        this._defaultFocusedElement = element;
      }
    };

    /**
     * sets the accessible children elements
     * @param {HTMLElement} element - a child element to be accessible through keyboard nav
     * @param {?boolean} pushToBeginning - push to beginning of the array or to the end
     * @returns {void}
     * @memberof HOC
     */
    addAccessibleChild = (element: HTMLElement, pushToBeginning?: boolean): void => {
      if (element && this._accessibleChildren.indexOf(element) == -1) {
        pushToBeginning ? this._accessibleChildren.unshift(element) : this._accessibleChildren.push(element);
      }
    };

    /**
     * clears the the accessible children array
     * @returns {void}
     * @memberof HOC
     */
    clearAccessibleChildren = (): void => {
      this._accessibleChildren = [];
    };

    /**
     * focuses on the default accessible element (either an explicitly given default element or the first)
     * @returns {void}
     * @memberof HOC
     */
    focusOnDefault = (): void => {
      const defaultElement = this._defaultFocusedElement || (this._accessibleChildren.length && this._accessibleChildren[0]);
      if (defaultElement) {
        this._previouslyActiveElement = document.activeElement as HTMLElement;
        defaultElement.focus();
      }
    };

    /**
     * sets is model value
     * @param {boolean} isModel - whether is a model or not
     * @returns {void}
     * @memberof HOC
     */
    setIsModel = (isModel: boolean): void => {
      this.isModal = isModel;
    };

    setMoreButton = (moreButton: HTMLButtonElement | null): void => {
      this.morePluginButton = moreButton;
    };
  };
  return KeyBoardAccessibility;
}
