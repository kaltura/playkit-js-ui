import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {Overlay} from '../overlay';
import {Text} from 'preact-i18n';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/engine';
import {CopyButton} from '../copy-button';
import {withLogger} from '../../components/logger';
import {withPlayer} from '../../components/player';
import {Button} from '../../components/button';
import {errorsMap, getDefaultError} from "./error-message-provider";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  hasError: state.engine.hasError,
  errorOverlaConfig: state.config.components?.errorOverlay,
  errorDetails: state.engine.errorDetails
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
class ErrorOverlay extends Component<any, any> {
  sessionEl!: HTMLDivElement;

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   * @returns {void}
   * @memberof ErrorOverlay
   */
  copyError = (): void => {
    let selection = window.getSelection()!;
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
   * get background url
   *
   * @returns {string | undefined} - custom background URL
   * @memberof ErrorOverlay
   */
  getBackgroundUrl = (): string | undefined => {
    const {errorOverlaConfig} = this.props;
    return errorOverlaConfig?.backgroundUrl;
  };

  /**
   * render the sessionID line
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderSessionID(): VNode<any> | undefined {
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
  renderRetryButton(): VNode<any> | undefined {
    if (this.props.player.getMediaInfo()) {
      const hasCustomBackground = Boolean(this.getBackgroundUrl());
      return (
        <div className={style.controlButtonContainer} onClick={this.handleClick}>
          <Button className={[hasCustomBackground ? style.btnTranslucent : style.btnBorderless, style.retryBtn].join(' ')}>
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
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  renderErrorHead(): VNode<any> | undefined {
    const {errorCategory, errorTitle, errorMessage} = this.props.errorDetails;
    let errorTitleRes: any = '',
      errorMessageRes: any = '';
    if (errorTitle && errorMessage) {
      // error title and message were provided from an external resource
      errorTitleRes = errorTitle;
      errorMessageRes = errorMessage;
    } else {
      // error title and message are core related - get them by the error category
      const error = errorsMap.get(errorCategory) || getDefaultError();
      errorTitleRes = <Text id={`error.${error.title}`} />;
      errorMessageRes = <Text id={`error.${error.message}`} />;
    }

    return (
      <div className={style.headline}>
        <div className={style.errorTitle}>{this.props.errorHead || errorTitleRes}</div>
        {errorMessageRes ? <div className={style.errorMessage}>{errorMessageRes}</div> : undefined}
      </div>
    );
  }

  /**
   * render main state
   *
   * @returns {?React$Element} - main state element
   * @memberof ErrorOverlay
   */
  render(): VNode<any> | undefined {
    if ((this.props && this.props.hasError) || this.props.permanent) {
      const backgroundUrl = this.getBackgroundUrl();
      const errorOverlayStyles = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`} : undefined;
      return (
        <div className={['overlay-portal', backgroundUrl ? style.customErrorSlate : ''].join(' ')}>
          <Overlay open permanent={true} type="error">
            <div className={style.errorOverlay} style={errorOverlayStyles}>
              <p className={style.errorText} />
              {this.renderErrorHead()}
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
