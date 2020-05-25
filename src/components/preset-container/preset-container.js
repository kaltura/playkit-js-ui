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
  presetStyles: state.shell.layoutStyles.preset
});

@connect(mapStateToProps)
/**
 * PresetContainer component
 *
 * @class PresetContainer
 * @example <PresetContainer>...</PresetContainer>
 * @extends {Component}
 */
class PresetContainer extends Component {
  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetStyles !== this.props.presetStyles;
  }

  _ref = null;
  _setRef = ref => {
    this._ref = ref;
    this.setState(prevState => ({render: !prevState.render}));
  };

  /*
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {presetStyles, children} = this.props;
    const presetStyle = {...presetStyles, pointerEvents: 'none'};
    return (
      <div style={presetStyle}>
        <div style={{pointerEvents: 'auto'}}>
          <div ref={this._setRef} id="player-gui" className={style.playerGui}>
            <PlayerArea name={'PresetArea'}>{this._ref && children({containerRef: this._ref})}</PlayerArea>
          </div>
        </div>
      </div>
    );
  }
}

export {PresetContainer};
