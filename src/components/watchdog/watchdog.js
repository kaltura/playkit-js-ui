//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({});

@connect(mapStateToProps)
class Watchdog extends BaseComponent {
  watchdog: Array<Object>;

  constructor(obj: Object) {
    super({name: 'Watchdog', player: obj.player});
    this.watchdog = this.player.config.watchdog;
    this.watchdog.forEach(p => p.seen = false);
    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      const point = this.watchdog.find(p => p.start <= this.player.currentTime && !p.seen);
      if (point && !this.state.active) {
        // this.setState({active: true, point: });
      }
    });
  }

  render(props: any): React$Element<any> {
    return (
      <div className={style.watchdog}>
        <div className={style.familyModeText}>FAMILY MODE</div>
      </div>
    );
  }
}

export {Watchdog};
