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
import {AudioMenu, SmartContainer} from '..';
// /**
//  * mapping state to props
//  * @param {*} state - redux store state
//  * @returns {Object} - mapped state to this component
//  */
const mapStateToProps = state => ({
  //   isVr: state.engine.isVr,
  //   vrStereoMode: state.engine.vrStereoMode,
  //   config: state.config.components.vrStereo
});

const COMPONENT_NAME = 'Audio';

/**
 * Audio component
 *
 * @class Audio
 * @example <Audio />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...engineActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
// @withText({
//   vrStereoText: 'controls.vrStereo'
// })
class Audio extends Component<any, any> implements IconComponent {
  /**
   * Creates an instance of Audio component.
   * @memberof Audio
   */
  constructor(props: any) {
    super(props);
    this.setState({smartContainerOpen: false});
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  private _shouldRender(): boolean {
    return true;
    // const componentConfig = this.props.config;
    // const isActive = this.props.isVr && !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
    // this.props.onToggle(COMPONENT_NAME, isActive);
    // return isActive;
  }

  private _getComponentText(): string {
    return 'Audio';
    // TODO
    // return this.props.vrStereoText;
  }

  public registerComponent(): any {
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

  public getComponentText = (): any => {
    return this.props.audioText;
  };

  public getSvgIcon(): any {
    return {
      type: IconType.Audio
    };
  }

  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereo
   */
  public onClick = (): void => {
    // show audio menu
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof VrStereo
   */
  public onKeyDown = (e: KeyboardEvent): void => {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
      this.onClick();
    }
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Audio
   */
  public render(): VNode<any> | undefined {
    // TODO determine if should render component

    const onClick = () => {
      this.setState(prevState => {
        return {
          smartContainerOpen: !prevState.smartContainerOpen
        };
      });
    };

    const onClose = () => {
      this.setState({smartContainerOpen: false});
    };

    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={this.props.classNames ? this.props.classNames.join(' ') : ''}>
        <Tooltip label={this.props.vrStereoText} type={this.props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
          <Button tabIndex="0" aria-label={this.props.vrStereoText} className={style.controlButton} onClick={onClick} onKeyDown={this.onKeyDown}>
            <Icon type={IconType.Audio} />
          </Button>
        </Tooltip>
        {this.state.smartContainerOpen && (
          <SmartContainer targetId={this.props.player.config.targetId} onClose={onClose} title={'TODO'}>
            <AudioMenu />
          </SmartContainer>
        )}
      </ButtonControl>
    );
  }
}

const getComponent = (props: any): VNode => {
  return <Audio {...props} />;
};

Audio.displayName = COMPONENT_NAME;
export {Audio};
