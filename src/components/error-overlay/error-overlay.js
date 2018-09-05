//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {default as Icon, IconType} from '../icon';
import BaseComponent from '../base';
import {Overlay} from '../overlay';
import {Text} from 'preact-i18n';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/engine';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: state.config.components.error,
  hasError: state.engine.hasError
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {BaseComponent}
 */
class ErrorOverlay extends BaseComponent {
  sessionEl: HTMLDivElement;

  /**
   * Creates an instance of ErrorObject.
   * @param {Object} obj obj
   * @memberof ErrorObejct
   */
  constructor(obj: any) {
    super({name: 'ErrorOverlay', player: obj.player});
  }

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   * @returns {void}
   * @memberof ShareOverlay
   */
  copyError(): void {
    let selection = window.getSelection();
    let range = document.createRange();
    try {
      range.selectNode(this.sessionEl);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      this.setState({copySuccess: true});
      setTimeout(() => this.setState({copySuccess: false}), 2000);
    } catch (e) {
      this.setState({copySuccess: false});
    }
  }

  /**
   * play on click
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  handleClick(): void {
    this.player.loadMedia(this.props.config.mediaInfo);
  }

  /**
   * render the sessionID line
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderSessionID(): React$Element<any> | void {
    const sessionId = this.player && this.player.config && this.player.config.session && this.player.config.session.id;
    let copyUrlClasses = [style.btnCopyUrl].join(' ');
    copyUrlClasses += this.state.copySuccess ? ' ' + style.copied : '';
    if (sessionId) {
      return (
        <div className={style.linkOptionsContainer}>
          <div className={style.copyUrlRow}>
            <div
              ref={el => {
                this.sessionEl = el;
              }}
              className={style.errorSession}>
              <Text id="error.default_session_text" /> {' ' + sessionId}
            </div>
            <a className={copyUrlClasses} onClick={() => this.copyError()}>
              <Icon type={IconType.Copy} />
              <Icon type={IconType.Check} />
            </a>
          </div>
        </div>
      );
    } else {
      return undefined;
    }
  }

  /**
   * render the retry button
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderRetryButton(): React$Element<any> | void {
    if (this.props.config.mediaInfo) {
      return (
        <div className={style.controlButtonContainer} onClick={() => this.handleClick()}>
          <button className={[style.controlButton, style.retryBtn].join(' ')}>
            <Text id="error.retry" />
          </button>
        </div>
      );
    } else {
      return undefined;
    }
  }

  /**
   * render main state
   *
   * @returns {?React$Element} - main state element
   * @memberof ErrorOverlay
   */
  render(): ?React$Element<any> {
    if (this.props && this.props.hasError) {
      return (
        <div id="overlay-portal">
          <Overlay open permanent={true} type="error">
            <div className={style.errorOverlay}>
              <p className={style.errorText} />
              <div className={style.svgContainer}>
                <svg width="124" height="110" viewBox="0 0 124 110" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <polygon
                      id="path-1"
                      points="58.0906294 70 50.7492774 88.8201923 60.1881585 88.8201923 54.22331 107 73.8876457 84.2307692 64.0554779 84.2307692 70.6102564 70"
                    />
                  </defs>
                  <g id="Player-v3" fill="none" fillRule="evenodd">
                    <g id="Desktop---Default---Error" transform="translate(-365 -103)">
                      <g id="Cloud" transform="translate(366 104)">
                        <path
                          d="M63.5662942,30.179068 C61.0506558,29.4162424 58.3339083,29 55.5,29 C42.5213084,29 32,37.7304474 32,48.5 C32,48.6497107 32.0020332,48.7990274 32.0060779,48.947932 L32.0060779,48.947932 C20.975194,51.4855427 13,58.8323573 13,67.5 C13,71.2164926 14.4662425,74.6901504 17.0109182,77.6459815 C17.3714483,67.0552274 26.624181,58.1393462 39.3259742,55.0194402 L39.3259742,55.0194402 C39.3212229,54.8326784 39.3188345,54.6453999 39.3188345,54.4576271 C39.3188345,41.956968 49.9040267,31.6467441 63.5662942,30.179068 Z"
                          id="Combined-Shape"
                          fillOpacity=".08"
                          fill="#2E2E2E"
                        />
                        <path
                          d="M31.0032591,48.1614253 C31.2192187,36.9518144 42.1402046,28 55.5,28 C64.749856,28 73.0886419,32.3249294 77.2653132,39.0733535 C84.8537029,39.7078593 90.7909537,44.3809769 90.9945979,50.1913309 C102.911627,51.5069936 112,59.4322556 112,69 C112,79.5603607 100.981582,88 87.5,88 C84.4639246,88 81.503099,87.5724513 78.7283559,86.7489741 C74.6488476,88.1943213 69.4726739,89 64,89 C58.7323857,89 53.737093,88.2538247 49.7263698,86.9058736 C46.7827225,87.6274324 43.6763865,88 40.5,88 C24.8190401,88 12,78.9101352 12,67.5 C12,58.659353 19.7679337,51.004786 31.0032591,48.1614253 Z"
                          id="Combined-Shape"
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <g id="Path-8" strokeLinecap="round" strokeLinejoin="round">
                          <use fill="#666" xlinkHref="#path-1" />
                          <path
                            stroke="#1D1D1D"
                            strokeWidth="2"
                            d="M65.6170644,83.2307692 L76.0725949,83.2307692 L51.7165365,111.432521 L58.8076053,89.8201923 L49.2858112,89.8201923 L57.4073201,69 L72.1718429,69 L65.6170644,83.2307692 Z"
                          />
                        </g>
                        <path
                          d="M59.9991166,0 L59.9991166,7.04768642 C59.9991166,7.59997117 60.4468318,8.04768642 60.9991166,8.04768642 C61.5514013,8.04768642 61.9991166,7.59997117 61.9991166,7.04768642 L61.9991166,0 C61.9991166,-0.55228475 61.5514013,-1 60.9991166,-1 C60.4468318,-1 59.9991166,-0.55228475 59.9991166,0 Z M95.3084192,8.85153517 L90.7782537,14.2503762 C90.4232519,14.6734508 90.4784359,15.3042064 90.9015106,15.6592082 C91.3245852,16.01421 91.9553408,15.9590261 92.3103426,15.5359514 L96.8405081,10.1371104 C97.1955099,9.71403572 97.140326,9.08328013 96.7172513,8.72827833 C96.2941766,8.37327654 95.663421,8.4284605 95.3084192,8.85153517 Z M121.628196,36.6783398 L114.687579,37.9021577 C114.143685,37.9980609 113.780517,38.5167193 113.87642,39.0606136 C113.972323,39.6045079 114.490981,39.9676764 115.034876,39.8717732 L121.975492,38.6479553 C122.519386,38.552052 122.882555,38.0333936 122.786652,37.4894993 C122.690748,36.945605 122.17209,36.5824365 121.628196,36.6783398 Z M0.0227411046,38.6479553 L6.96335733,39.8717732 C7.50725163,39.9676764 8.02591002,39.6045079 8.12181326,39.0606136 C8.2177165,38.5167193 7.85454799,37.9980609 7.31065368,37.9021577 L0.37003746,36.6783398 C-0.173856844,36.5824365 -0.69251523,36.945605 -0.788418471,37.4894993 C-0.884321711,38.0333936 -0.521153199,38.552052 0.0227411046,38.6479553 Z M25.157725,10.1371104 L29.6878905,15.5359514 C30.0428923,15.9590261 30.6736479,16.01421 31.0967226,15.6592082 C31.5197972,15.3042064 31.5749812,14.6734508 31.2199794,14.2503762 L26.6898139,8.85153517 C26.3348121,8.4284605 25.7040565,8.37327654 25.2809818,8.72827833 C24.8579072,9.08328013 24.8027232,9.71403572 25.157725,10.1371104 Z"
                          id="Path-9"
                          fill="#666"
                          fillRule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className={style.headline}>{this.props.errorHead ? this.props.errorHead : <Text id={'error.default_error'} />}</div>
              {this.renderSessionID()}
              {this.renderRetryButton()}
            </div>
          </Overlay>
        </div>
      );
    } else {
      return undefined;
    }
  }
}

export {ErrorOverlay};
