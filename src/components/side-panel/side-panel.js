//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {FragmentContainer} from '../player-area';
import {SidePanelPositions} from '../../reducers/shell';
import {connect} from 'react-redux';

/**
 * convert word to upper camel case
 * @param {string} word word
 * @returns {string} word
 */
function toUpperCamelCase(word) {
  return word ? `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}` : '';
}


/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelsStyles: state.shell.layoutStyles.sidePanels
})

/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <SidePanel>...</SidePanel>
 * @extends {Component}
 */
@connect(
  mapStateToProps
)
class SidePanel extends Component {

    /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.sidePanelsStyles !== this.props.sidePanelsStyles;
  }

  /**
   * render component
   *
   * @param {object} props - the component props
   * @returns {React$Element} - component element
   * @memberof SidePanel
   */
  render(props): React$Element<any> {
    const {position, sidePanelsStyles  } = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix], style[`sidePanel${toUpperCamelCase(position)}`]];

    const containerName = `SidePanel${position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}`;

    const sidePanelStyles = sidePanelsStyles[props.position];

    return (
      <div style={sidePanelStyles} className={styleClass.join(' ')}>
        <div className={style.sidePanelContent}>
          <FragmentContainer name={containerName} />
        </div>
      </div>
    );
  }
}

export {SidePanel};
