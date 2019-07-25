//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {SidePanelModes} from '../../reducers/shell';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelMode: state.shell.sidePanelMode
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
    return this.props.sidePanelMode !== nextProps.sidePanelMode;
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
    const styleClass = [style.videoPlayer];

    if (props.sidePanelMode === SidePanelModes.EXPANDED) {
      styleClass.push(style.sidePanelMode);
    }

    return <div className={styleClass.join(' ')} ref={c => (this._el = c)} />;
  }
}

export {VideoPlayer};
