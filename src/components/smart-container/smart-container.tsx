import style from '../../styles/style.scss';
import {h, Component, cloneElement, toChildArray, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/shell';
import {createPortal} from 'preact/compat';
import {Overlay} from '../overlay';
import {withKeyboardA11y} from '../../utils';
import {withText} from 'preact-i18n';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize
});

const COMPONENT_NAME = 'SmartContainer';

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
@connect(mapStateToProps, bindActions(actions))
@withKeyboardA11y
@withText({settingsText: 'settings.title'})
class SmartContainer extends Component<any, any> {
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
    this.props.setIsModal(this.isPortal);
  }

  /**
   * calc to show in portal mode
   * @returns {boolean} - is portal
   */
  get isPortal(): boolean {
    return this.props.isMobile || this.props.isSmallSize;
  }

  /**
   * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
   * otherwise, render smart container
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): VNode<any> {
    const targetId = document.getElementById(this.props.targetId) || document;
    const portalSelector = `.overlay-portal`;
    props.clearAccessibleChildren();
    return this.isPortal ? (
      createPortal(
        <Overlay
          open
          onClose={props.onClose}
          handleKeyDown={this.props.handleKeyDown}
          addAccessibleChild={this.props.addAccessibleChild}
          label={props.settingsText}
        >
          <div className={style.title}>{props.title}</div>
          {this.renderChildren(props)}
        </Overlay>,
        targetId.querySelector(portalSelector)!
      )
    ) : (
      <div onKeyDown={props.handleKeyDown} tabIndex={-1} role="menu" className={[style.smartContainer, style.top, style.left].join(' ')}>
        {this.renderChildren(props)}
      </div>
    );
  }

  /**
   * adds the children pushref prop to forward to keyboard accessibility popup hoc
   * @param {any} props - smart containers props
   * @returns {React$Element<any>} the rendered jsx
   */
  renderChildren(props: any): Array<VNode | undefined> {
    const children = toChildArray(props.children).map(child => {
      if (child) {
        return cloneElement(child as VNode<any>, {
          pushRef: ref => {
            props.addAccessibleChild(ref);
          },
          ...this.props
        });
      }
    });
    return children;
  }
}

SmartContainer.displayName = COMPONENT_NAME;
export {SmartContainer};
