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
       * add the animation class, then remove it on animation end
       * @returns {void}
       * @memberof AnimationComponent
       */
      animate = (): void => {
        if (!this.ref.current) return;
        this.ref.current.classList.add(cssClass);
        this.props.eventManager.listenOnce(this.ref.current, 'animationend', () => {
          this.ref.current.classList.remove(cssClass);
        });
      };

      /**
       * render component
       *
       * @returns {React$Element} - component element
       * @memberof HOC
       */
      render(): React$Element<any> | void {
        return <WrappedComponent {...this.props} innerRef={this.ref} animate={this.animate} />;
      }
    }
  );
