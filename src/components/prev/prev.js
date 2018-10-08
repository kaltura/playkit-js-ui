//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {actions as engineActions} from '../../reducers/engine';
import {connect} from "preact-redux";
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  item: state.config.components.playlist.prev
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, engineActions))
)
/**
 * PrevControl component
 *
 * @class PrevControl
 * @example <PrevControl player={this.player}/>
 * @extends {BaseComponent}
 */
class PrevControl extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'playlist';
  /**
   * Creates an instance of PrevControl.
   * @param {Object} obj obj
   * @memberof PrevControl
   */
  constructor(obj: Object) {
    super({name: 'Prev', player: obj.player});
  }

  /**
   * prev click handler
   *
   * @returns {void}
   * @memberof PrevControl
   */
  onClick(): void {
    this.player.playlist.playPrev();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PrevControl
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlPrev].join(' ')}>
        <Localizer>
          <button
            disabled={!this.props.item}
            tabIndex="0"
            aria-label={<Text id={'controls.prev'} />}
            className={`${style.controlButton}`}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.Prev} />
            <Icon type={IconType.PrevDisabled} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {PrevControl};
