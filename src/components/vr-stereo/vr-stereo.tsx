import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyCode} from '../../utils';
import {actions as engineActions} from '../../reducers/engine';
import {bindActions} from '../../utils';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {IconComponent, registerToBottomBar} from '../bottom-bar';
import {redux} from '../../index';
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
class VrStereo extends Component<any, any> implements IconComponent {
  /**
   * Creates an instance of PictureInPicture.
   * @memberof VrStereo
   */
  constructor(props: any) {
    super(props);
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

  registerComponent(): any {
    return {
      ariaLabel: () => this.getComponentText(),
      displayName: COMPONENT_NAME,
      order: 5,
      svgIcon: () => this.getSvgIcon(),
      onClick: () => this.onClick(),
      component: () => {
        return getComponent({...this.props, classNames: [style.upperBarIcon]});
      },
      shouldHandleOnClick: false
    };
  }

  getComponentText = (): any => {
    return this.props.vrStereoText;
  }

  getSvgIcon(): any {
    return {
      type: redux.useStore().getState().engine.vrStereoMode ? IconType.vrStereoFull : IconType.vrStereo
    };
  }

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
   * @memberof VrStereo
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
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
      <ButtonControl name={COMPONENT_NAME} className={this.props.classNames ? this.props.classNames.join(' ') : ''}>
        <Tooltip label={this.props.vrStereoText} type={this.props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
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

const getComponent = (props: any): VNode => {
  return <VrStereo {...props} />;
}

VrStereo.displayName = COMPONENT_NAME;
export {VrStereo};
