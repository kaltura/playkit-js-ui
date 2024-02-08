import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from '../../components/player-area';
import style from '../../styles/style.scss';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoStyles: state.shell.layoutStyles.video
});

/**
 * VideoArea
 */
@connect(mapStateToProps)
class VideoArea extends Component<any, any> {
  /**
   * this component should not render itself when player object changes.
   *
   * @param {Object} nextProps - next props of the component
   * @returns {void}
   */
  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.videoStyles !== this.props.videoStyles;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   */
  render(): VNode<any> {
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
