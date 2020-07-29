//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {TimeDisplay} from '../time-display';
import {withLogger} from 'components/logger';

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

/**
 * TimeDisplayPlaybackContainer component
 *
 * @class TimeDisplayPlaybackContainer
 * @example <TimeDisplayPlaybackContainer format='currentTime / duration' />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withLogger(COMPONENT_NAME)
class TimeDisplayPlaybackContainer extends Component {
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
