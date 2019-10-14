//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {withPresetAreas} from '../preset-areas';
import {Container} from '../container';
import {SidePanelPositions} from '../../reducers/shell';

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

@withPresetAreas
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
    const {activePresetName, position, allowSidePanels, presetAreasService} = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    if (!allowSidePanels) {
      return null;
    }

    const containerName = `SidePanel${position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}`;

    const sidePanelStyles = presetAreasService.calculateSidePanelStyles(props.position);

    return (
      <div style={sidePanelStyles} className={styleClass.join(' ')} ref={c => (this._el = c)}>
        <Container show={true} key={activePresetName} className={style.sidePanelContent} name={containerName} targetPresetName={activePresetName} />
      </div>
    );
  }
}

export {SidePanel};
