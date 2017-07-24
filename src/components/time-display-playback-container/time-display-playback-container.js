//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import TimeDisplay from '../time-display';

const mapStateToProps = state => ({
  currentTime: state.seekbar.currentTime,
  duration: state.engine.duration
});

@connect(mapStateToProps)
class TimeDisplayPlaybackContainer extends BaseComponent {
  constructor() {
    super({name: 'TimeDisplayPlaybackContainer'});
  }

  render(props) {
    return (
      <TimeDisplay
        currentTime={props.currentTime}
        duration={props.duration}
        {...props}
      />
    )
  }
}

export default TimeDisplayPlaybackContainer;
