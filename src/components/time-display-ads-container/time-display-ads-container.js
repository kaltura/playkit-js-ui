//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
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
   * @returns {Element} - component element
   * @memberof TimeDisplayAdsContainer
   */
  render(props: any): Element {
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
