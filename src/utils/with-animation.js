//@flow
import {BaseComponent} from '../components/base';
import {h} from 'preact';

/**
 * @param {BaseComponent} WrappedComponent - The component to animate
 * @param {string} cssClass - the CSS class to add/remove for the animation
 * @returns {BaseComponent} - HOC that handles animation
 */
export const withAnimation: Function = (WrappedComponent: BaseComponent, cssClass: string): typeof BaseComponent =>
  class extends BaseComponent {
    element: HTMLElement;

    /**
     * adds the animation class
     *
     * @returns {void}
     * @memberof HOC
     */
    animate(): void {
      this.element.classList.add(cssClass);
    }

    /**
     * after component mounted, listen to events
     *
     * @returns {void}
     * @memberof HOC
     */
    componentDidMount() {
      this.eventManager.listen(this.element, 'animationend', () => {
        this.element.classList.remove(cssClass);
      });
    }

    /**
     * before component unmounted, remove event listeners
     *
     * @returns {void}
     * @memberof HOC
     */
    componentWillUnmount(): void {
      super.componentWillUnmount();
      this.element.classList.remove(cssClass);
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
        innerRef: ref => (this.element = ref),
        animate: this.animate.bind(this)
      });
    }
  };
