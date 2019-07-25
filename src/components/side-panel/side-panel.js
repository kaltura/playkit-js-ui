//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {SidePanelModes} from '../../reducers/shell';
import {connect} from 'preact-redux';
import {Container} from '../container';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelMode: state.shell.sidePanelMode,
  activePresetName: state.shell.presetName
});

@connect(mapStateToProps)
/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
class SidePanel extends Component {
  _el: HTMLElement;

  /**
   * render component
   *
   * @param {object} props - the component props
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(props): React$Element<any> {
    const {activePresetName, sidePanelMode} = props;
    const styleClass = [style.sidePanel];

    if (sidePanelMode === SidePanelModes.COLLAPSED) {
      styleClass.push(style.hide);
    }

    return (
      <div className={styleClass.join(' ')} ref={c => (this._el = c)}>
        <Container
          key={activePresetName}
          className={style.sidePanelContent}
          player={props.player}
          name={'side-panel'}
          presetName={'playbackUI'}
          targetPresetName={activePresetName}
        />
      </div>
    );
  }
}

export {SidePanel};
