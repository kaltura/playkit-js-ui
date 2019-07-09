//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import isEqual from '../../utils/is-equal';
import {bindActions} from '../../utils/bind-actions';
import {actions as cvaaActions} from '../../reducers/cvaa';
import {actions as shellActions} from '../../reducers/shell';
import BaseComponent from '../base';
import {Overlay} from '../overlay';
import {DropDown} from '../dropdown';
import {Slider} from '../slider';
import {Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';

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

@connect(
  mapStateToProps,
  bindActions({...cvaaActions, ...shellActions})
)
/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {BaseComponent}
 */
class CVAAOverlay extends BaseComponent {
  captionsStyleDefault: Object;
  captionsStyleYellow: Object;
  captionsStyleBlackBG: Object;

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
      state: cvaaOverlayState.Main,
      customTextStyle: this.props.player.textStyle
    });

    this.captionsStyleDefault = Object.assign(new this.props.player.TextStyle(), {
      backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT
    });

    this.captionsStyleYellow = Object.assign(new this.props.player.TextStyle(), {
      backgroundOpacity: this.props.player.TextStyle.StandardOpacities.TRANSPARENT,
      fontColor: this.props.player.TextStyle.StandardColors.YELLOW
    });

    this.captionsStyleBlackBG = Object.assign(new this.props.player.TextStyle(), {
      backgroundColor: this.props.player.TextStyle.StandardColors.BLACK,
      fontColor: this.props.player.TextStyle.StandardColors.WHITE
    });
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
    this.notifyClick({
      textStyle: textStyle
    });
  }

  /**
   * detection if advanced style applied or one of the default presets applied
   *
   * @returns {boolean} advanced style applied boolean
   * @memberof CVAAOverlay
   */
  isAdvancedStyleApplied(): boolean {
    return (
      !isEqual(this.props.player.textStyle, this.captionsStyleDefault) &&
      !isEqual(this.props.player.textStyle, this.captionsStyleBlackBG) &&
      !isEqual(this.props.player.textStyle, this.captionsStyleYellow)
    );
  }

  /**
   * render main state
   *
   * @returns {React$Element} - main state element
   * @memberof CVAAOverlay
   */
  renderMainState(): React$Element<any> {
    return (
      <div className={this.state.state === cvaaOverlayState.Main ? [style.overlayScreen, style.active].join(' ') : style.overlayScreen}>
        <div className={style.title}>
          <Text id={'cvaa.title'} />
        </div>
        <div>
          <div
            tabIndex="0"
            className={style.sample}
            onClick={() => this.changeCaptionsStyle(this.captionsStyleDefault)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.changeCaptionsStyle(this.captionsStyleDefault);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(this.props.player.textStyle, this.captionsStyleDefault) ? (
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            ) : (
              undefined
            )}
          </div>
          <div
            tabIndex="0"
            className={[style.sample, style.blackBg].join(' ')}
            onClick={() => this.changeCaptionsStyle(this.captionsStyleBlackBG)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.changeCaptionsStyle(this.captionsStyleBlackBG);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(this.props.player.textStyle, this.captionsStyleBlackBG) ? (
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            ) : (
              undefined
            )}
          </div>
          <div
            tabIndex="0"
            className={[style.sample, style.yellowText].join(' ')}
            onClick={() => this.changeCaptionsStyle(this.captionsStyleYellow)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.changeCaptionsStyle(this.captionsStyleYellow);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(this.props.player.textStyle, this.captionsStyleYellow) ? (
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            ) : (
              undefined
            )}
          </div>
        </div>
        {!this.isAdvancedStyleApplied() ? (
          <a
            tabIndex="0"
            className={style.buttonSaveCvaa}
            onClick={() => this.transitionToState(cvaaOverlayState.CustomCaptions)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.transitionToState(cvaaOverlayState.CustomCaptions);
              }
            }}>
            <Text id={'cvaa.set_custom_caption'} />
          </a>
        ) : (
          <div className={style.customCaptionsApplied}>
            <div tabIndex="0" className={[style.sample, style.custom].join(' ')} style={this.state.customTextStyle.toCSS()}>
              <span>Custom captions</span>
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            </div>
            <a
              tabIndex="0"
              onClick={() => this.transitionToState(cvaaOverlayState.CustomCaptions)}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  this.transitionToState(cvaaOverlayState.CustomCaptions);
                }
              }}>
              <Text id={'cvaa.edit_caption'} />
            </a>
          </div>
        )}
      </div>
    );
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
   * render custom captions state
   *
   * @param {*} props - component props
   * @returns {React$Element} - custom captions elements
   * @memberof CVAAOverlay
   */
  renderCustomCaptionsState(props: any): React$Element<any> {
    const fontFamily = this.props.player.TextStyle.FontFamily;
    const edgeStyles = this.props.player.TextStyle.EdgeStyles;
    const standardColors = props.player.TextStyle.StandardColors;

    const fontSizeOptions = this.props.player.TextStyle.FontSizes.map(size => ({
      value: size.value,
      label: size.label,
      active: this.state.customTextStyle.fontScale === size.value
    }));

    const fontColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: this.state.customTextStyle.fontColor.every((value, index) => value === standardColors[key][index])
    }));

    const fontFamilyOptions = Object.keys(fontFamily).map(key => ({
      value: fontFamily[key],
      label: fontFamily[key],
      active: this.state.customTextStyle.fontFamily === fontFamily[key]
    }));

    const fontStyleOptions = Object.keys(edgeStyles).map(key => ({
      value: edgeStyles[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: this.state.customTextStyle.fontEdge === edgeStyles[key]
    }));

    const backgroundColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: this.state.customTextStyle.backgroundColor.every((value, index) => value === standardColors[key][index])
    }));

    return (
      <div className={this.state.state === cvaaOverlayState.CustomCaptions ? [style.overlayScreen, style.active].join(' ') : style.overlayScreen}>
        <form className={[style.form, style.customCaptionForm].join(' ')}>
          <div className={[style.formGroupRow, style.fontSize].join(' ')}>
            <label>
              <Text id={'cvaa.size_label'} />
            </label>
            <DropDown onSelect={fontScale => this.changeCustomStyle({fontScale})} options={fontSizeOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontColor].join(' ')}>
            <label>
              <Text id={'cvaa.font_color_label'} />
            </label>
            <DropDown onSelect={fontColor => this.changeCustomStyle({fontColor})} options={fontColorOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontFamily].join(' ')}>
            <label>
              <Text id={'cvaa.font_family_label'} />
            </label>
            <DropDown onSelect={fontFamily => this.changeCustomStyle({fontFamily})} options={fontFamilyOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontStyle].join(' ')}>
            <label>
              <Text id={'cvaa.font_style_label'} />
            </label>
            <DropDown onSelect={fontEdge => this.changeCustomStyle({fontEdge})} options={fontStyleOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontOpacity].join(' ')}>
            <label>
              <Text id={'cvaa.font_opacity_label'} />
            </label>
            <Slider
              min={0}
              max={100}
              value={this.state.customTextStyle.fontOpacity * 100}
              onChange={fontOpacity => this.changeCustomStyle({fontOpacity: fontOpacity / 100})}
            />
          </div>
          <div className={[style.formGroupRow, style.backgroundColor].join(' ')}>
            <label>
              <Text id={'cvaa.background_color_label'} />
            </label>
            <DropDown onSelect={backgroundColor => this.changeCustomStyle({backgroundColor})} options={backgroundColorOptions} />
          </div>
          <div className={[style.formGroupRow, style.backgroundOpacity].join(' ')}>
            <label>
              <Text id={'cvaa.background_opacity_label'} />
            </label>
            <Slider
              min={0}
              max={100}
              value={this.state.customTextStyle.backgroundOpacity * 100}
              onChange={backgroundOpacity => this.changeCustomStyle({backgroundOpacity: backgroundOpacity / 100})}
            />
          </div>
          <div className={style.formGroupRow}>
            <a
              tabIndex="0"
              onClick={() => this.changeCaptionsStyle(this.state.customTextStyle)}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  this.changeCaptionsStyle(this.state.customTextStyle);
                }
              }}
              className={[style.btn, style.btnBranded, style.btnBlock].join(' ')}>
              <Text id={'cvaa.apply'} />
            </a>
          </div>

          <div className={style.previewContainer}>
            <span style={this._getPreviewStyle()}>
              <Text id={'cvaa.caption_preview'} />
            </span>
          </div>
        </form>
      </div>
    );
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
      <Overlay open onClose={() => props.onClose()} type="cvaa">
        {this.renderMainState()}
        {this.renderCustomCaptionsState(props)}
      </Overlay>
    );
  }
}

export {CVAAOverlay};
