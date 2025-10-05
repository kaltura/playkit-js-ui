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
import {actions} from '../../reducers/audio-description';
import {IconComponent, registerToBottomBar} from '../bottom-bar';
import {redux} from '../../index';
import {withPlayer} from '../player';
import {AudioDescriptionMenu} from '../audio-description-menu';
import {SmartContainer} from '..';
import {withEventManager} from '../../event';
import {getAudioLanguageKey} from '../../utils/audio-description';

const COMPONENT_NAME = 'AudioDesc';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = ({config, shell, audioDescription}) => ({
  isMobile: shell.isMobile,
  isSmallSize: shell.isSmallSize,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioDescriptionEnabled: audioDescription.isEnabled
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
@withEventManager
@withText({
  audioDescriptionLabelText: 'settings.audioDescription',
  enableAudioDescriptionText: 'audioDescription.enableAudioDescription',
  disableAudioDescriptionText: 'audioDescription.disableAudioDescription'
})
class AudioDesc extends Component<any, any> implements IconComponent {
  constructor(props: any) {
    super(props);
    this.setState({smartContainerOpen: false});
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

  // TODO
  // public componentDidUpdate(previousProps): void {
  //   if (this.props.showAdvancedAudioDescToggle && !previousProps.showAdvancedAudioDescToggle) {
  //     registerToBottomBar(COMPONENT_NAME, this.props.player, () => this.registerComponent());
  //   }
  // }

  public componentDidMount(): void {
    function handleClickOutside(e: any): void {
      const isMobile = this.props.isMobile;
      const isSmallSize = this.props.isSmallSize;
      const ref = this.ref;
      if (!!ref && !ref.contains(e.target) && !isMobile && !isSmallSize) {
        this.setState({smartContainerOpen: false});
      }
    }

    this.props.eventManager.listen(document, 'click', handleClickOutside.bind(this));
  }

  private get audioDescriptionEnabled(): boolean {
    return redux.useStore().getState().audioDescription.isEnabled;
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
    return this.audioDescriptionEnabled ? this.props.enableAudioDescriptionText : this.props.disableAudioDescriptionText;
  };

  public getSvgIcon = (): any => {
    return {
      type: this.audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
    };
  };

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  private _shouldRender(): boolean {
    return this.props.advancedAudioDescriptionLanguages.length > 0 || this.props.audioDescriptionLanguages.length > 0;
  }
  /**
   * AdvancedAudioDesc click handler
   *
   * @returns {void}
   * @memberof AdvancedAudioDesc
   */
  private onClick = (): void => {
    const activeAudioLanguage = getAudioLanguageKey(this.props.player.getActiveTracks()['audio']?.language || '');
    if (
      !activeAudioLanguage ||
      !(
        this.props.audioDescriptionLanguages.includes(activeAudioLanguage) ||
        this.props.advancedAudioDescriptionLanguages.includes(activeAudioLanguage)
      )
    ) {
      return;
    }

    if (!this.props.openMenuFromAudioDescriptionButton) {
      this.props.updateAudioDescriptionEnabled?.(!this.props.audioDescriptionEnabled);
    }

    this.setState(prevState => {
      return {
        smartContainerOpen: !prevState.smartContainerOpen
      };
    });
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof AdvancedAudioDesc
   */
  private onKeyDown = (e: KeyboardEvent): void => {
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
    const onClose = () => {
      this.setState({smartContainerOpen: false});
    };

    const innerButtonComponent = getButtonComponent(
      this.props.openMenuFromAudioDescriptionButton,
      innerRef,
      this.onClick.bind(this),
      this.onKeyDown.bind(this),
      this.props.audioDescriptionEnabled,
      this.getComponentText(),
      this.props.classNames?.includes(style.upperBarIcon)
    );

    // TODO update texts
    return !this._shouldRender() ? undefined : (
      <ButtonControl
        ref={ref => (this.ref = ref)}
        name={COMPONENT_NAME}
        className={[style.noIdleControl, this.props.classNames ? this.props.classNames.join(' ') : ''].join(' ')}>
        {innerButtonComponent}
        {this.state.smartContainerOpen && this.props.openMenuFromAudioDescriptionButton && (
          <SmartContainer targetId={this.props.player.config.targetId} onClose={onClose} title={this.props.audioDescriptionLabelText}>
            <AudioDescriptionMenu />
          </SmartContainer>
        )}
      </ButtonControl>
    );
  }
}

const getButtonComponent = (
  openMenuFromAudioDescriptionButton: boolean,
  innerRef: any,
  onClick: (e: MouseEvent) => void,
  onKeyDown: (e: KeyboardEvent) => void,
  audioDescriptionEnabled: boolean,
  label: string,
  isUpperBarIcon: boolean
): VNode => {
  return openMenuFromAudioDescriptionButton ? (
    <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
      <Icon type={audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
    </Button>
  ) : (
    <Tooltip label={label} type={isUpperBarIcon ? 'bottom-left' : 'top'} strictPosition>
      <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
        <Icon type={audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
      </Button>
    </Tooltip>
  );
};

const getComponent = (props: any): VNode => {
  return <AudioDesc {...props} />;
};

AudioDesc.displayName = COMPONENT_NAME;
export {AudioDesc};
