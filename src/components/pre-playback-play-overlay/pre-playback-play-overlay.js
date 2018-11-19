//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {actions as loadingActions} from '../../reducers/loading';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  prePlayback: state.engine.prePlayback,
  poster: state.engine.poster
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, loadingActions))
)
/**
 * PrePlaybackPlayOverlay component
 *
 * @class PrePlaybackPlayOverlay
 * @example <PrePlaybackPlayOverlay player={this.player} />
 * @extends {BaseComponent}
 */
class PrePlaybackPlayOverlay extends BaseComponent {
  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @param {Object} obj obj
   * @memberof PrePlaybackPlayOverlay
   */
  constructor(obj: Object) {
    super({name: 'PrePlaybackPlayOverlay', player: obj.player});
  }

  /**
   * play on click
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  handleClick(): void {
    this.player.getView().focus();
    this.player.play();
    this.props.updateLoadingSpinnerState(true);
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
    if (!props.prePlayback) {
      return undefined;
    }
    let rootStyle = {},
      rootClass = [style.prePlaybackPlayOverlay];

    if (!props.prePlayback && props.poster) {
      rootStyle = {backgroundImage: `url(${props.poster})`};
      rootClass.push(style.hasPoster);
    }

    return (
      <div className={rootClass.join(' ')} style={rootStyle} onMouseOver={e => e.stopPropagation()} onClick={() => this.handleClick()}>
        {
          <a
            className={style.prePlaybackPlayButton}
            tabIndex="0"
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.handleClick();
              }
            }}>
            <Icon type={IconType.Play} />
          </a>
        }
      </div>
    );
  }
}

export {PrePlaybackPlayOverlay};
