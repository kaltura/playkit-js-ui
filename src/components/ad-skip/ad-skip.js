//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  currentTime: state.engine.adProgress.currentTime,
  duration: state.engine.adProgress.duration,
  adSkipTimeOffset: state.engine.adSkipTimeOffset
});

@connect(mapStateToProps)
class AdSkip extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'AdSkip', player: obj.player});
  }

  getSkipTimeOffset() {
    return Math.ceil(this.props.adSkipTimeOffset - this.props.currentTime);
  }

  render() {
    if (this.props.adSkipTimeOffset === -1) return undefined;

    return this.getSkipTimeOffset() <= 0 ?  (
      <a className='btn btn-branded btn-skip-ad' onClick={() => this.player.skipAd()}>
        Skip ad
      </a>
    ) : (
      <span className='skip-ad'>Skip in {this.getSkipTimeOffset()}</span>
    );
  }
}

export default AdSkip;
