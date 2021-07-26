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
    const badgeActiveClassName = this.props.active ? style.badgeActive : '';
    const iconBadgeClassName = this.props.iconBadge ? style.iconBadge : style.labelBadge;
    const activeClasses = `${style.badge} ${badgeActiveClassName} ${iconBadgeClassName}`;

    return <span className={activeClasses}>{this.props.content}</span>;
  }
}

Badge.displayName = COMPONENT_NAME;
export {Badge};
