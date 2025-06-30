import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions as cvaaActions} from '../../reducers/cvaa';
import {actions as shellActions} from '../../reducers/shell';
import {Overlay} from '../overlay';
import {withKeyboardA11y} from '../../utils';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {MainCaptionsWindow} from './main-captions_window';
import {CustomCaptionsWindow} from './custom-captions-window';
import {withText} from 'preact-i18n';
import { Utils } from '@playkit-js/playkit-js';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  style: state.cvaa.style,
    targetId: state.config.targetId
});

const cvaaOverlayState = {
  Main: 'main',
  CustomCaptions: 'custom-captions'
};

type CvaaOverlayStateType = 'main' | 'custom-captions';

const COMPONENT_NAME = 'CVAAOverlay';

/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...cvaaActions, ...shellActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withKeyboardA11y
@withText({
  cvvaDialogText: 'cvaa.title',
  cvvaSetCustomCaptionsText: 'cvaa.set_custom_caption',
  cvaaCloseLabel: 'cvaa.close_label'
})
class CVAAOverlay extends Component<any, any> {
  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  customOrEditRef: HTMLElement | null = null;
  
  setCustomOrEditRef = (el: HTMLElement | null) => {
    this.customOrEditRef = el;
  };

  focusCustomOrEdit = () => {
    this.customOrEditRef?.focus();
  };

  componentWillUnmount() {
    this.setState({
      activeWindow: cvaaOverlayState.Main
    });
  }

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  componentWillMount() {
    const {player} = this.props;
    this.setState({
      activeWindow: cvaaOverlayState.Main,
      customTextStyle: player.textStyle
    });

    this.props.setIsModal(true);
  }

  /**
   * changing the overlay state
   *
   * @param {CvaaOverlayStateType} stateName - the new state name
   * @returns {void}
   * @memberof CVAAOverlay
   */
  transitionToState = (stateName: CvaaOverlayStateType): void => {
    this.setState({activeWindow: stateName});
  };

  /**
   * changing the captions style
   *
   * @param {Object} textStyle - TextStyle object
   * @returns {void}
   * @memberof CVAAOverlay
   */
  changeCaptionsStyle = (textStyle: any): void => {
    this.props.notifyClick({
      textStyle: textStyle
    });
    this.props.updateCaptionsStyle(textStyle);
    this.props.player.textStyle = textStyle;
  };

  /**
   * get the css style of the preview element
   * @return {string} the css string
   * @private
   */
  getPreviewStyle = (): string => {
    // style does not compute the font size.
    const fontSize = this.state.customTextStyle.implicitFontScale * 100 + '%';
    const style = this.state.customTextStyle.toCSS();
    return `font-size: ${fontSize}!important; ${style}`;
  };

  /**
   * change one or more properties in customTextStyle object in the internal state
   *
   * @param {Object} styleChanges style changes object
   * @returns {void}
   * @memberof CVAAOverlay
   */
  changeCustomStyle = (styleChanges: any): void => {
    this.setState(prevState => {
      const clonedStyle = prevState.customTextStyle.clone();
      return {customTextStyle: Object.assign(clonedStyle, styleChanges)};
    });
  };

  focusPlayerButtonBadge = (): void => {
    const player = this.props.player;
    const containerEl = document.getElementById(this.props.targetId);
    if (!containerEl) {
      return;
    }
    
    const selector = '.playkit-button-badge';
    const delay = 100;
    const maxAttempts = 10;
    let attempts = 0;
  
    const interval = setInterval(() => {
      const element = containerEl.querySelector(selector) as HTMLElement | null;
      if (element && getComputedStyle(element).visibility !== 'hidden') {
        element.focus();
        clearInterval(interval);
        return;
      }
  
      if (++attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, delay);
  };
  
  /**
   * render component
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): VNode<any> {    
    props.clearAccessibleChildren();
    const isMainOverlay = this.state.activeWindow === cvaaOverlayState.Main;
    const titleId = `captions_title_${Utils.Generator.guid()}`;
    const ariaProps = isMainOverlay ? { ariaLabelledBy: titleId } : { ariaLabel: this.props.cvvaSetCustomCaptionsText };

    return (
      <Overlay
        open
        handleKeyDown={this.props.handleKeyDown}
        addAccessibleChild={this.props.addAccessibleChild}
        onClose={() => {
          props.onClose();
          this.focusPlayerButtonBadge();
        }}
        type="cvaa"
        {...ariaProps}
        closeAriaLabel={this.props.cvaaCloseLabel}
      >
        {this.state.activeWindow === cvaaOverlayState.Main ? (
          <MainCaptionsWindow
            captionsTitleId={titleId}
            cvaaOverlayState={cvaaOverlayState}
            addAccessibleChild={props.addAccessibleChild}
            /*@ts-expect-error - Property 'captionsStyleDefault' does not exist on type 'CVAAOverlay' */
            captionsStyleDefault={this.captionsStyleDefault}
            /*@ts-expect-error - Property 'captionsStyleBlackBG' does not exist on type 'CVAAOverlay' */
            captionsStyleBlackBG={this.captionsStyleBlackBG}
            /*@ts-expect-error - Property 'captionsStyleYellow' does not exist on type 'CVAAOverlay' */
            captionsStyleYellow={this.captionsStyleYellow}
            changeCaptionsStyle={this.changeCaptionsStyle}
            transitionToState={this.transitionToState}
            customTextStyle={this.state.customTextStyle}
            setCustomOrEditRef={this.setCustomOrEditRef}
          />
        ) : (
          <CustomCaptionsWindow
            addAccessibleChild={props.addAccessibleChild}
            focusOnDefault={this.props.focusOnDefault}
            changeCaptionsStyle={this.changeCaptionsStyle}
            changeCustomStyle={this.changeCustomStyle}
            getPreviewStyle={this.getPreviewStyle}
            customTextStyle={this.state.customTextStyle}
            transitionToState={this.transitionToState}
            cvaaOverlayState={cvaaOverlayState}
            focusCustomOrEdit={this.focusCustomOrEdit}
          />
        )}
      </Overlay>
    );
  }
}

CVAAOverlay.displayName = COMPONENT_NAME;
export {CVAAOverlay};
