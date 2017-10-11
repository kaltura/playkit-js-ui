//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import {actions as cvaaActions } from '../../reducers/cvaa';
import { actions as shellActions } from '../../reducers/shell';
import BaseComponent from '../base';
import Overlay from '../overlay';
import DropDown from '../dropdown';

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
}

type CvaaOverlayStateType = "main" | "custom-captions";

@connect(mapStateToProps, bindActions({...cvaaActions, ...shellActions}))
/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {BaseComponent}
 */
class CVAAOverlay extends BaseComponent {
  customTextStyle: Object;

  /**
   * Creates an instance of CVAAOverlay.
   * @memberof CVAAOverlay
   */
  constructor() {
    super({name: 'CVAAOverlay'});
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  componentWillUnmount() {
    this.setState({
      state: cvaaOverlayState.Main
    });
  }

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  componentWillMount() {
    this.setState({
      state: cvaaOverlayState.Main
    });

    this.customTextStyle = this.props.player.textStyle;
  }

  /**
   * changing the overlay state
   *
   * @param {CvaaOverlayStateType} stateName - the new state name
   * @returns {void}
   * @memberof CVAAOverlay
   */
  transitionToState(stateName: CvaaOverlayStateType): void {
    this.setState({state: stateName});
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
  }

  /**
   * render main state
   *
   * @returns {React$Element} - main state element
   * @memberof CVAAOverlay
   */
  renderMainState(): React$Element<any> {
    const captionsStyleDefault = Object.assign(new this.props.player.TextStyle(), {
      backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT
    });

    const captionsStyleYellow = Object.assign(new this.props.player.TextStyle(), {
      backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT,
      fontColor: this.props.player.TextStyle.StandardColors.YELLOW
    });

    const captionsStyleBlackBG = Object.assign(new this.props.player.TextStyle(), {
      backgroundColor: this.props.player.TextStyle.StandardColors.BLACK,
      fontColor: this.props.player.TextStyle.StandardColors.WHITE
    });

    return (
      <div className={this.state.state === cvaaOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>
          Advanced captions settings
        </div>
        <div>
          <div className='sample' onClick={() => this.changeCaptionsStyle(captionsStyleDefault)}>Sample</div>
          <div className='sample black-bg' onClick={() => this.changeCaptionsStyle(captionsStyleBlackBG)}>Sample</div>
          <div className='sample yellow-text' onClick={() => this.changeCaptionsStyle(captionsStyleYellow)}>Sample</div>
        </div>
        <a className='button-save-cvaa' onClick={() => this.transitionToState(cvaaOverlayState.CustomCaptions)}>Set custom caption</a>
      </div>
    )
  }

  /**
   * render custom captions state
   *
   * @param {*} props - component props
   * @returns {React$Element} - custom captions elements
   * @memberof CVAAOverlay
   */
  renderCustomCaptionsState(props: any): React$Element<any> {

    const fontFamily = this.props.player.TextStyle.FontFamily;
    const edgeStyles = this.props.player.TextStyle.EdgeStyles;
    const standardOpacities = props.player.TextStyle.StandardOpacities;
    const standardColors = props.player.TextStyle.StandardColors;

    var fontSizeOptions = this.props.player.TextStyle.FontSizes.map(size => ({
      value: size,
      label: size,
      active: props.player.textStyle.fontSize === size
    }));

    var fontColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key,
      active:  props.player.textStyle.fontColor == standardColors[key]
    }));

    var fontFamilyOptions = Object.keys(fontFamily).map(key => ({
      value: fontFamily[key],
      label: fontFamily[key],
      active: props.player.textStyle.fontFamily == fontFamily[key]
    }));

    var fontStyleOptions = Object.keys(edgeStyles).map(key => ({
      value: edgeStyles[key],
      label: key,
      active: props.player.textStyle.fontEdge == key
    }));

    var backgroundColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key,
      active:  props.player.textStyle.backgroundColor == standardColors[key]
    }));

    var fontOpacityOptions = Object.keys(standardOpacities).map(key => ({
      value: standardOpacities[key],
      label: `${standardOpacities[key] * 100}%`,
      active: props.player.textStyle.fontOpacity == standardOpacities[key]
    }));

    var backgroundOpacityOptions = Object.keys(standardOpacities).map(key => ({
      value: standardOpacities[key],
      label: `${standardOpacities[key] * 100}%`,
      active: props.player.textStyle.backgroundOpacity == standardOpacities[key]
    }));

    return (
      <div className={this.state.state === cvaaOverlayState.CustomCaptions ? 'overlay-screen active' : 'overlay-screen'}>
        <form className='form custom-caption-form'>
          <div className='form-group-row'>
            <label>Size</label>
            <DropDown onSelect={fontSize => this.customTextStyle.fontSize = fontSize} options={fontSizeOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font color</label>
            <DropDown onSelect={color => this.customTextStyle.fontColor = color} options={fontColorOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font family</label>
            <DropDown onSelect={fontFamily => this.customTextStyle.fontFamily = fontFamily} options={fontFamilyOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font style</label>
            <DropDown onSelect={fontEdge => this.customTextStyle.fontEdge = fontEdge} options={fontStyleOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font opacity</label>
            <DropDown onSelect={opacity => this.customTextStyle.fontOpacity = opacity} options={fontOpacityOptions} />
          </div>
          <div className='form-group-row'>
            <label>Background color</label>
            <DropDown onSelect={color => this.customTextStyle.backgroundColor = color} options={backgroundColorOptions} />
          </div>
          <div className='form-group-row'>
            <label>Background opacity</label>
            <DropDown onSelect={opacity => this.customTextStyle.backgroundOpacity = opacity} options={backgroundOpacityOptions} />
          </div>
          <div className='form-group-row'>
            <a onClick={() => this.changeCaptionsStyle(this.customTextStyle)} className='btn btn-branded btn-block'>Apply</a>
          </div>
        </form>
      </div>
    )
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): React$Element<any> {
    return (
      <Overlay open onClose={() => props.onClose()} type='cvaa'>
        {this.renderMainState()}
        {this.renderCustomCaptionsState(props)}
      </Overlay>
    )
  }
}

export default CVAAOverlay;
