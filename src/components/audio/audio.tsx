import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyCode} from '../../utils';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {IconComponent, registerToBottomBar} from '../bottom-bar';
import {AudioMenu, SmartContainer} from '..';
import {withEventManager} from '../../event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  showAudioButton: state.config.showAudioButton,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  audioTracks: state.engine.audioTracks,
  audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages
});

const COMPONENT_NAME = 'Audio';

/**
 * Audio component
 *
 * @class Audio
 * @example <Audio />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withText({
  audioLabelText: 'settings.audio'
})
class Audio extends Component<any, any> implements IconComponent {
  private ref: any;

  /**
   * Creates an instance of Audio component.
   * @memberof Audio
   */
  constructor(props: any) {
    super(props);
    this.setState({smartContainerOpen: false});
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

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
    return this.props.audioLabelText;
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
  private onClick = (): void => {
    this.setState(prevState => {
      return {
        smartContainerOpen: !prevState.smartContainerOpen
      };
    });
  };

  private onClose = (): void => {
    this.setState({smartContainerOpen: false});
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
    const hasAudioOptions = this.props.audioTracks.filter(t => t.label || t.language).length > 1;
    if (!this.props.showAudioButton || !hasAudioOptions) return;

    return (
      <ButtonControl ref={ref => (this.ref = ref)} name={COMPONENT_NAME} className={this.props.classNames ? this.props.classNames.join(' ') : ''}>
        <Tooltip label={this.props.audioLabelText} type={this.props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
          <Button
            tabIndex="0"
            aria-label={this.props.audioLabelText}
            className={style.controlButton}
            onClick={() => this.onClick()}
            onKeyDown={this.onKeyDown}>
            <Icon type={IconType.Audio} />
          </Button>
        </Tooltip>
        {this.state.smartContainerOpen && (
          <SmartContainer targetId={this.props.player.config.targetId} onClose={() => this.onClose()} title={this.getComponentText()}>
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
