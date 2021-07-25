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
   * @param {*} classMAp - css classes
   * @returns {string}  - the active classes
   * @memberof Badge
   */
  getClasses(classMAp) {
    return Object.entries(classMAp)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  }

  /**
   * render component
   *
   * @returns {React$Element}  - component
   * @memberof Badge
   */
  render(): React$Element<any> {
    const classes = {
      [style.badge]: true,
      [style.badgeActive]: this.props.active,
      [style.iconBadge]: this.props.iconBadge
    };

    const activeClasses = this.getClasses(classes);
    return <span className={activeClasses}>{this.props.content}</span>;
  }
}

Badge.displayName = COMPONENT_NAME;
export {Badge};
