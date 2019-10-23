//@flow
import style from '../../styles/style.scss';
import {h, Component, cloneElement} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import Portal from 'preact-portal';
import {Overlay} from '../overlay';
import {withKeyboardA11y} from '../../utils/popup-keyboard-accessibility';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'SmartContainer';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withKeyboardA11y(false)
/**
 * SmartContainer component
 *
 * @class SmartContainer
 * @example <SmartContainer title='Language' onClose={() => this.controlButtonClickHandler()}>
 *   <SmartContainerItem
 *     icon={IconType.Audio}
 *     label='Audio'
 *     options={audioTrackOptions}
 *     onSelect={audioTrack => this.audioTrackChangeHandler(audioTrack)}
 *   />
 *   ...
 * </SmartContainer>
 * @extends {Component}
 */
class SmartContainer extends Component {
  // ie11 fix (FEC-7312) - don't remove
  _portal: any;

  /**
   * before component mounted, add player css class
   *
   * @returns {void}
   * @memberof SmartContainer
   */
  componentWillMount() {
    this.props.addPlayerClass(style.smartContainerOpen);
    this.props.updateSmartContainerOpen(true);
  }

  /**
   * after component unmounted, remove player css class
   *
   * @returns {void}
   * @memberof SmartContainer
   */
  componentWillUnmount() {
    this.props.removePlayerClass(style.smartContainerOpen);
    this.props.updateSmartContainerOpen(false);
  }

  /**
   * after component mounted, set A11y HOC to modal if is portal
   * @returns {void}
   * @memberof SmartContainer
   */
  componentDidMount(): void {
    this.props.setIsModal(this.props.isMobile || this.props.isSmallSize);
  }

  /**
   * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
   * otherwise, render smart container
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): React$Element<any> {
    const portalSelector = `#${this.props.targetId} .overlay-portal`;
    props.clearAccessibleChildren();
    return this.props.isMobile || this.props.isSmallSize ? (
      <Portal
        into={portalSelector}
        ref={ref =>
          // ie11 fix (FEC-7312) - don't remove
          (this._portal = ref)
        }>
        <Overlay
          open
          onClose={() => props.onClose()}
          handleKeyDown={e => this.props.handleKeyDown(e)}
          pushCloseButton={el => this.props.addAccessibleChild(el)}>
          <div className={style.title}>{props.title}</div>
          {this.renderChildren(props)}
        </Overlay>
      </Portal>
    ) : (
      <div
        onKeyDown={e => {
          props.handleKeyDown(e);
        }}
        tabIndex="-1"
        className={[style.smartContainer, style.top, style.left].join(' ')}>
        {this.renderChildren(props)}
      </div>
    );
  }

  /**
   * adds the children pushref prop to forward to keyboard accessibility popup hoc
   * @param {any} props - smart containers props
   * @returns {React$Element<any>} the rendered jsx
   */
  renderChildren(props: any): React$Element<any> {
    const children = props.children.map(child => {
      if (child) {
        return cloneElement(
          child,
          {
            pushRef: ref => {
              props.addAccessibleChild(ref);
            }
          },
          ...this.props
        );
      }
    });
    return children;
  }
}

SmartContainer.displayName = COMPONENT_NAME;
export {SmartContainer};
