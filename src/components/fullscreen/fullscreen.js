//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  fullscreen: state.engine.fullscreen,
  targetId: state.config.targetId
});

const COMPONENT_NAME = 'Fullscreen';

@connect(mapStateToProps)
@withPlayer
/**
 * Fullscreen component
 *
 * @class Fullscreen
 * @example <Fullscreen />
 * @extends {BaseComponent}
 */
class Fullscreen extends BaseComponent {
  /**
   * Creates an instance of Fullscreen.
   * @memberof Fullscreen
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * toggle fullscreen based on current fullscreen state in store
   *
   * @returns {void}
   * @memberof Fullscreen
   */
  toggleFullscreen(): void {
    this.logger.debug(`Toggle fullscreen`);
    const playerContainer: HTMLElement | null = document.getElementById(this.props.targetId);
    this.props.fullscreen ? this.props.player.exitFullscreen() : this.props.player.enterFullscreen();
    if (playerContainer) {
      playerContainer.focus();
    }
    this.notifyClick();
  }

  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof Fullscreen
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

Fullscreen.displayName = COMPONENT_NAME;
export {Fullscreen};
