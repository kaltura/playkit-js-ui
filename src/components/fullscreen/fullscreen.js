//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {actions as fullscreenActions} from '../../reducers/fullscreen';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  targetId: state.config.targetId,
  fullscreen: state.fullscreen.fullscreen,
  isMobile: state.shell.isMobile
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, fullscreenActions))
)
/**
 * FullscreenControl component
 *
 * @class FullscreenControl
 * @example <FullscreenControl player={this.player} />
 * @extends {BaseComponent}
 */
class FullscreenControl extends BaseComponent {
  _targetDiv: ?HTMLElement;

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  constructor(obj: Object) {
    super({name: 'Fullscreen', player: obj.player});
  }

  /**
   * before component mounted, cache the target id div
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  componentWillMount(): void {
    this._targetDiv = document.getElementById(this.props.targetId);
    this.eventManager.listen(this.player, this.player.Event.ENTER_FULLSCREEN, () => this._fullscreenEnterHandler());
    this.eventManager.listen(this.player, this.player.Event.EXIT_FULLSCREEN, () => this._fullscreenExitHandler());
  }

  /**
   * fullscreen change handler function.
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  _fullscreenEnterHandler(): void {
    this.props.updateFullscreen(true);
  }

  /**
   * fullscreen change handler function.
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  _fullscreenExitHandler(): void {
    this.props.updateFullscreen(false);
  }

  /**
   * toggle fullscreen based on current fullscreen state in store
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  toggleFullscreen(): void {
    this.logger.debug(`Toggle fullscreen`);
    this.props.fullscreen ? this.player.exitFullscreen(this._targetDiv) : this.player.enterFullscreen(this._targetDiv);
    this.notifyClick();
  }

  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof FullscreenControl
   */
  render(): React$Element<any> {
    return (
      <div className={[style.controlButtonContainer, style.controlFullscreen].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id="controls.fullscreen" />}
            className={this.props.fullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
            onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {FullscreenControl};
