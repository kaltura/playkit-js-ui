//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  fullscreen: state.engine.fullscreen
});

@connect(mapStateToProps)
/**
 * FullscreenControl component
 *
 * @class FullscreenControl
 * @example <FullscreenControl player={this.player} />
 * @extends {BaseComponent}
 */
class FullscreenControl extends BaseComponent {

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  constructor(obj: Object) {
    super({name: 'Fullscreen', player: obj.player});
  }

  /**
   * toggle fullscreen based on current fullscreen state in store
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  toggleFullscreen(): void {
    this.logger.debug(`Toggle fullscreen`);
    this.props.fullscreen ? this.player.exitFullscreen() : this.player.enterFullscreen();
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
