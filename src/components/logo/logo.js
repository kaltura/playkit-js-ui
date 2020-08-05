//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Text} from 'preact-i18n';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

const COMPONENT_NAME = 'Logo';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  playerSize: state.shell.playerSize,
  config: state.config.components.logo
});

/**
 * Logo component
 *
 * @class Logo
 * @example <Logo />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
class Logo extends Component {
  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    return !(Object.keys(this.props.config).length === 0 && this.props.config.constructor === Object);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component
   * @memberof Logo
   */
  render(props: any): ?React$Element<any> {
    if (!this._shouldRender()) {
      return undefined;
    }
    const invisibleMode = [PLAYER_SIZE.TINY, PLAYER_SIZE.EXTRA_SMALL, PLAYER_SIZE.SMALL].includes(this.props.playerSize);
    if (props.config.img && !invisibleMode) {
      return (
        <div
          className={[style.controlButtonContainer, style.controlLogo].join(' ')}
          aria-label={<Text id="controls.logo" />}
          title={props.config.text}>
          <a className={style.controlButton} href={props.config.url} target="_blank" rel="noopener noreferrer">
            <img className={style.icon} src={props.config.img} />
          </a>
        </div>
      );
    }
  }
}

Logo.displayName = COMPONENT_NAME;

export {Logo};
