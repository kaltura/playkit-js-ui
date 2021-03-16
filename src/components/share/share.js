//@flow
import {h, Component} from 'preact';
import {default as Icon, IconType} from '../icon';
import {ShareOverlay} from '../share-overlay';
import {createPortal} from 'preact/compat';
import style from '../../styles/style.scss';
import {defaultConfig} from './default-config';
import {actions} from '../../reducers/share';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {withText} from 'preact-i18n';
import {Tooltip} from 'components/tooltip';
import {ToolTipType} from 'components/tooltip/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';

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

/**
 * Share component
 *
 * @class Share
 * @example <Share />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withLogger(COMPONENT_NAME)
@withText({shareTxt: 'controls.share'})
class Share extends Component {
  // ie11 fix (FEC-7312) - don't remove
  _portal: any;

  /**
   * toggle overlay internal component state
   *
   * @returns {void}
   * @memberof Share
   */
  toggleOverlay = (): void => {
    this.setState(
      prevState => {
        return {overlay: !prevState.overlay, previousIsPlaying: this.props.isPlaying || prevState.previousIsPlaying};
      },
      () => {
        this.props.toggleShareOverlay(this.state.overlay);
        if (this.state.overlay) {
          this.props.player.pause();
        } else if (this.state.previousIsPlaying) {
          this.props.player.play();
          this.setState({previousIsPlaying: false});
        }
      }
    );
  };

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
    return this.state.overlay ? (
      createPortal(
        <ShareOverlay
          shareUrl={shareUrl}
          embedUrl={embedUrl}
          enableTimeOffset={enableTimeOffset}
          socialNetworks={shareConfig}
          player={this.props.player}
          onClose={this.toggleOverlay}
        />,
        document.querySelector(portalSelector)
      )
    ) : (
      <ButtonControl name={COMPONENT_NAME}>
        <Tooltip label={this.props.shareTxt} type={this.props.toolTipType ? this.props.toolTipType : ToolTipType.BottomLeft}>
          <Button aria-haspopup="true" className={style.controlButton} onClick={this.toggleOverlay} aria-label={this.props.shareTxt}>
            <Icon type={IconType.Share} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Share.displayName = COMPONENT_NAME;
export {Share};
