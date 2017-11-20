//@flow
import style from './_top-bar.scss';
import {h, Component} from 'preact';

/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
class TopBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof TopBar
   */
  render(props: any): React$Element<any> {
    return (
      <div className={style.topBar}>{props.children}</div>
    )
  }
}

export default TopBar;
