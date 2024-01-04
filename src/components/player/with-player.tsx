import {h, Component, ComponentType} from 'preact';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

export type WithPlayerProps = {
  player?: KalturaPlayer
}

/**
 * withPlayer component
 * @param {Component} ComponentToWrap - the component to wrap
 * @returns {ComponentType<P & WithPlayerProps>} - component element
 */
const withPlayer = <P extends object>(ComponentToWrap: any): any => {
  return class PlayerComponent extends Component<P & WithPlayerProps, any> {

    constructor(props: P & WithPlayerProps) {super();}
    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof PlayerProvider
     */
    render() {
      const {player} = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `player` prop, like a hook
      return <ComponentToWrap {...this.props} player={player} />;
    }
  };
};

export {withPlayer};
