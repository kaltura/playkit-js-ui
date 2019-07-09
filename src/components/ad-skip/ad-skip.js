//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {Localizer, Text} from 'preact-i18n';

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

/**
 * AdSkip component
 *
 * @class AdSkip
 * @example <AdSkip player={this.player} />
 * @extends {BaseComponent}
 */
@connect(mapStateToProps)
class AdSkip extends BaseComponent {
  /**
   * Creates an instance of AdSkip.
   * @param {Object} obj obj
   * @memberof AdSkip
   */
  constructor(obj: Object) {
    super({name: 'AdSkip', player: obj.player});
  }

  /**
   * getting the number value of seconds left to be able to skip ad
   *
   * @returns {number} - number of seconds left to skip ad
   * @memberof AdSkip
   */
  getSkipTimeOffset(): number {
    return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
  }

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
          <a className={[style.btn, style.btnBranded, style.btnSkipAd].join(' ')} onClick={() => this.player.ads.skipAd()}>
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

export {AdSkip};
