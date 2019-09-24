//@flow
import {h, Component} from 'preact';
import {withEventManager} from 'event/with-event-manager';

/**
 * @param {Component} WrappedComponent - The component to animate
 * @param {string} cssClass - the CSS class to add/remove for the animation
 * @returns {Component} - HOC that handles animation
 */
export const withAnimation: Function = (WrappedComponent: Component, cssClass: string): typeof Component =>
  withEventManager(
    class AnimationComponent extends Component {
      element: HTMLElement;

      /**
       * When component is mounted create event manager instance.
       * @returns {void}
       *
       * @memberof AnimationComponent
       */
      componentDidMount(): void {
        this.props.eventManager.listen(this.element, 'animationend', () => {
          this.element.classList.remove(cssClass);
        });
      }
      /**
       * Before component is unmounted remove all event manager listeners.
       * @returns {void}
       *∏
       * @memberof AnimationComponent
       */
      componentWillUnmount(): void {
        this.element.classList.remove(cssClass);
      }

      /**
       * adds the animation class
       *
       * @returns {void}
       * @memberof AnimationComponent
       */
      animate(): void {
        this.element.classList.add(cssClass);
      }

      /**
       * render component
       *
       * @returns {React$Element} - component element
       * @memberof HOC
       */
      render(): React$Element<any> | void {
        return (
          <WrappedComponent
            {...this.props}
            innerRef={ref => (this.element = ref)}
            animate={() => {
              this.animate();
            }}
          />
        );
      }
    }
  );
