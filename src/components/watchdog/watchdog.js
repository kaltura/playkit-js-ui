//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

class Watchdog extends BaseComponent {
  watchdog: Array<Object>;

  constructor(obj: Object) {
    super({name: 'Watchdog', player: obj.player});
    this.startWatchdog();
  }

  startWatchdog(): void {
    this.watchdog = this.player.config.watchdog;
    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      if (this.state.active) {
        if (this.state.point.end <= this.player.currentTime) {
          this.state.point.seen = true;
          this.setState({active: false, point: null});
        }
      } else {
        const point = this.watchdog.find(p => p.start <= this.player.currentTime && this.player.currentTime <= p.end);
        if (point && !this.state.active) {
          this.setState({active: true, point: point});
        }
      }
    });
  }

  getContentForbiddenIcon(): React$Element<any> {
    return (
      <div>
        <div className={style['content-forbidden-container']}>
          <Icon type={IconType.NoWatch} />
        </div>
        <div className={style['content-forbidden-text']}>
          <span>Violent Content</span>
        </div>
      </div>
    );
  }

  render(): React$Element<any> {
    return <div className={style.watchdog}>{this.state.active ? this.getContentForbiddenIcon() : undefined}</div>;
  }
}

export {Watchdog};
