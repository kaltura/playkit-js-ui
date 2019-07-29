//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import * as sidePanelUtils from '../../utils/side-panels';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  playerClientRect: state.shell.playerClientRect
});

@connect(mapStateToProps)
/**
 * VideoPlayer component
 *
 * @class VideoPlayer
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
class VideoPlayer extends Component {
  _el: HTMLElement;

  /**
   * this component should not render itself when player object changes.
   *
   * @param {any} nextProps - component props
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.sidePanels !== nextProps.sidePanels ||
      this.props.sidePanelsAllowed !== nextProps.sidePanelsAllowed ||
      this.props.playerClientRect !== nextProps.playerClientRect
    );
  }

  /**
   * appending the player view to component after the component was mounted
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  componentDidMount() {
    this._el.appendChild(this.props.player.getView());
  }

  /**
   * render component
   *
   * @param {any} props - component props
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(props): React$Element<any> {
    const videoStyle = props.sidePanelsAllowed
      ? sidePanelUtils.calculateVideoStyles({
          maxSidePanelWidth: 480,
          minSidePanelWidth: 240,
          sidePanels: props.sidePanels,
          playerClientRect: props.playerClientRect
        })
      : {};

    return <div style={videoStyle} className={style.videoPlayer} ref={c => (this._el = c)} />;
  }
}

export {VideoPlayer};
