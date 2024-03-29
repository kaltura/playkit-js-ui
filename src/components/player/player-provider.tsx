import {Component, toChildArray} from 'preact';

/**
 * PlayerProvider component
 *
 * @class PlayerProvider
 * @example <PlayerProvider player={this.player}>...</PlayerProvider>
 * @extends {Component}
 */
class PlayerProvider extends Component<any, any> {
  /**
   * create context player
   * @returns {void}
   */
  getChildContext() {
    return {
      player: this.props.player
    };
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof PlayerProvider
   */
  render() {
    return (this.props.children && toChildArray(this.props.children)[0]) || null;
  }
}
export {PlayerProvider};
