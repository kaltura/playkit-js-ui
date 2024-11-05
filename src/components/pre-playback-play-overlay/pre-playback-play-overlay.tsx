import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {actions as loadingActions} from '../../reducers/loading';
import {withText} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  prePlayback: state.engine.prePlayback,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  playlist: state.engine.playlist,
  loading: state.loading.show
});

const COMPONENT_NAME = 'PrePlaybackPlayOverlay';

/**
 * PrePlaybackPlayOverlay component
 *
 * @class PrePlaybackPlayOverlay
 * @example <PrePlaybackPlayOverlay />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(loadingActions))
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  startOverText: 'controls.startOver',
  playText: 'controls.play',
  title: 'controls.title'
})
class PrePlaybackPlayOverlay extends Component<any, any> {
  /**
   * play on click
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  handleClick = (): void => {
    this.props.playlist && this.props.isPlaybackEnded ? this.props.player.playlist.playNext() : this.props.player.play();
    this.props.notifyClick();
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.handleClick();
    }
  };

  /**
   * on mouse over handler
   *
   * @param {Event} e - event
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  onMouseOver = (e: Event): void => {
    e.stopPropagation();
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PrePlaybackPlayOverlay
   */
  render(props: any): VNode<any> | undefined {
    const isStartOver = props.isPlaybackEnded && !props.player.config.playback.loop && !(props.playlist && props.playlist.next);
    if (!(props.prePlayback || isStartOver) || props.loading) {
      return undefined;
    }
    const entryName = `, ${this.props.title}: ${this.props.player.sources.metadata?.name}`;
    const labelText = props.isPlaybackEnded ? props.startOverText : props.playText;
    return (
      <div className={style.prePlaybackPlayOverlay} onMouseOver={this.onMouseOver} onClick={this.handleClick}>
        <Button className={style.prePlaybackPlayButton} tabIndex="0" aria-label={labelText + entryName} onKeyDown={this.onKeyDown}>
          <Tooltip label={labelText}>{props.isPlaybackEnded ? <Icon type={IconType.StartOver} /> : <Icon type={IconType.Play} />}</Tooltip>
        </Button>
      </div>
    );
  }
}

PrePlaybackPlayOverlay.displayName = COMPONENT_NAME;
export {PrePlaybackPlayOverlay};
