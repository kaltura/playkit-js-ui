//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Text} from 'preact-i18n';

/**
 * AdNotice component
 *
 * @class AdNotice
 * @example <AdNotice />
 * @extends {Component}
 */
class AdNotice extends Component {
  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof AdNotice
   */
  render(): React$Element<any> {
    return (
      <span className={style.adNotice}>
        <Text id={'ads.ad_notice'} />
      </span>
    );
  }
}

export {AdNotice};
