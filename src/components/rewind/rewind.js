//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";

/**
 * Default rewind step
 * @type {number}
 * @const
 */
export const REWIND_DEFAULT_STEP = 10;

/**
 * RewindControl component
 *
 * @class RewindControl
 * @example <RewindControl player={Fthis.player} step={5} />
 * @extends {BaseComponent}
 */
class RewindControl extends BaseComponent {

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
    this.animate();
    const step = this.props.step || REWIND_DEFAULT_STEP;
    if (this.player.currentTime - step < 0) {
      this.player.currentTime = 0;
    } else {
      this.player.currentTime = this.player.currentTime - step;
    }
  }

  /**
   * toggles the animation state to activate the rotate animation
   *
   * @returns {void}
   * @memberof RewindControl
   */
  animate(): void {
    this.setState({animation: false});
    this.forceUpdate();
    this.setState({animation: true});
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
            className={`${style.controlButton} ${this.state.animation ? style.rotate : ''}`}
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
