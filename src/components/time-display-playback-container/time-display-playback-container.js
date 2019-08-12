//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {TimeDisplay} from '../time-display';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  currentTime: state.engine.currentTime,
  duration: state.engine.duration
});

const COMPONENT_NAME = 'TimeDisplayPlaybackContainer';

@connect(mapStateToProps)
/**
 * TimeDisplayPlaybackContainer component
 *
 * @class TimeDisplayPlaybackContainer
 * @example <TimeDisplayPlaybackContainer format='currentTime / duration' />
 * @extends {BaseComponent}
 */
class TimeDisplayPlaybackContainer extends BaseComponent {
  /**
   * Creates an instance of TimeDisplayPlaybackContainer.
   * @memberof TimeDisplayPlaybackContainer
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayPlaybackContainer
   */
  render(props: any): React$Element<any> {
    return <TimeDisplay currentTime={props.currentTime} duration={props.duration} {...props} />;
  }
}

TimeDisplayPlaybackContainer.displayName = COMPONENT_NAME;
export {TimeDisplayPlaybackContainer};
