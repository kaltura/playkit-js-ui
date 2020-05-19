//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withPlayerAreas} from '../player-areas';
import {PlayerArea} from '../player-area';
import {SidePanelPositions} from '../../reducers/shell';

/**
 * convert word to upper camel case
 * @param {string} word word
 * @returns {string} word
 */
function toUpperCamelCase(word) {
  return word ? `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}` : '';
}

@withPlayerAreas
/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <SidePanel>...</SidePanel>
 * @extends {Component}
 */
class SidePanel extends Component {
  /**
   * render component
   *
   * @param {object} props - the component props
   * @returns {React$Element} - component element
   * @memberof SidePanel
   */
  render(props): React$Element<any> {
    const {position, PlayerAreasService} = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    const containerName = `SidePanel${position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}`;

    const sidePanelStyles = PlayerAreasService.calculateSidePanelStyles(props.position);

    return (
      <div style={sidePanelStyles} className={styleClass.join(' ')}>
        <div className={style.sidePanelContent}>
          <PlayerArea name={containerName} />
        </div>
      </div>
    );
  }
}

export {SidePanel};
