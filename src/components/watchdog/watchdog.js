//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import {actions as engineActions} from '../../reducers/engine';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  familyMode: state.engine.familyMode
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
      const point = this.watchdog.find(p => p.start <= this.player.currentTime && this.player.currentTime <= p.end);
      if (point) {
        this.setState({active: true});
      } else {
        this.setState({active: false});
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
    return <div
      className={style.watchdog}>{this.state.active && this.props.familyMode ? this.getContentForbiddenIcon() : undefined}</div>;
  }
}

export {Watchdog};
