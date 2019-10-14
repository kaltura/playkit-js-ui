//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {withPlayer} from 'components/player';
import style from '../../styles/style.scss';
import {Container} from 'components/container';

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
    const containerStyle = {};

    if (this.areBarsVisible()) {
      containerStyle.height = `calc(100% - ${2 * barHeight}px)`;
      containerStyle.top = `${barHeight}px`;
    }

    return (
      <div className={style.interactiveArea} style={containerStyle}>
        <Container style={{pointerEvents: 'auto'}} name={'InteractiveArea'} />
      </div>
    );
  }
}
