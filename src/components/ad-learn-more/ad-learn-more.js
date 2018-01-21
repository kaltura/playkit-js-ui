//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';

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
   * @example <AdLearnMore />
   * @extends {Component}
   */
class AdLearnMore extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof AdLearnMore
   */
  render(props: any): React$Element<any> {
    return <a href={props.url} target='_blank' className={[style.btn, style.btnDarkTransparent].join(' ')}>Learn
      more</a>
  }
}

export default AdLearnMore;
