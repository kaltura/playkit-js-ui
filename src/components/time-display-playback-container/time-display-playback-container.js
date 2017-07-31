//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import TimeDisplay from '../time-display';

const mapStateToProps = state => ({
  currentTime: state.engine.currentTime,
  duration: state.engine.duration
});

@connect(mapStateToProps)
class TimeDisplayPlaybackContainer extends BaseComponent {
  constructor() {
    super({name: 'TimeDisplayPlaybackContainer'});
  }

  render(props: any) {
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
