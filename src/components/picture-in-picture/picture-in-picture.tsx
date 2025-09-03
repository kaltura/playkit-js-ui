import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {KeyCode, KeyMap} from '../../utils';
import {withKeyboardEvent} from '../keyboard';
import {withEventDispatcher} from '../event-dispatcher';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';
import {bindActions} from '../../utils';
import {actions as shellActions} from '../../reducers/shell';
import {ButtonControl} from '../button-control';
import {KeyboardEventHandlers} from '../../types';
import {registerToBottomBar, IconComponent} from '../bottom-bar';
import {getActivePlayer, getPipPlayer} from '../../utils';
import {actions} from '../../reducers/engine';
import {withEventManager} from '../../event';
import { KalturaPlayer } from '@playkit-js/kaltura-player-js';


/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPictureInPictureSupported: state.engine.isPictureInPictureSupported,
  isInPictureInPicture: state.engine.isInPictureInPicture,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'PictureInPicture';

/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(shellActions))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  pictureInPictureText: 'controls.pictureInPicture',
  pictureInPictureExitText: 'controls.pictureInPictureExit'
})
class PictureInPicture extends Component<any, any> implements IconComponent {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.P
      },
      action: () => {
        this.togglePip();
        this.props.updatePlayerHoverState(true);
      }
    }
  ];

  /**
   * Creates an instance of PictureInPicture.
   * @memberof PictureInPicture
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
      onClick: () => this.togglePip(),
      component: () => {
        return getComponent({...this.props, classNames: [style.upperBarIcon]});
      },
      shouldHandleOnClick: false
    };
  }

  getSvgIcon = (): any => {
    return {
      type: this.props.player.isInPictureInPicture() ? IconType.PictureInPictureStop : IconType.PictureInPictureStart
    };
  }

  getComponentText = (): string => {
    return this.props.player.isInPictureInPicture() ? this.props.pictureInPictureExitText : this.props.pictureInPictureText;
  }

  /**
   * component mounted
   *
   * @returns {void}
   * @memberof PictureInPicture
   */
  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof PictureInPicture
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
      this.togglePip();
      this.props.updatePlayerHoverState(true);
    }
  };

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const isActive = !!(this.props.isPictureInPictureSupported === undefined || this.props.isPictureInPictureSupported);
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }

  /**
   * create listeners for pip envents
   * @param {KalturaPlayer} player - player to listen on
   * @returns {void}
   * @memberof PictureInPicture 
   */
  createPipListeners = (player: KalturaPlayer): void => {
    this.props.eventManager.listen(player, player.Event.Core.ENTER_PICTURE_IN_PICTURE, () => {
      this.props.player.ui.store.dispatch?.(actions.updateIsInPictureInPicture(true));
    });
    this.props.eventManager.listen(player, player.Event.Core.LEAVE_PICTURE_IN_PICTURE, () => {
      this.props.player.ui.store.dispatch?.(actions.updateIsInPictureInPicture(false));
    });
  }

  /**
   * toggle pip
   * @returns {void}
   *
   * @memberof PictureInPicture
   */
  togglePip = (): void => {
    const dualScreenPlayer = getActivePlayer();
    const targetPlayer = dualScreenPlayer || this.props.player;
    const dualScreenInPip = getPipPlayer();

    if (targetPlayer.isInPictureInPicture() || dualScreenInPip) {
      this.props.logger.debug('Exit Picture In Picture');
      this.props.notifyClick();
      if (dualScreenInPip){
        dualScreenInPip.exitPictureInPicture();
      } else {
        this.props.player.exitPictureInPicture();
      }
    } else {
      this.props.logger.debug('Enter Picture In Picture');
      this.props.notifyClick();
      if (dualScreenPlayer){
        this.createPipListeners(dualScreenPlayer);
      }
      targetPlayer.enterPictureInPicture();   
    }
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof PictureInPicture
   */
  render(): VNode<any> | undefined {
    if (this._shouldRender()) {
      return (
        <ButtonControl name={COMPONENT_NAME} className={this.props.classNames ? this.props.classNames.join(' ') : ''}>
          <Tooltip label={this.props.isInPictureInPicture ? this.props.pictureInPictureExitText : this.props.pictureInPictureText} type={this.props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
            <Button
              tabIndex="0"
              aria-label={this.props.isInPictureInPicture ? this.props.pictureInPictureExitText : this.props.pictureInPictureText}
              className={this.props.isInPictureInPicture ? [style.controlButton, style.isInPictureInPicture].join(' ') : style.controlButton}
              onClick={this.togglePip}
              onKeyDown={this.onKeyDown}
            >
              <Icon type={IconType.PictureInPictureStart} />
              <Icon type={IconType.PictureInPictureStop} />
            </Button>
          </Tooltip>
        </ButtonControl>
      );
    }
  }
}

const getComponent = (props: any): VNode => {
  return <PictureInPicture {...props} />;
}

PictureInPicture.displayName = COMPONENT_NAME;
export {PictureInPicture};
