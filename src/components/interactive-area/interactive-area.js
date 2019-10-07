//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {withPlayer} from 'components/player';

const mapStateToProps = state => ({
  playerHover: state.shell.playerHover,
  seekbarDraggingActive: state.seekbar.draggingActive,
  seekbarHoverActive: state.seekbar.hoverActive,
  bottomBarHoverActive: state.shell.bottomBarHoverActive,
  volumeHoverActive: state.volume.hover,
  smartContainerOpen: state.shell.smartContainerOpen
});

@withPlayer
@connect(
  mapStateToProps,
  null
)
export class InteractiveArea extends Component {
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

  render() {
    const {children} = this.props;
    // TODO sakal re-write
    const style = {pointerEvents: 'none', width: '100%', height: '100%', position: 'absolute', top: '0', transition: 'top 0.5s, height 0.5s'};

    if (this.areBarsVisible()) {
      // TODO sakal get value from somewhere
      style.height = 'calc(100% - 120px)';
      style.top = '60px';
    }

    // guard against different children types
    return children[0](style);
  }
}
