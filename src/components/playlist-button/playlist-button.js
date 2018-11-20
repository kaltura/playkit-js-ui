//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist
});

@connect(mapStateToProps)
/**
 * PlaylistButton component
 *
 * @class PlaylistButton
 * @example <PlaylistButton player={this.player} type="next"/>
 * @extends {BaseComponent}
 */
class PlaylistButton extends BaseComponent {
  /**
   * Creates an instance of PlaylistButton.
   * @param {Object} obj obj
   * @memberof PlaylistButton
   */
  constructor(obj: Object) {
    super({name: `PlaybackButton-${obj.type}`, player: obj.player});
  }

  /**
   * playlist button click handler
   *
   * @returns {void}
   * @memberof PlaylistButton
   */
  onClick(): void {
    this.props.type === 'prev' ? this.player.playlist.playPrev() : this.player.playlist.playNext();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistButton
   */
  render(props: any): React$Element<any> | void {
    const item = props.playlist[props.type];
    return (
      <div className={[style.controlButtonContainer, style.controlPlaylistButton].join(' ')}>
        {item && item.sources && (item.sources.poster || (item.sources.metadata && item.sources.metadata.name)) ? (
          <div className={style.posterPreview}>
            <div className={style.posterPreviewText}>
              <Localizer>
                <div className={style.posterPreviewTextTitle}>
                  <Text id={props.type === 'prev' ? 'playlist.prev' : 'playlist.next'} />
                </div>
              </Localizer>
              <div className={style.posterPreviewTextName}>{`${item.sources.metadata ? item.sources.metadata.name : ''}`}</div>
            </div>
            <div className={style.posterPreviewImg} style={`background-image: url(${item.sources.poster});`} />
          </div>
        ) : (
          undefined
        )}
        <Localizer>
          <button
            disabled={!item}
            tabIndex="0"
            aria-label={<Text id={`controls.${props.type}`} />}
            className={`${style.controlButton}`}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            {props.type === 'prev' ? (
              <div>
                <Icon type={IconType.Prev} />
              </div>
            ) : (
              <div>
                <Icon type={IconType.Next} />
              </div>
            )}
          </button>
        </Localizer>
      </div>
    );
  }
}

export {PlaylistButton};
