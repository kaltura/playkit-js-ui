//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {Text} from 'preact-i18n';
import {PLAYER_SIZE} from '../shell/shell';

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

@connect(mapStateToProps)
/**
 * LogoControl component
 *
 * @class LogoControl
 * @example <LogoControl player={this.player} />
 * @extends {BaseComponent}
 */
class LogoControl extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'logo';
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - whether to render the component
   * @static
   */
  static shouldRender(props: any): boolean {
    const componentConfig = props.config.components[this.displayName];
    return !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
  }
  /**
   * Creates an instance of LogoControl.
   * @param {Object} obj obj
   * @memberof LogoControl
   */
  constructor(obj: Object) {
    super({name: 'Logo', player: obj.player});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component
   * @memberof LogoControl
   */
  render(props: any): ?React$Element<any> {
    const invisibleMode = [PLAYER_SIZE.TINY, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize);
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

export {LogoControl};
