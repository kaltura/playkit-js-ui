//@flow
import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {withPlayer} from '../player';
import {withLogger} from '../logger';

/**
 * The maximum next item poster width
 * @type {number}
 * @const
 */
const MAX_POSTER_WIDTH: number = 384;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

const COMPONENT_NAME = 'PlaylistNextScreen';

/**
 * PlaylistNextScreen component
 *
 * @class PlaylistNextScreen
 * @example <PlaylistNextScreen type="next"/>
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
class PlaylistNextScreen extends Component<any, any> {
  focusElement!: HTMLDivElement;

  /**
   * after component updated, if was renderd and now should then focus for keyboard a11y
   * @param {Object} previousProps - previous props
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  componentDidUpdate(previousProps: Object): void {
    if (!this._shouldRender(previousProps) && this._shouldRender(this.props) && this.focusElement) {
      this.focusElement.focus();
    }
  }
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - component element
   */
  _shouldRender(props: any): boolean {
    return !!(
      props.playlist &&
      props.playlist.next &&
      props.playlist.next.sources &&
      props.isPlaybackEnded &&
      !props.player.playlist.options.autoContinue
    );
  }

  /**
   * next poster click handler
   *
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onPosterClick = (): void => {
    this.props.player.playlist.playNext();
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER || e.keyCode === KeyMap.SPACE) {
      e.preventDefault();
      this.onPosterClick();
    }
  };

  /**
   * @private
   * @memberof PlaylistNextScreen
   * @returns {string} - Next poster URL
   */
  _getPosterUrl(): string {
    const next = this.props.playlist.next;
    if (next.sources.poster) {
      return next.sources.poster.indexOf(`entry_id/${next.sources.id}`) > -1 && next.sources.poster.indexOf('/width/') === -1
        ? `${next.sources.poster}/width/${MAX_POSTER_WIDTH}`
        : next.sources.poster;
    }
    return '';
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistNextScreen
   */
  render(props: any): VNode<any> | undefined {
    if (!this._shouldRender(props)) {
      return undefined;
    }
    const next = props.playlist.next;
    return (
      <div className={style.playlistNextScreenOverlay}>
        <div className={style.playlistNextScreenContent}>
          <div id="playlistNextScreenTextId" className={style.playlistNextScreenText}>
            <Localizer>
              <div className={style.playlistNextScreenTextTitle}>
                <Text id="playlist.next" />
              </div>
            </Localizer>
            <div className={style.playlistNextScreenTextName}>{`${next.sources.metadata ? next.sources.metadata.name : ''}`}</div>
          </div>
          <div className={style.playlistNextScreenPosterPlaceholder}>
            <div className={style.playlistNextScreenPosterAspectRatio}>
              <div
                role="button"
                aria-labelledby="playlistNextScreenTextId"
                ref={el => (el ? (this.focusElement = el) : undefined)}
                tabIndex={0}
                className={style.playlistNextScreenPoster}
                onClick={this.onPosterClick}
                onKeyDown={this.onKeyDown}>
                <div className={style.playlistNextScreenPosterImg} style={`background-image: url(${this._getPosterUrl()});`} />
                <Icon type={IconType.Play} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PlaylistNextScreen.displayName = COMPONENT_NAME;
export {PlaylistNextScreen};
