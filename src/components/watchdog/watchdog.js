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
  constructor(obj: Object) {
    super({name: 'Watchdog', player: obj.player});
  }

  render(props: any): React$Element<any> {
    return (
      <div></div>
    );
  }
}

export {Watchdog};
