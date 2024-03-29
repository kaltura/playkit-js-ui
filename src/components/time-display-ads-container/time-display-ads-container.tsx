import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {TimeDisplay} from '../time-display';
import {withLogger} from '../logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  adProgress: state.engine.adProgress
});

const COMPONENT_NAME = 'TimeDisplayAdsContainer';

/**
 * TimeDisplayAdsContainer component
 *
 * @class TimeDisplayAdsContainer
 * @example <TimeDisplayAdsContainer format='-left seconds left' />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withLogger(COMPONENT_NAME)
class TimeDisplayAdsContainer extends Component<any, any> {
  /**
   * render component
   *
   * @param {*} props component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayAdsContainer
   */
  render(props: any): VNode<any> {
    return <TimeDisplay currentTime={Math.round(props.adProgress.currentTime)} duration={Math.round(props.adProgress.duration)} {...props} />;
  }
}

TimeDisplayAdsContainer.displayName = COMPONENT_NAME;
export {TimeDisplayAdsContainer};
