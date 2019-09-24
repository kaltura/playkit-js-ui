//@flow
import style from '../../styles/style.scss';
import {h, Component, cloneElement} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import Portal from 'preact-portal';
import {Overlay} from '../overlay';
import {PLAYER_SIZE} from '../shell/shell';
import {popupWithKeyboardA11y} from '../../utils/popup-keyboard-accessibility';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  playerSize: state.shell.playerSize
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
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
   * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
   * otherwise, render smart container
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): React$Element<any> {
    const portalSelector = `#${this.props.targetId} .overlay-portal`;
    return props.isMobile || [PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize) ? (
      <Portal into={portalSelector} ref={ref => (this._portal = ref)}>
        <Overlay open onClose={() => props.onClose()}>
          <div className={style.title}>{props.title}</div>
          {props.children}
        </Overlay>
      </Portal>
    ) : (
      <div tabIndex="-1" className={[style.smartContainer, style.top, style.left].join(' ')}>
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
            },
            onClose: props.onClose
          },
          ...this.props
        );
      }
    });
    return children;
  }
}

const keyboardAccessibleSmartContainer = popupWithKeyboardA11y(SmartContainer);
export {keyboardAccessibleSmartContainer as SmartContainer};
