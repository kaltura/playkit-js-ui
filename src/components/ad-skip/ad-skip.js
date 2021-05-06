//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  currentTime: state.engine.adProgress.currentTime,
  duration: state.engine.adProgress.duration,
  adSkipTimeOffset: state.engine.adSkipTimeOffset,
  adSkippableState: state.engine.adSkippableState
});

const COMPONENT_NAME = 'AdSkip';

/**
 * AdSkip component
 *
 * @class AdSkip
 * @example <AdSkip />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
class AdSkip extends Component {
  /**
   * getting the number value of seconds left to be able to skip ad
   *
   * @returns {number} - number of seconds left to skip ad
   * @memberof AdSkip
   */
  getSkipTimeOffset(): number {
    return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
  }

  skipAd = () => {
    this.props.player.ads.skipAd();
  };

  /**
   * render component
   *
   * @returns {React$Element}  - component
   * @memberof AdSkip
   */
  render(): React$Element<any> | void {
    if (this.props.adSkippableState) {
      return this.getSkipTimeOffset() <= 0 ? (
        <Localizer>
          <a className={[style.btn, style.btnBranded, style.btnSkipAd].join(' ')} onClick={this.skipAd}>
            <Text id="ads.skip_ad" />
          </a>
        </Localizer>
      ) : (
        <Localizer>
          <span className={style.skipAd}>
            <Text id="ads.skip_in" />
            {' ' + this.getSkipTimeOffset()}
          </span>
        </Localizer>
      );
    } else {
      return undefined;
    }
  }
}

AdSkip.displayName = COMPONENT_NAME;
export {AdSkip};
