//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isCastAvailable: state.engine.isCastAvailable,
  castAvailableTypes: state.engine.castAvailableTypes
});

@connect(
  mapStateToProps,
  null
)
/**
 * CastOverlay component
 *
 * @class ChromecastControl
 * @example <ChromecastControl player={this.player} />
 * @extends {BaseComponent}
 */
class ChromecastControl extends BaseComponent {
  _googleCastButton: HTMLButtonElement;
  _el: HTMLDivElement;

  /**
   * Creates an instance of ChromecastControl.
   * @param {Object} obj obj
   * @memberof ChromecastControl
   */
  constructor(obj: Object) {
    super({name: 'Chromecast', player: obj.player});
    // $FlowFixMe
    this._googleCastButton = document.createElement('button', 'google-cast-button');
    this._googleCastButton.classList.add(style.chromecastButton);
  }

  /**
   * when component did update add the google cast button DOM element to the root div.
   *
   * @returns {void}
   * @memberof ChromecastControl
   */
  componentDidUpdate(): void {
    if (this._el && !this._el.hasChildNodes()) {
      this._el.appendChild(this._googleCastButton);
    }
  }

  /**
   * before component mounted, remove the google cast button DOM element from the root div.
   *
   * @returns {void}
   * @memberof ChromecastControl
   */
  componentWillUnmount(): void {
    if (this._el && this._el.hasChildNodes()) {
      this._el.removeChild(this._googleCastButton);
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof ChromecastControl
   */
  render(props: any): ?React$Element<any> {
    if (props.isCasting || (props.isCastAvailable && props.castAvailableTypes.includes('chromecast'))) {
      return <div className={style.controlButtonContainer} ref={c => (this._el = c)} />;
    }
  }
}

export {ChromecastControl};
