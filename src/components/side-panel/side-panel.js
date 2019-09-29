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
  sidePanelsModes: state.shell.sidePanelsModes,
  sidePanelsSizes: state.shell.sidePanelsSizes,
  allowSidePanels: state.shell.presetSettings.allowSidePanels,
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

@connectToUIPresetsStore
@connect(mapStateToProps)
/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <SidePanel>...</SidePanel>
 * @extends {Component}
 */
class SidePanel extends Component {
  _el: HTMLElement;

  state = {
    showContent: false
  };

  /**
   * hide content of side panel only once transition is completed
   * @private
   * @param {boolean} isVisible is side panel visible
   * @return {void}
   */
  _onTransitionEnd = isVisible => {
    this.setState({
      showContent: isVisible
    });
  };

  /**
   * render component
   *
   * @param {object} props - the component props
   * @returns {React$Element} - component element
   * @memberof SidePanel
   */
  render(props): React$Element<any> {
    const {activePresetName, position, allowSidePanels, sidePanelsStore} = props;
    const {showContent} = this.state;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    if (!allowSidePanels) {
      return null;
    }

    const containerName = `side-panel-${position.toLowerCase()}`;
    const isVisible = props.sidePanelsModes[props.position] !== SidePanelModes.HIDDEN;
    const sidePanelStyles = isVisible ? sidePanelsStore.calculateSidePanelStyles(props.position) : {};

    // TODO sakal remove
    const tempStyle = {
      ...sidePanelStyles,
      ...{
        opacity: position === 'RIGHT' ? '0.5' : '0.5',
        background:
          props.position === SidePanelPositions.RIGHT
            ? 'purple'
            : props.position === SidePanelPositions.TOP
              ? 'green'
              : props.position === SidePanelPositions.BOTTOM
                ? 'blue'
                : 'yellow'
      }
    };

    return (
      <div style={tempStyle} onTransitionEnd={() => this._onTransitionEnd(isVisible)} className={styleClass.join(' ')} ref={c => (this._el = c)}>
        <Container
          show={isVisible || showContent}
          key={activePresetName}
          className={style.sidePanelContent}
          name={containerName}
          targetPresetName={activePresetName}
        />
      </div>
    );
  }
}

export {SidePanel};
