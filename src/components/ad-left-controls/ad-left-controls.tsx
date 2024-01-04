import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {AdNotice} from '../ad-notice';

const COMPONENT_NAME = 'AdLeftControls';

type AdLeftControlsProps = {
  isBumper?: boolean;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isBumper: state.engine.adIsBumper
});

/**
 * AdLeftControls component
 *
 * @class AdNotice
 * @example <AdLeftControls />
 * @extends {Component}
 */
@connect(mapStateToProps)
class AdLeftControls extends Component<AdLeftControlsProps, any> {
  /**
   * render component
   *
   * @returns {?React$Element} - component element
   * @memberof AdLeftControls
   */
  render() {
    return this.props.isBumper ? null : <AdNotice />;
  }
}

AdLeftControls.displayName = COMPONENT_NAME;

export {AdLeftControls};
