//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import TimeDisplay from '../time-display';

const mapStateToProps = state => ({
  adProgress: state.engine.adProgress
});

@connect(mapStateToProps)
class TimeDisplayAdsContainer extends BaseComponent {
  constructor(obj: Object) {
    super({name: 'TimeDisplayAdsContainer'});
  }

  render(props) {
    return (
      <TimeDisplay
        currentTime={props.adProgress.currentTime}
        duration={props.adProgress.duration}
        {...props}
      />
    )
  }
}

export default TimeDisplayAdsContainer;
