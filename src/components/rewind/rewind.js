//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';

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
 * @example <RewindControl player={this.player} step={5} />
 * @extends {BaseComponent}
 */
class RewindControl extends BaseComponent {
  _button: HTMLButtonElement;

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
    let to;
    const step = this.props.step || REWIND_DEFAULT_STEP;
    const from = this.player.currentTime;
    if (this.player.currentTime - step < 0) {
      to = 0;
    } else {
      to = this.player.currentTime - step;
    }
    this.player.currentTime = to;
    this.notifyClick({
      from: from,
      to: to
    });
  }

  /**
   * toggles the animation state to activate the rotate animation
   *
   * @returns {void}
   * @memberof RewindControl
   */
  animate(): void {
    this._button.classList.add(style.rotate);
  }

  /**
   * after component mounted, set initial class
   *
   * @returns {void}
   * @memberof Forward
   */
  componentDidMount() {
    this._button.classList.add(style.controlButton);
    this.eventManager.listen(this._button, 'animationend', () => {
      this._button.classList.remove(style.rotate);
    });
  }

  /**
   * before component mounted, remove event listeners
   *
   * @returns {void}
   * @memberof Shell
   */
  componentWillUnmount(): void {
    super.componentWillUnmount();
    this._button.classList.remove(style.rotate);
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
      <div className={[style.controlButtonContainer, style.noIdleControl].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.rewind'} />}
            ref={c => (this._button = c)}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={!props.step || props.step === REWIND_DEFAULT_STEP ? IconType.Rewind10 : IconType.Rewind} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {RewindControl};
