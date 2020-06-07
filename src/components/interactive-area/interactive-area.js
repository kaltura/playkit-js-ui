//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withPlayer} from 'components/player';
import style from '../../styles/style.scss';
import {PlayerArea} from 'components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerHover: state.shell.playerHover,
  seekbarDraggingActive: state.seekbar.draggingActive,
  seekbarHoverActive: state.seekbar.hoverActive,
  bottomBarHoverActive: state.shell.bottomBarHoverActive,
  volumeHoverActive: state.volume.hover,
  smartContainerOpen: state.shell.smartContainerOpen
});

const barHeight = 60;

@withPlayer
@connect(
  mapStateToProps,
  null
)
/**
 * InteractiveArea component
 *
 * @class InteractiveArea
 * @extends {Component}
 */
class InteractiveArea extends Component {
  /**
   * checks if bars are visible
   * @returns {boolean} - if hover state can be ended
   * @private
   * @memberof Shell
   */
  areBarsVisible(): boolean {
    return (
      this.props.seekbarDraggingActive ||
      this.props.seekbarHoverActive ||
      this.props.volumeHoverActive ||
      this.props.smartContainerOpen ||
      this.props.player.paused ||
      this.props.playerHover ||
      this.props.bottomBarHoverActive
    );
  }

  /**
   * @returns {void}
   */
  render() {
    const containerStyle = {};

    if (this.areBarsVisible()) {
      containerStyle.height = `calc(100% - ${2 * barHeight}px)`;
      containerStyle.top = `${barHeight}px`;
    }

    return (
      <div className={style.interactiveArea} style={containerStyle}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'InteractiveArea'} />
        </div>
      </div>
    );
  }
}

export {InteractiveArea};
