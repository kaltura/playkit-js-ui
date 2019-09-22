//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {actions as loadingActions} from '../../reducers/loading';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';

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

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, loadingActions))
)
@withPlayer
/**
 * PrePlaybackPlayOverlay component
 *
 * @class PrePlaybackPlayOverlay
 * @example <PrePlaybackPlayOverlay />
 * @extends {BaseComponent}
 */
class PrePlaybackPlayOverlay extends BaseComponent {
  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @memberof PrePlaybackPlayOverlay
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * play on click
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  handleClick(): void {
    this.props.player.getView().focus();
    this.props.playlist && this.props.isPlaybackEnded ? this.props.player.playlist.playNext() : this.props.player.play();
    this.notifyClick();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PrePlaybackPlayOverlay
   */
  render(props: any): React$Element<any> | void {
    if ((!props.prePlayback && (!props.isPlaybackEnded || (props.playlist && props.playlist.next))) || props.loading) {
      return undefined;
    }
    return (
      <div className={style.prePlaybackPlayOverlay} onMouseOver={e => e.stopPropagation()} onClick={() => this.handleClick()}>
        {
          <Localizer>
            <a
              className={style.prePlaybackPlayButton}
              tabIndex="0"
              aria-label={<Text id={props.isPlaybackEnded ? 'controls.startOver' : 'controls.play'} />}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  this.handleClick();
                }
              }}>
              {props.isPlaybackEnded ? <Icon type={IconType.StartOver} /> : <Icon type={IconType.Play} />}
            </a>
          </Localizer>
        }
      </div>
    );
  }
}

PrePlaybackPlayOverlay.displayName = COMPONENT_NAME;
export {PrePlaybackPlayOverlay};
