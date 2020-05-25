//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import style from '../../styles/style.scss';
import {PlayerArea} from 'components/player-area';

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
 * PresetContainer component
 *
 * @class PresetContainer
 * @example <PresetContainer>...</PresetContainer>
 * @extends {Component}
 */
class PresetVideoContainer extends Component {
  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.videoStyles !== this.props.videoStyles;
  }

  /*
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {videoStyles, children} = this.props;
    const presetVideoStyle = {...videoStyles, pointerEvents: 'none'};
    return (
      <div style={presetVideoStyle}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'VideoArea'}>{children}</PlayerArea>
        </div>
      </div>
    );
  }
}

export {PresetVideoContainer};
