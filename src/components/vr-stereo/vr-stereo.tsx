import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {actions as engineActions} from '../../reducers/engine';
import {bindActions} from '../../utils';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isVr: state.engine.isVr,
  vrStereoMode: state.engine.vrStereoMode,
  config: state.config.components.vrStereo
});

const COMPONENT_NAME = 'VrStereo';

/**
 * VrStereo component
 *
 * @class VrStereo
 * @example <VrStereo />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...engineActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
@withText({
  vrStereoText: 'controls.vrStereo'
})
class VrStereo extends Component<any, any> {
  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const componentConfig = this.props.config;
    const isActive = this.props.isVr && !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }
  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereo
   */
  onClick = (): void => {
    this.props.player.toggleVrStereoMode();
    this.props.updateVrStereoMode(!this.props.vrStereoMode);
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof DropDown
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.onClick();
    }
  };

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof VrStereo
   */
  componentWillMount(): void {
    this.props.updateVrStereoMode(this.props.config.vrStereoMode);
  }
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof VrStereo
   */
  render(): VNode<any> | undefined {
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME}>
        <Tooltip label={this.props.vrStereoText}>
          <Button
            tabIndex="0"
            aria-label={this.props.vrStereoText}
            className={this.props.vrStereoMode ? [style.controlButton, style.vrStereoMode].join(' ') : style.controlButton}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
          >
            <Icon type={IconType.vrStereo} />
            <Icon type={IconType.vrStereoFull} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

VrStereo.displayName = COMPONENT_NAME;
export {VrStereo};
