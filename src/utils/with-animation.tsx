import {h, Component, createRef} from 'preact';
import {withEventManager} from '../event';

/**
 * @param {string} cssClass - the CSS class to add/remove for the animation
 * @returns {Component} - the wrapped component
 */
export const withAnimation = (cssClass: string) => WrappedComponent =>
  withEventManager(
    class AnimationComponent extends Component<any, any> {
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
      render() {
        return <WrappedComponent {...this.props} innerRef={this.ref} animate={this.animate} />;
      }
    }
  );
