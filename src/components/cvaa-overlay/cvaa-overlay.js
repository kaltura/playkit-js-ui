//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions as cvaaActions} from '../../reducers/cvaa';
import {actions as shellActions} from '../../reducers/shell';
import {Overlay} from '../overlay';
import {withKeyboardA11y} from '../../utils/popup-keyboard-accessibility';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {MainCaptionsWindow} from 'components/cvaa-overlay/main-captions_window';
import {CustomCaptionsWindow} from 'components/cvaa-overlay/custom-captions-window';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  open: state.cvaa.overlayOpen,
  style: state.cvaa.style
});

const cvaaOverlayState = {
  Main: 'main',
  CustomCaptions: 'custom-captions'
};

type CvaaOverlayStateType = 'main' | 'custom-captions';

const COMPONENT_NAME = 'CVAAOverlay';

@connect(
  mapStateToProps,
  bindActions({...cvaaActions, ...shellActions})
)
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withKeyboardA11y

/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {Component}
 */
class CVAAOverlay extends Component {
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
  transitionToState(stateName: CvaaOverlayStateType): void {
    this.setState({activeWindow: stateName});
  }

  /**
   * changing the captions style
   *
   * @param {Object} textStyle - TextStyle object
   * @returns {void}
   * @memberof CVAAOverlay
   */
  changeCaptionsStyle(textStyle: Object): void {
    this.props.updateCaptionsStyle(textStyle);
    this.props.player.textStyle = textStyle;
    this.props.onClose();
    this.props.notifyClick({
      textStyle: textStyle
    });
  }

  /**
   * get the css style of the preview element
   * @return {string} the css string
   * @private
   */
  _getPreviewStyle(): string {
    // style does not compute the font size.
    const fontSize = this.state.customTextStyle.implicitFontScale * 100 + '%';
    const style = this.state.customTextStyle.toCSS();
    return `font-size: ${fontSize}!important; ${style}`;
  }

  /**
   * change one or more properties in customTextStyle object in the internal state
   *
   * @param {Object} styleChanges style changes object
   * @returns {void}
   * @memberof CVAAOverlay
   */
  changeCustomStyle(styleChanges: Object): void {
    this.setState({customTextStyle: Object.assign(this.state.customTextStyle, styleChanges)});
  }

  /**
   * render component
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): React$Element<any> {
    props.clearAccessibleChildren();
    return (
      <Overlay
        handleKeyDown={e => this.props.handleKeyDown(e)}
        addAccessibleChild={this.props.addAccessibleChild}
        open
        onClose={() => props.onClose()}
        type="cvaa">
        {this.state.activeWindow === cvaaOverlayState.Main ? (
          <MainCaptionsWindow
            cvaaOverlayState={cvaaOverlayState}
            addAccessibleChild={props.addAccessibleChild}
            captionsStyleDefault={this.captionsStyleDefault}
            captionsStyleBlackBG={this.captionsStyleBlackBG}
            captionsStyleYellow={this.captionsStyleYellow}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            transitionToState={this.transitionToState.bind(this)}
            customTextStyle={this.state.customTextStyle}
          />
        ) : (
          <CustomCaptionsWindow
            addAccessibleChild={props.addAccessibleChild}
            focusOnDefault={this.props.focusOnDefault}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            changeCustomStyle={this.changeCustomStyle.bind(this)}
            getPreviewStyle={this._getPreviewStyle.bind(this)}
            customTextStyle={this.state.customTextStyle}
          />
        )}
      </Overlay>
    );
  }
}

CVAAOverlay.displayName = COMPONENT_NAME;
export {CVAAOverlay};
