//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';

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

@connect(mapStateToProps)
/**
 * AdSkip component
 *
 * @class AdSkip
 * @example <AdSkip player={this.player} />
 * @extends {BaseComponent}
 */
class AdSkip extends BaseComponent {
  skipSupport: any;

  /**
   * Creates an instance of AdSkip.
   * @param {Object} obj obj
   * @memberof AdSkip
   */
  constructor(obj: Object) {
    super({name: 'AdSkip', player: obj.player});
  }

  /**
   * componentDidMount
   *
   * @returns {void}
   * @memberof AdSkip
   */
  componentDidMount() {
    this.skipSupport = this.player.config.plugins.ima.skipSupport;
  }

  /**
   * getting the number value of seconds left to be able to skip ad
   *
   * @returns {number} - number of seconds left to skip ad
   * @memberof AdSkip
   */
  getSkipTimeOffset(): number {
    if (this.skipSupport) {
      return Math.ceil(this.skipSupport.skipTimeOffset - this.props.currentTime);
    }
    else {
      return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
    }
  }

  /**
   * render component
   *
   * @returns {React$Element}  - component
   * @memberof AdSkip
   */
  render(): React$Element<any> | void {
    if (!this.props.adSkippableState && this.skipSupport) {
      return this.getSkipTimeOffset() <= 0 ?  (
        <a className='btn btn-branded btn-skip-ad' onClick={() => this.player.skipAd()}>
          {this.skipSupport.label || 'Skip ad'}
        </a>
      ) : (
        <span className='skip-ad'>Skip in {this.getSkipTimeOffset()}</span>
      );
    }
    else {
      return undefined;
    }
  }
}

export default AdSkip;
