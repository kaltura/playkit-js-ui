//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {actions} from '../../reducers/backdrop';
import {KeyMap} from '../../utils/key-map';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {Tooltip} from 'components/tooltip';
import {withText} from 'preact-i18n';

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
@connect(mapStateToProps, actions)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withText({castText: 'cast.play_on_tv'})
class Cast extends Component {
  /**
   * On click set the backdrop to visible.
   * If cast session start failed remove the backdrop.
   * @memberof Cast
   * @returns {void}
   */
  onClick = (): void => {
    this.props.updateBackdropVisibility(true);
    this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.Cast.CAST_SESSION_START_FAILED, () =>
      this.props.updateBackdropVisibility(false)
    );
  };

  /**
   * on key down handler - on enter open toggle drop down menu
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Cast
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.props.updateBackdropVisibility(true);
      this.props.player.startCasting().catch(() => this.props.updateBackdropVisibility(false));
    }
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Cast
   */
  render(props: any): ?React$Element<any> {
    if (props.isCasting || props.isCastAvailable) {
      return (
        <div
          role="button"
          aria-label={this.props.castText}
          className={style.controlButtonContainer}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}>
          <Tooltip label={this.props.castText}>
            <google-cast-launcher className={style.castButton} tabIndex="0" />
          </Tooltip>
        </div>
      );
    }
  }
}

Cast.displayName = COMPONENT_NAME;
export {Cast};
