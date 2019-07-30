//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {Container} from '../container';
import {SidePanelModes, SidePanelPositions} from '../../reducers/shell';
import * as sidePanelUtils from '../../utils/side-panels';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  activePresetName: state.shell.activePresetName,
  playerClientRect: state.shell.playerClientRect
});

/**
 * convert word to upper camel case
 * @param {string} word word
 * @returns {string} word
 */
function toUpperCamelCase(word) {
  return word ? `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}` : '';
}

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
    const {activePresetName, position} = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    if (!props.sidePanelsAllowed) {
      return null;
    }

    const containerName = `side-panel-${position.toLowerCase()}`;
    const isVisible = props.sidePanels[props.position] !== SidePanelModes.HIDDEN;

    //let renderedContent = null;
    if (!isVisible) {
      styleClass.push(style[`${stylePrefix}Hidden`]);
    }

    const sidePanelStyles =
      isVisible && props.sidePanelsAllowed
        ? sidePanelUtils.calculateSidePanelStyles({
            maxSidePanelWidth: 480,
            minSidePanelWidth: 240,
            sidePanels: props.sidePanels,
            playerClientRect: props.playerClientRect,
            position: props.position
          })
        : {};

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
          show={isVisible}
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
