//@flow
import {h, Component, createRef} from 'preact';
import {withEventManager} from 'event/with-event-manager';

/**
 * @param {string} cssClass - the CSS class to add/remove for the animation
 * @returns {Component} - the wrapped component
 */
export const withAnimation: Function = (cssClass: string) => (WrappedComponent: Component): typeof Component =>
  withEventManager(
    class AnimationComponent extends Component {
      ref = createRef();

      /**
       * When component is mounted create event manager instance.
       * @returns {void}
       *
       * @memberof AnimationComponent
       */
      componentDidMount(): void {
        this.props.eventManager.listen(this.ref.current, 'animationend', () => {
          this.ref.current.classList.remove(cssClass);
        });
      }
      /**
       * Before component is unmounted remove all event manager listeners.
       * @returns {void}
       *∏
       * @memberof AnimationComponent
       */
      componentWillUnmount(): void {
        this.ref.current.classList.remove(cssClass);
      }

      /**
       * adds the animation class
       * @returns {void}
       * @memberof AnimationComponent
       */
      animate(): void {
        this.ref.current.classList.add(cssClass);
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
            innerRef={this.ref}
            animate={() => {
              this.animate();
            }}
          />
        );
      }
    }
  );
