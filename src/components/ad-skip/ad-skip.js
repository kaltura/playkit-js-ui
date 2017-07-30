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
  skipSupport: any;

  constructor(obj: Object) {
    super({name: 'AdSkip', player: obj.player});
  }

  componentDidMount() {
    this.skipSupport = this.player.config.plugins.ima.getConfig('skipSupport');
  }

  getSkipTimeOffset() {
    if (this.skipSupport) {
      return Math.ceil(this.skipSupport.skipTimeOffset - this.props.currentTime);
    }
    else {
      return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
    }
  }

  render() {
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
