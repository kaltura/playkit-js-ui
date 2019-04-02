//@flow
import {h} from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {ShareOverlay} from '../share-overlay';
import Portal from 'preact-portal';
import style from '../../styles/style.scss';
import {defaultConfig} from './default-config';
import {actions} from '../../reducers/share';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @example <ShareOverlay player={this.player} />
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  open: state.share.overlayOpen,
  isPlaying: state.engine.isPlaying,
  config: state.config.components.share
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * ShareControl component
 *
 * @class ShareControl
 * @example <ShareControl player={this.player} />
 * @extends {BaseComponent}
 */
class ShareControl extends BaseComponent {
  /**
   * Creates an instance of ShareControl.
   * @param {Object} obj obj
   * @memberof ShareControl
   */
  constructor(obj: Object) {
    super({name: 'Share', player: obj.player});
  }

  /**
   * toggle overlay internal component state
   *
   * @returns {void}
   * @memberof ShareControl
   */
  toggleOverlay(): void {
    this.setState({overlay: !this.state.overlay});
    this.props.toggleShareOverlay(this.state.overlay);
    if (this.props.isPlaying || this.state.previousIsPlaying) {
      this.setState({previousIsPlaying: true});
    } else {
      this.setState({previousIsPlaying: false});
    }
    if (this.state.overlay) {
      this.player.pause();
    } else if (this.state.previousIsPlaying) {
      this.player.play();
      this.setState({previousIsPlaying: false});
    }
  }

  /**
   * returns the merged share config
   * @returns {Object[]} the merged share config
   * @private
   */
  _getMergedShareConfig(): Array<Object> {
    let appConfig = this.props.config.socialNetworks || [];
    return appConfig.concat(defaultConfig.filter(item => !appConfig.find(appItem => appItem.name === item.name)));
  }

  /**
   * render element
   *
   * @returns {React$Element} component element
   * @memberof ShareControl
   */
  render(): React$Element<any> | void {
    const {embedUrl, enable, shareUrl, enableTimeOffset} = this.props.config;
    if (!(enable && shareUrl && embedUrl)) {
      return undefined;
    }
    const shareConfig = this._getMergedShareConfig();
    const portalSelector = `#${this.player.config.targetId} .overlay-portal`;
    return (
      <div className={[style.controlButtonContainer, style.controlShare].join(' ')}>
        <button className={style.controlButton} onClick={() => this.toggleOverlay()} aria-label="Share">
          <Icon type={IconType.Share} />
        </button>
        {this.state.overlay ? (
          <Portal into={portalSelector}>
            <ShareOverlay
              shareUrl={shareUrl}
              embedUrl={embedUrl}
              enableTimeOffset={enableTimeOffset}
              socialNetworks={shareConfig}
              player={this.player}
              onClose={() => this.toggleOverlay()}
            />
          </Portal>
        ) : null}
      </div>
    );
  }
}

export {ShareControl};
