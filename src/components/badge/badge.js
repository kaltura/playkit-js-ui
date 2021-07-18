//@flow
import {h, Component} from 'preact';
import style from '../../styles/style.scss';

const COMPONENT_NAME = 'Badge';

/**
 * Badge component
 *
 * @class Badge
 * @example <Badge content={badgeContent} />
 * @extends {Component}
 */
class Badge extends Component {
  /**
   * render component
   *
   * @returns {React$Element}  - component
   * @memberof Badge
   */
  render(): React$Element<any> {
    return <span className={style.badge}>{this.props.content}</span>;
  }
}

Badge.displayName = COMPONENT_NAME;
export {Badge};
