//@flow
import {h, Component} from 'preact/dist/preact';

/**
 * withPlayer component
 * @param {Component} ComponentToWrap - the component to wrap
 * @returns {React$Element} - component element
 */
const withPlayer = (ComponentToWrap: Component) => {
  return class PlayerComponent extends Component {
    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof PlayerProvider
     */
    render(): React$Element<any> {
      const {player} = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `player` prop, like a hook
      return <ComponentToWrap {...this.props} player={player} />;
    }
  };
};

export {withPlayer};
