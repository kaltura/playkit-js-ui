//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {connectToUIPresetsStore} from './connect';
import {Container} from '../container';
import {SidePanelModes, SidePanelPositions} from '../../reducers/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  activePresetName: state.shell.activePresetName
});

/**
 * convert word to upper camel case
 * @param {string} word word
 * @returns {string} word
 */
function toUpperCamelCase(word) {
  return word ? `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}` : '';
}

@connectToUIPresetsStore()
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
    const {activePresetName, position, sidePanelsAllowed, sidePanelsStore} = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    if (!sidePanelsAllowed) {
      return null;
    }

    const containerName = `side-panel-${position.toLowerCase()}`;
    const isVisible = props.sidePanels[props.position] !== SidePanelModes.HIDDEN;
    const sidePanelStyles = isVisible ? sidePanelsStore.calculateSidePanelStyles(props.position) : {};

    // TODO sakal remove
    const tempStyle = {
      ...sidePanelStyles,
      ...{
        opacity: position === 'RIGHT' ? undefined : '0.5',
        background:
          props.position === SidePanelPositions.RIGHT
            ? 'transparent'
            : props.position === SidePanelPositions.TOP
              ? 'green'
              : props.position === SidePanelPositions.BOTTOM
                ? 'blue'
                : 'yellow'
      }
    };

    return (
      <div style={tempStyle} className={styleClass.join(' ')} ref={c => (this._el = c)}>
        <Container
          show={true}
          key={activePresetName}
          className={style.sidePanelContent}
          player={props.player}
          name={containerName}
          targetPresetName={activePresetName}
        />
      </div>
    );
  }
}

export {SidePanel};
