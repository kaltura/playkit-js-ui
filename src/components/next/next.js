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
  item: state.engine.playlist.next
});

@connect(mapStateToProps)
/**
 * NextControl component
 *
 * @class NextControl
 * @example <NextControl player={this.player}/>
 * @extends {BaseComponent}
 */
class NextControl extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'playlist';
  /**
   * Creates an instance of NextControl.
   * @param {Object} obj obj
   * @memberof NextControl
   */
  constructor(obj: Object) {
    super({name: 'Next', player: obj.player});
  }

  /**
   * next click handler
   *
   * @returns {void}
   * @memberof NextControl
   */
  onClick(): void {
    this.player.playlist.playNext();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof NextControl
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlNext].join(' ')}>
        {props.item ? (
          <div className={style.posterPreview}>
            <div className={style.posterPreviewImg} style={`background-image: url(${props.item.sources.poster});`} />
          </div>
        ) : (
          undefined
        )}
        <Localizer>
          <button
            disabled={!props.item}
            tabIndex="0"
            aria-label={<Text id={'controls.next'} />}
            className={`${style.controlButton}`}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.Next} />
            <Icon type={IconType.NextDisabled} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {NextControl};
