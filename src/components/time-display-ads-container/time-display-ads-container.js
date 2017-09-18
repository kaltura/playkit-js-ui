//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import TimeDisplay from '../time-display';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  adProgress: state.engine.adProgress
});

@connect(mapStateToProps)
  /**
   * TimeDisplayAdsContainer component
   *
   * @class TimeDisplayAdsContainer
   * @example <TimeDisplayAdsContainer format='-left seconds left' />
   * @extends {BaseComponent}
   */
class TimeDisplayAdsContainer extends BaseComponent {
  /**
   * Creates an instance of TimeDisplayAdsContainer.
   * @memberof TimeDisplayAdsContainer
   */
  constructor() {
    super({name: 'TimeDisplayAdsContainer'});
  }

  /**
   * render component
   *
   * @param {*} props component props
   * @returns {React$Element} - component element
   * @memberof TimeDisplayAdsContainer
   */
  render(props: any): React$Element<any> {
    return (
      <TimeDisplay
        currentTime={Math.ceil(props.adProgress.currentTime)}
        duration={Math.ceil(props.adProgress.duration)}
        {...props}
      />
    )
  }
}

export default TimeDisplayAdsContainer;
