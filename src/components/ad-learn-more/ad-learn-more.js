//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  url: state.engine.adUrl
});

@connect(mapStateToProps)
/**
 * AdLearnMore component
 *
 * @class AdLearnMore
 * @extends {Component}
 */
class AdLearnMore extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof AdLearnMore
   */
  render(props: any): Element {
    return <a href={props.url} target='new' className='btn btn-dark-transparent'>Learn more</a>
  }
}

export default AdLearnMore;
