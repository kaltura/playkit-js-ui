//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';

class Watchdog extends BaseComponent {
  watchdog: Array<Object>;

  constructor(obj: Object) {
    super({name: 'Watchdog', player: obj.player});
    this.watchdog = this.player.config.watchdog;
    this.watchdog.forEach(p => p.seen = false);
    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      if (this.state.active) {
        if (this.state.point.end <= this.player.currentTime) {
          this.state.point.seen = true;
          this.setState({active: false, point: null});
        }
      } else {
        const point = this.watchdog.find(p => p.start <= this.player.currentTime && !p.seen);
        if (point && !this.state.active) {
          this.setState({active: true, point: point});
        }
      }
    });
  }

  render(props: any): React$Element<any> {
    if (this.state.active) {
      console.warn('::: active', this.state.point);
    } else {
      console.warn('::: not active');
    }
    return (
      <div className={style.watchdog}>
        <div className={style.familyModeText}>FAMILY MODE</div>
      </div>
    );
  }
}

export {Watchdog};
