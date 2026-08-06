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
import {focusElement} from '../../utils';

// Track which player has claimed focus to prevent race conditions when multiple errors appear
let focusClaimedByPlayer: string | null = null;
// Track which player had focus before error appeared (captured before DOM changes)
let playerWithFocusBeforeError: string | null = null;
// Track if focus is currently inside any player (false means focus is on the page outside players)
let isFocusInsideAnyPlayer = false;
// Track the previously active element before error
let previouslyActiveElement: HTMLElement | null = null;
// Track the focus listener for cleanup
let globalFocusListener: ((e: FocusEvent) => void) | null = null;
// Reference count for active ErrorOverlay instances
let activeInstanceCount = 0;

// Set up global focus tracking to capture state before error overlays render
if (typeof document !== 'undefined') {
  globalFocusListener = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target) {
      // Ignore focus events from error overlay elements (they're restoring focus, not user interaction)
      if (target.closest('.playkit-error-overlay')) {
        return;
      }
      
      // Find which player container this element belongs to (IDs start with underscore)
      let current = target;
      let foundPlayer = false;
      while (current && current !== document.body) {
        if (current.id && current.id.startsWith('_')) {
          playerWithFocusBeforeError = current.id;
          previouslyActiveElement = target;
          isFocusInsideAnyPlayer = true;
          foundPlayer = true;
          break;
        }
        current = current.parentElement as HTMLElement;
      }
      
      // If focus moved outside all players, clear the tracking
      if (!foundPlayer) {
        isFocusInsideAnyPlayer = false;
        previouslyActiveElement = null;
      }
    }
  };
  document.addEventListener('focusin', globalFocusListener, true);
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  hasError: state.engine.hasError,
  errorOverlaConfig: state.config.components?.errorOverlay,
  errorDetails: state.engine.errorDetails,
  componentData: state.engine.componentData,
  targetId: state.config.targetId,
  playerNav: state.shell.playerNav
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
  private errorOverlayRef: HTMLDivElement | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      entryUrl: props.componentData?.errorOverlay || undefined
    };
  }

  public componentDidMount(): void {
    activeInstanceCount++;

    if (this.props.hasError) {
      // Wait for next frame to ensure DOM is fully rendered and allow proper priority ordering
      requestAnimationFrame(() => {
        this.focusIfPlayerWasFocused();
      });
    }
  }

  public componentWillUnmount(): void {
    activeInstanceCount--;

    // Only restore focus if THIS player claimed it
    if (focusClaimedByPlayer === this.props.targetId) {
      this.cleanupFocusTracking();
    }

    // Clean up global listener when last instance is destroyed
    if (activeInstanceCount === 0 && globalFocusListener && typeof document !== 'undefined') {
      document.removeEventListener('focusin', globalFocusListener, true);
      globalFocusListener = null;
      focusClaimedByPlayer = null;
      playerWithFocusBeforeError = null;
      isFocusInsideAnyPlayer = false;
      previouslyActiveElement = null;
    }
  }

  public componentDidUpdate(prevProps: any): void {
    const errorOverlayData = this.props.componentData.errorOverlay;
    if (errorOverlayData && prevProps.componentData.errorOverlay !== errorOverlayData) {
      this.setState({entryUrl: errorOverlayData});
    }

    // Focus management: focus the first focusable element if error just appeared and player had focus
    if (!prevProps.hasError && this.props.hasError) {
      this.focusIfPlayerWasFocused();
    }
    
    // Clean up focus tracking when error is dismissed (hasError becomes false)
    if (prevProps.hasError && !this.props.hasError && focusClaimedByPlayer === this.props.targetId) {
      this.cleanupFocusTracking();
    }
  }

  /**
   * Focus the first focusable element in the error overlay if the player had focus.
   * Uses global focus tracking that captures which player had focus BEFORE error overlays render.
   * This avoids race conditions where focused elements are removed from DOM before we can check.
   * 
   * @returns {void}
   * @memberof ErrorOverlay
   */
  private focusIfPlayerWasFocused = (): void => {
    const {targetId, playerNav} = this.props;
    if (!this.errorOverlayRef) {
      return;
    }

    // If another player already claimed focus, skip
    if (focusClaimedByPlayer && focusClaimedByPlayer !== targetId) {
      return;
    }

    // Don't steal focus if user is focused outside all players
    if (!isFocusInsideAnyPlayer) {
      return;
    }

    // Determine if we should focus based on:
    // 1. This player had focus before error (highest priority)
    // 2. Fallback: playerNav flag if we don't know which specific player had focus
    const wasFocusedBeforeError = playerWithFocusBeforeError === targetId;
    const shouldFocus = wasFocusedBeforeError || (playerNav && playerWithFocusBeforeError === null);
    
    if (!shouldFocus) {
      return;
    }

    const focusableElements = this.errorOverlayRef.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      // Claim focus for this player
      focusClaimedByPlayer = targetId;
      focusElement(focusableElements[0]);
    }
  };

  /**
   * Clean up focus tracking state and restore focus if needed.
   * Called when error is dismissed or component unmounts.
   * 
   * @returns {void}
   * @memberof ErrorOverlay
   */
  private cleanupFocusTracking = (): void => {
    focusClaimedByPlayer = null;
    playerWithFocusBeforeError = null;
    
    // Restore focus to the element that was focused before error appeared
    if (previouslyActiveElement && document.contains(previouslyActiveElement)) {
      focusElement(previouslyActiveElement);
      previouslyActiveElement = null;
    }
  };

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
  private renderErrorHead(): VNode<any> | undefined {
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
  public render(): VNode<any> | undefined {
    if ((this.props && this.props.hasError) || this.props.permanent) {
      const backgroundUrl = this.getBackgroundUrl();
      const errorOverlayStyles = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`} : undefined;
      return (
        <div className={['overlay-portal', backgroundUrl ? style.customErrorSlate : ''].join(' ')}>
          <Overlay open permanent={true} type="error">
            <div className={style.errorOverlay} style={errorOverlayStyles} ref={el => (this.errorOverlayRef = el)}>
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
