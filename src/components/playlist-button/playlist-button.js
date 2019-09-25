//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist
});

const COMPONENT_NAME = 'PlaylistButton';

@connect(mapStateToProps)
@withPlayer
/**
 * PlaylistButton component
 *
 * @class PlaylistButton
 * @example <PlaylistButton type="next"/>
 * @extends {Component}
 */
class PlaylistButton extends Component {
  /**
   * playlist button click handler
   *
   * @returns {void}
   * @memberof PlaylistButton
   */
  onClick(): void {
    this.props.type === 'prev' ? this.props.player.playlist.playPrev() : this.props.player.playlist.playNext();
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
                  <Text id={props.type === 'prev' ? 'playlist.prev' : 'playlist.up_next'} />
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

PlaylistButton.displayName = COMPONENT_NAME;
export {PlaylistButton};
