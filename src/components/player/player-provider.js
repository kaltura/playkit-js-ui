//@flow
import {Component} from 'preact';

/**
 * PlayerProvider component
 *
 * @class PlayerProvider
 * @example <PlayerProvider player={this.player}>...</PlayerProvider>
 * @extends {Component}
 */
class PlayerProvider extends Component {
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
  render(): React$Element<any> | null {
    return (this.props.children && this.props.children[0]) || null;
  }
}
export {PlayerProvider};
