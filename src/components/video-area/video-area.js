//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';
import style from '../../styles/style.scss';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoStyles: state.shell.layoutStyles.video
});

@connect(mapStateToProps)
/**
 * VideoArea
 */
class VideoArea extends Component {
  /**
   * this component should not render itself when player object changes.
   *
   * @param {Object} nextProps - next props of the component
   * @returns {void}
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    return nextProps.videoStyles !== this.props.videoStyles;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   */
  render(): React$Element<any> {
    const {videoStyles, children} = this.props;
    return (
      <div style={videoStyles} className={style.videoArea}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'VideoArea'}>{children}</PlayerArea>
        </div>
      </div>
    );
  }
}

export {VideoArea};
