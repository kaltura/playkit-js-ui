import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {withEventDispatcher} from '../event-dispatcher';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {connect} from 'react-redux';
import {ButtonControl} from '../button-control';
import {bindActions, KeyCode} from '../../utils';
import {actions} from '../../reducers/settings';
import {IconComponent, registerToBottomBar} from '../bottom-bar';
import {redux} from '../../index';
import {withPlayer} from '../player';

const COMPONENT_NAME = 'AdvancedAudioDesc';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = ({config, settings}) => ({
  showAdvancedAudioDescToggle: config.settings.showAdvancedAudioDescToggle,
  advancedAudioDescEnabled: settings.advancedAudioDesc
});

/**
 * AdvancedAudioDesc component
 *
 * @class AdvancedAudioDesc
 * @example <AdvancedAudioDesc step={5} />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
@withText({
  advancedAudioDescEnabledText: 'settings.advanced_audio_description_enabled',
  advancedAudioDescDisabledText: 'settings.advanced_audio_description_disabled'
})
class AdvancedAudioDesc extends Component<any, any> implements IconComponent {
  constructor(props: any) {
    super();
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

  get advancedAudioDesc(): boolean {
    return redux.useStore().getState().settings.advancedAudioDesc;
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
    return this.advancedAudioDesc ? this.props.advancedAudioDescEnabledText : this.props.advancedAudioDescDisabledText;
  };

  public getSvgIcon = (): any => {
    return {
      type: redux.useStore().getState().settings.advancedAudioDesc ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
    };
  };

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  private _shouldRender(): boolean {
    return this.props.showAdvancedAudioDescToggle;
  }
  /**
   * AdvancedAudioDesc click handler
   *
   * @returns {void}
   * @memberof AdvancedAudioDesc
   */
  private onClick = (): void => {
    const checked = !this.advancedAudioDesc;
    this.props.updateAdvancedAudioDesc(checked);
    this.props.notifyClick({type: 'AdvancedAudioDescription', checked, settings: false});
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof AdvancedAudioDesc
   */
  onKeyDown = (e: KeyboardEvent): void => {
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
   * @memberof AdvancedAudioDesc
   */
  public render({innerRef}: any): VNode<any> | undefined {
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={[style.noIdleControl, this.props.classNames ? this.props.classNames.join(' ') : ''].join(' ')}>
        <Tooltip label={this.getComponentText()} type={this.props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
          <Button
            tabIndex="0"
            aria-label={this.getComponentText()}
            className={`${style.controlButton}`}
            ref={innerRef}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}>
            <Icon type={this.props.advancedAudioDescEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

const getComponent = (props: any): VNode => {
  return <AdvancedAudioDesc {...props} />;
};

AdvancedAudioDesc.displayName = COMPONENT_NAME;
export {AdvancedAudioDesc};
