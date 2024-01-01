import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {KeyMap} from '../../utils';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {Tooltip} from '../../components/tooltip';
import {withText} from 'preact-i18n';
import {RemotePlayerType} from './remote-player-type';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isCastAvailable: state.engine.isCastAvailable
});

const COMPONENT_NAME = 'Cast';

/**
 * Cast component
 *
 * @class Cast
 * @example <Cast />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withText({castText: 'cast.play_on_tv'})
class Cast extends Component<any, any> {
  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const isActive = this.props.isCasting || this.props.isCastAvailable;
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }
  /**
   * On click, mark the player which initiated the cast
   * @memberof Cast
   * @returns {void}
   */
  onClick = (): void => {
    this.props.player.setIsCastInitiator(RemotePlayerType.CHROMECAST, true);
    this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.Cast.CAST_SESSION_START_FAILED, () =>
      this.props.player.setIsCastInitiator(RemotePlayerType.CHROMECAST, false)
    );
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Cast
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.props.player.startCasting(RemotePlayerType.CHROMECAST);
    }
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Cast
   */
  render(props: any): VNode<any> | undefined {
    if (this._shouldRender()) {
      const className = props.isCasting ? `${style.castButton} ${style.castButtonActive}` : style.castButton;
      return (
        <div
          role="button"
          aria-label={this.props.castText}
          className={style.controlButtonContainer}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <Tooltip label={this.props.castText}>
            {/* @ts-ignore */}
            <google-cast-launcher className={className} tabIndex="0" />
          </Tooltip>
        </div>
      );
    }
  }
}

Cast.displayName = COMPONENT_NAME;
export {Cast};
