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
import {getErrorDetailsByCategory} from './error-message-provider';
import {actions as overlayActions} from '../../reducers/overlay';
import {getPlayerHadFocusOnError} from '../engine-connector/engine-connector';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  hasError: state.engine.hasError,
  errorOverlaConfig: state.config.components?.errorOverlay,
  errorDetails: state.engine.errorDetails,
  componentData: state.engine.componentData
});

const COMPONENT_NAME = 'ErrorOverlay';

/**
 * errorOverlay component
 *
 * @class errorOverlay
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...actions, ...overlayActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
class ErrorOverlay extends Component<any, any> {
  private sessionEl!: HTMLDivElement;
  private overlayContentRef: HTMLDivElement | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      entryUrl: props.componentData?.errorOverlay || undefined
    };
  }

  public componentDidMount(): void {
    // Check if THIS player had focus when error occurred
    const targetId = this.props.player?.config?.targetId;
    if (targetId) {
      const hadFocus = getPlayerHadFocusOnError(targetId);
      if (hadFocus && this.overlayContentRef) {
        // Try to focus first interactive element, fallback to container
        const focusable = this.overlayContentRef.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
          focusable.focus();
        } else {
          this.overlayContentRef.focus();
        }
      }
    }
  }

  public componentDidUpdate(prevProps: any): void {
    const errorOverlayData = this.props.componentData.errorOverlay;
    if (errorOverlayData && prevProps.componentData.errorOverlay !== errorOverlayData) {
      this.setState({entryUrl: errorOverlayData});
    }
  }

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   * @returns {void}
   * @memberof ErrorOverlay
   */
  private copyError = (): void => {
    navigator.clipboard.writeText(JSON.stringify(this.props.player.debugInfo));
  };

  /**
   * play on click
   *
   * @returns {void}
   * @memberof ErrorOverlay
   */
  private handleClick = (): void => {
    const mediaInfo = this.props.player.getMediaInfo();
    this.props.updateOverlay(false);
    this.props.player.loadMedia(mediaInfo);
  };

  /**
   * get background url
   *
   * @returns {string | undefined} - custom background URL
   * @memberof ErrorOverlay
   */
  private getBackgroundUrl = (): string | undefined => {
    const {errorOverlaConfig} = this.props;
    return this.state.entryUrl || errorOverlaConfig?.backgroundUrl;
  };

  /**
   * render the sessionID line
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  private renderSessionID(): VNode<any> | undefined {
    const {player} = this.props;
    const sessionId = player && player.config && player.config.session && player.config.session.id;
    return (
      <div className={style.linkOptionsContainer}>
        <div className={style.copyUrlRow}>
          <div>
            <Text id="error.default_session_text" /> {' ' + sessionId || ''}
          </div>
          <CopyButton copy={this.copyError} />
        </div>
      </div>
    );
  }

  /**
   * render the retry button
   *
   * @returns {React$Element} - main state element
   * @memberof ErrorOverlay
   */
  private renderRetryButton(): VNode<any> | undefined {
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
  private renderErrorHead(targetId: string): VNode<any> | undefined {
    const {errorCategory, errorTitle, errorMessage} = this.props.errorDetails;
    let errorTitleRes: any = '',
      errorMessageRes: any = '';
    if (errorTitle && errorMessage) {
      // error title and message were provided from an external resource
      errorTitleRes = errorTitle;
      errorMessageRes = errorMessage;
    } else {
      // error title and message are core related - get them by the error category
      const error = getErrorDetailsByCategory(errorCategory);
      errorTitleRes = <Text id={`error.${error.title}`} />;
      errorMessageRes = <Text id={`error.${error.message}`} />;
    }

    return (
      <div className={style.headline}>
        <div id={`${targetId}-error-overlay-title`} className={style.errorTitle}>{this.props.errorHead || errorTitleRes}</div>
        {errorMessageRes ? <div id={`${targetId}-error-overlay-message`} className={style.errorMessage}>{errorMessageRes}</div> : undefined}
      </div>
    );
  }

  /**
   * render main state
   *
   * @returns {?React$Element} - main state element
   * @memberof ErrorOverlay
   */
  public render(): VNode<any> | undefined {
    if ((this.props && this.props.hasError) || this.props.permanent) {
      const targetId = this.props.player?.config?.targetId || '';
      const backgroundUrl = this.getBackgroundUrl();
      const errorOverlayStyles = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`} : undefined;
      return (
        <div className={['overlay-portal', backgroundUrl ? style.customErrorSlate : ''].join(' ')}>
          <Overlay open permanent={true} type="error" ariaLabelledBy={`${targetId}-error-overlay-title`} ariaDescribedBy={`${targetId}-error-overlay-message`}>
            <div ref={el => this.overlayContentRef = el} className={style.errorOverlay} style={errorOverlayStyles} tabIndex={-1}>
              <p className={style.errorText} />
              {this.renderErrorHead(targetId)}
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
