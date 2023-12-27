import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Text} from 'preact-i18n';

type AdLearnMoreProps = {
  url?: string;
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  url: state.engine.adUrl
});

const COMPONENT_NAME = 'AdLearnMore';

/**
 * AdLearnMore component
 *
 * @class AdLearnMore
 * @example <AdLearnMore />
 * @extends {Component}
 */
@connect(mapStateToProps)
class AdLearnMore extends Component<AdLearnMoreProps, {}> {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof AdLearnMore
   */
  render(props: any) {
    return (
      <a href={props.url} target="_blank" rel="noreferrer" className={[style.btn, style.btnDarkTransparent, style.learnMore].join(' ')}>
        <Text id={'ads.learn_more'} />
      </a>
    );
  }
}

AdLearnMore.displayName = COMPONENT_NAME;
export {AdLearnMore};
