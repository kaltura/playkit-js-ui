//@flow
import {h, Component} from 'preact';
import {default as Icon, IconType} from '../icon';
import {ShareOverlay} from '../share-overlay';
import Portal from 'preact-portal';
import style from '../../styles/style.scss';
import {defaultConfig} from './default-config';
import {actions} from '../../reducers/share';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  open: state.share.overlayOpen,
  isPlaying: state.engine.isPlaying,
  config: state.config.components.share
});

const COMPONENT_NAME = 'Share';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * Share component
 *
 * @class Share
 * @example <Share />
 * @extends {Component}
 */
class Share extends Component {
  /**
   * toggle overlay internal component state
   *
   * @returns {void}
   * @memberof Share
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
      this.props.player.pause();
    } else if (this.state.previousIsPlaying) {
      this.props.player.play();
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
   * @memberof Share
   */
  render(): React$Element<any> | void {
    const {embedUrl, enable, shareUrl, enableTimeOffset} = this.props.config;
    if (!(enable && shareUrl && embedUrl)) {
      return undefined;
    }
    const shareConfig = this._getMergedShareConfig();
    const portalSelector = `#${this.props.player.config.targetId} .overlay-portal`;
    return (
      <div>
        {this.state.overlay ? (
          <Portal into={portalSelector}>
            <ShareOverlay
              shareUrl={shareUrl}
              embedUrl={embedUrl}
              enableTimeOffset={enableTimeOffset}
              socialNetworks={shareConfig}
              player={this.props.player}
              onClose={() => this.toggleOverlay()}
            />
          </Portal>
        ) : (
          <button className={style.controlButton} onClick={() => this.toggleOverlay()} aria-label="Share">
            <Icon type={IconType.Share} />
          </button>
        )}
      </div>
    );
  }
}

Share.displayName = COMPONENT_NAME;
export {Share};
