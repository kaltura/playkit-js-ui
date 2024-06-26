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

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  style: state.cvaa.style
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
@withText({cvvaDialogText: 'cvaa.title'})
class CVAAOverlay extends Component<any, any> {
  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
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
    this.props.updateCaptionsStyle(textStyle);
    this.props.player.textStyle = textStyle;
    this.props.notifyClick({
      textStyle: textStyle
    });
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

  /**
   * render component
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): VNode<any> {
    props.clearAccessibleChildren();
    return (
      <Overlay
        open
        handleKeyDown={this.props.handleKeyDown}
        addAccessibleChild={this.props.addAccessibleChild}
        onClose={props.onClose}
        type="cvaa"
      >
        {this.state.activeWindow === cvaaOverlayState.Main ? (
          <MainCaptionsWindow
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
          />
        )}
      </Overlay>
    );
  }
}

CVAAOverlay.displayName = COMPONENT_NAME;
export {CVAAOverlay};
