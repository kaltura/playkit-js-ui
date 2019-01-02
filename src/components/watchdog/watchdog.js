//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import {actions as engineActions} from '../../reducers/engine';
import {FakeEvent} from '../../event/fake-event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  familyMode: state.engine.familyMode,
  watchdog: state.engine.watchdog
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, engineActions))
)
class Watchdog extends BaseComponent {
  watchdog: Array<Object>;

  constructor(obj: Object) {
    super({name: 'Watchdog', player: obj.player});
    this.startWatchdog();
  }

  startWatchdog(): void {
    this.watchdog = this.player.config.watchdog;
    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      this.prePoint = this.watchdog.find(p => p.start - this.player.currentTime < 3 && p.start - this.player.currentTime > 0);
      if (this.prePoint && !this.watchdogEventTriggered) {
        this.player.dispatchEvent(new FakeEvent('watchdog'));
        this.watchdogEventTriggered = true;
      }
      const point = this.watchdog.find(p => p.start <= this.player.currentTime && this.player.currentTime <= p.end);
      if (point) {
        // this.watchdogEventTriggered = false;
        this.props.updateWatchdog(true);
        this._iconOnlyTimeout();
      } else {
        this.props.updateWatchdog(false);
      }
    });
  }

  _iconOnlyTimeout(): void {
    if (this.timeout) return;
    this.timeout = setTimeout(() => {
      this.setState({iconOnly: true});
    }, 5000);
  }

  render(props): React$Element<any> {
    if (!props.watchdog || (!props.familyMode && (!this.player.adMode || this.player.age >= 18))) {
      clearTimeout(this.timeout);
      return undefined;
    }

    const styleClass = [style.nowatchButtonContainer];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);
    if (this.state.iconOnly) styleClass.push(style.showIconOnly);

    return (
      <div className={styleClass.join(' ')}>
        <a className={[style.btn, style.btnDarkTransparent, style.nowatchButton].join(' ')}>
          <div className={style.nowatchIconContainer}>
            <Icon type={IconType.NoWatch} />
          </div>
          <span>Forbidden Content</span>
        </a>
      </div>
    );
  }
}

export {Watchdog};
