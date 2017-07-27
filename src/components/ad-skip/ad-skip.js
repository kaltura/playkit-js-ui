//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  currentTime: state.engine.adProgress.currentTime,
  duration: state.engine.adProgress.duration,
  adSkipTimeOffset: state.engine.adSkipTimeOffset,
  adSkippableState: state.engine.adSkippableState
});

@connect(mapStateToProps)
class AdSkip extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'AdSkip', player: obj.player});
  }

  getSkipTimeOffset() {
    if (this.player.config.plugins.ima.skipSupport) {
      return Math.ceil(this.player.config.plugins.ima.skipSupport.skipTimeOffset - this.props.currentTime);
    }
    else {
      return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
    }
  }

  render() {
    if (!this.props.adSkippableState && this.player.config.plugins.ima.skipSupport) {
      return this.getSkipTimeOffset() <= 0 ?  (
        <a className='btn btn-branded btn-skip-ad' onClick={() => this.player.skipAd()}>
          Skip ad
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
