//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {connectToUIPresetsStore} from '../side-panel';
const COMPONENT_NAME = 'top-bar';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

@connectToUIPresetsStore()
@connect(mapStateToProps)
/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
class TopBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof TopBar
   */
  render(props: any): ?React$Element<any> {
    const {sidePanelsStore, disabled, isPlaybackEnded, isCasting} = props;

    const styleClass = [style.topBar];

    if (disabled) {
      styleClass.push(style.disabled);
    }
    if (isCasting && isPlaybackEnded) {
      styleClass.push(style.hide);
    }

    const elementStyle = sidePanelsStore.calculatePresetChildStyles('TOP');

    return (
      <div style={elementStyle} className={styleClass.join(' ')}>
        {props.children}
      </div>
    );
  }
}

//Object.defineProperty(TopBar, 'name', {value: 'TopBar'});

TopBar.displayName = COMPONENT_NAME;
export {TopBar};
