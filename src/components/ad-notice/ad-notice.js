//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Text} from 'preact-i18n';
import {connect} from 'react-redux';

const COMPONENT_NAME = 'AdNotice';

const mapStateToProps = state => ({
  adIsBumper: state.engine.adIsBumper
});

/**
 * AdNotice component
 *
 * @class AdNotice
 * @example <AdNotice />
 * @extends {Component}
 */
@connect(mapStateToProps)
class AdNotice extends Component {
  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof AdNotice
   */
  render(): React$Element<any> {
    if (this.props.adIsBumper) {
      return undefined;
    }
    return (
      <span className={style.adNotice}>
        <Text id={'ads.ad_notice'} />
      </span>
    );
  }
}

AdNotice.displayName = COMPONENT_NAME;
export {AdNotice};
