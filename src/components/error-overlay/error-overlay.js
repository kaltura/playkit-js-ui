//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Overlay} from '../overlay';
import {Text} from 'preact-i18n';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/engine';
import {CopyButton} from '../copy-button';
import {withLogger} from 'components/logger';
import {withPlayer} from 'components/player';
import {Button} from 'components/button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  hasError: state.engine.hasError
});

const COMPONENT_NAME = 'ErrorOverlay';

/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withLogger(COMPONENT_NAME)
class ErrorOverlay extends Component {
  sessionEl: HTMLDivElement;

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   * @returns {void}
   * @memberof ErrorOverlay
   */
  copyError = (): void => {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNode(this.sessionEl);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  };

  /**
   * play on click
   *
   * @returns {void}
   * @memberof ErrorOverlay
   */
  handleClick = (): void => {
    const mediaInfo = this.props.player.getMediaInfo();
    this.props.player.loadMedia(mediaInfo);
  };

  /**
   * render the sessionID line
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderSessionID(): React$Element<any> | void {
    const {player} = this.props;
    const sessionId = player && player.config && player.config.session && player.config.session.id;
    if (sessionId) {
      return (
        <div className={style.linkOptionsContainer}>
          <div className={style.copyUrlRow}>
            <div ref={el => (el ? (this.sessionEl = el) : undefined)} className={style.errorSession}>
              <Text id="error.default_session_text" /> {' ' + sessionId}
            </div>
            <CopyButton copy={this.copyError} />
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
    if (this.props.player.getMediaInfo()) {
      return (
        <div className={style.controlButtonContainer} onClick={this.handleClick}>
          <Button className={[style.btnBorderless, style.retryBtn].join(' ')}>
            <Text id="error.retry" />
          </Button>
        </div>
      );
    }
    return undefined;
  }

  /**
   * render the error head
   *
   * @param {string | null} errorMessage - custom error message
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderErrorHead(errorMessage: string | null): React$Element<any> | void {
    if (errorMessage === null) {
      return undefined;
    }
    const defaultErrorMessage = navigator.onLine ? 'error.default_error' : 'error.network_error';
    const errorContent = errorMessage || <Text id={defaultErrorMessage} />;
    return <div className={style.headline}>{this.props.errorHead ? this.props.errorHead : errorContent}</div>;
  }

  /**
   * render main state
   *
   * @returns {?React$Element} - main state element
   * @memberof ErrorOverlay
   */
  render(): ?React$Element<any> {
    if ((this.props && this.props.hasError) || this.props.permanent) {
      const {player} = this.props;
      const errorOverlaConfig = (player && player.config && player.config.ui && player.config.ui.errorOverlay) || {};
      const {backgroundUrl, errorMessage} = errorOverlaConfig;
      const errorOverlayStyles = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`} : null;
      return (
        <div className={['overlay-portal', backgroundUrl ? style.customErrorSlate : ''].join(' ')}>
          <Overlay open permanent={true} type="error">
            <div className={style.errorOverlay} style={errorOverlayStyles}>
              <p className={style.errorText} />
              {this.renderErrorHead(errorMessage)}
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

ErrorOverlay.displayName = COMPONENT_NAME;
export {ErrorOverlay};
