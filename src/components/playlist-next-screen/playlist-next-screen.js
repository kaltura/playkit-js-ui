//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

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

@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * PlaylistNextScreen component
 *
 * @class PlaylistNextScreen
 * @example <PlaylistNextScreen type="next"/>
 * @extends {Component}
 */
class PlaylistNextScreen extends Component {
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - component element
   */
  _shouldRender(props: any): boolean {
    return props.playlist && props.playlist.next && props.playlist.next.sources;
  }

  /**
   * next poster click handler
   *
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onPosterClick() {
    this.props.player.playlist.playNext();
  }

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
  render(props: any): React$Element<any> | void {
    if (!this._shouldRender(props)) {
      return undefined;
    }
    const next = props.playlist.next;
    return props.isPlaybackEnded ? (
      <div className={style.playlistNextScreenOverlay}>
        <div className={style.playlistNextScreenContent}>
          <div className={style.playlistNextScreenText}>
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
                tabIndex="0"
                className={style.playlistNextScreenPoster}
                onClick={() => this.onPosterClick()}
                onKeyDown={e => {
                  if (e.keyCode === KeyMap.ENTER) {
                    this.onPosterClick();
                  }
                }}>
                <div className={style.playlistNextScreenPosterImg} style={`background-image: url(${this._getPosterUrl()});`} />
                <Icon type={IconType.Play} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      undefined
    );
  }
}

PlaylistNextScreen.displayName = COMPONENT_NAME;
export {PlaylistNextScreen};
