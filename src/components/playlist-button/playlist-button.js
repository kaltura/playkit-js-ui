//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
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
@withText({
  prevControlsText: 'controls.prev',
  nextControlsText: 'controls.next',
  playlistPrevText: 'playlist.prev',
  playlistUpNextText: 'playlist.up_next'
})
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
    const showPreview = item && item.sources && (item.sources.poster || (item.sources.metadata && item.sources.metadata.name));
    return (
      <div className={[style.controlButtonContainer, style.controlPlaylistButton].join(' ')}>
        {showPreview ? (
          <div className={style.posterPreview}>
            <div className={style.posterPreviewText}>
              <div className={style.posterPreviewTextTitle}>
                {props.type === 'prev' ? this.props.playlistPrevText : this.props.playlistUpNextText}
              </div>
              <div className={style.posterPreviewTextName}>{`${item.sources.metadata ? item.sources.metadata.name : ''}`}</div>
            </div>
            <div className={style.posterPreviewImg} style={`background-image: url(${item.sources.poster});`} />
          </div>
        ) : undefined}
        {showPreview ? (
          this.bottomBarButton(item, props.type)
        ) : (
          <Tooltip label={this.props[`${props.type}ControlsText`]}>{this.bottomBarButton(item, props.type)}</Tooltip>
        )}
      </div>
    );
  }

  /**
   * bottom bar button jsx
   * @param {any} item - the playlist item
   * @param {string }type - the type of the button (prev / next)
   * @returns {React$Element} - the button jsx
   */
  bottomBarButton(item: any, type: string): React$Element<any> {
    return (
      <Button
        disabled={!item}
        tabIndex="0"
        aria-label={this.props[`${type}ControlsText`]}
        className={`${style.controlButton}`}
        onClick={() => this.onClick()}>
        {type === 'prev' ? (
          <div>
            <Icon type={IconType.Prev} />
          </div>
        ) : (
          <div>
            <Icon type={IconType.Next} />
          </div>
        )}
      </Button>
    );
  }
}

PlaylistButton.displayName = COMPONENT_NAME;
export {PlaylistButton};
