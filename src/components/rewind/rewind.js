//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";

/**
 * Default rewind step
 * @type {number} number of seconds
 * @const
 */
const DEFAULT_STEP = 10;

/**
 * RewindControl component
 *
 * @class RewindControl
 * @example <RewindControl player={this.player} step={5} />
 * @extends {BaseComponent}
 */
class RewindControl extends BaseComponent {
  _classList: Array<string> = [style.controlButton];

  /**
   * Creates an instance of RewindControl.
   * @param {Object} obj obj
   * @memberof RewindControl
   */
  constructor(obj: Object) {
    super({name: 'Rewind', player: obj.player});
  }

  /**
   * rewind click handler
   *
   * @returns {void}
   * @memberof RewindControl
   */
  onClick(): void {
    const step = this.props.step || DEFAULT_STEP;
    if (this.player.currentTime - step < 0) {
      this.player.currentTime = 0;
    } else {
      this.player.currentTime = this.player.currentTime - step;
    }
    this.rotate();
  }

  /**
   * toggles the rotate class to activate the rotate animation
   *
   * @returns {void}
   * @memberof RewindControl
   */
  rotate(): void {
    this._classList = this._classList.filter(s => s !== style.rotate);
    this.forceUpdate();
    this._classList.push(style.rotate);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof RewindControl
   */
  render(props: any): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlRewind].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.rewind'}/>}
            className={this._classList.join(' ')}
            onClick={() => this.onClick()}
            onKeyDown={(e) => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={(!props.step || props.step === 10) ? IconType.Rewind10 : IconType.Rewind}/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export default RewindControl;
