//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {TimeDisplay} from '../time-display';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  adProgress: state.engine.adProgress
});

const COMPONENT_NAME = 'TimeDisplayAdsContainer';

@connect(mapStateToProps)
/**
 * TimeDisplayAdsContainer component
 *
 * @class TimeDisplayAdsContainer
 * @example <TimeDisplayAdsContainer format='-left seconds left' />
 * @extends {Component}
 */
class TimeDisplayAdsContainer extends Component {
  /**
   * render component
   *
   * @param {*} props component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayAdsContainer
   */
  render(props: any): React$Element<any> {
    return <TimeDisplay currentTime={Math.round(props.adProgress.currentTime)} duration={Math.round(props.adProgress.duration)} {...props} />;
  }
}

TimeDisplayAdsContainer.displayName = COMPONENT_NAME;
export {TimeDisplayAdsContainer};
