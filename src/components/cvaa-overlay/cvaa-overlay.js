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
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import {Component} from 'preact/src/preact';
import {withKeyboardA11y} from '../../utils/popup-keyboard-accessibility';

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
    this.setState({
      activeWindow: cvaaOverlayState.Main,
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
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): React$Element<any> {
    return (
      <Overlay open onClose={() => props.onClose()} type="cvaa">
        {this.state.activeWindow === cvaaOverlayState.Main ? (
          <MainWindow
            tabbable="true"
            state={this.state}
            player={props.player}
            captionsStyleDefault={this.captionsStyleDefault}
            captionsStyleBlackBG={this.captionsStyleBlackBG}
            captionsStyleYellow={this.captionsStyleYellow}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            isAdvancedStyleApplied={this.isAdvancedStyleApplied.bind(this)}
            transitionToState={this.transitionToState.bind(this)}
          />
        ) : (
          <CustomCaptionsWindow
            tabbable="true"
            state={this.state}
            player={props.player}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            changeCustomStyle={this.changeCustomStyle.bind(this)}
            getPreviewStyle={this._getPreviewStyle.bind(this)}
          />
        )}
      </Overlay>
    );
  }
}

@withKeyboardA11y

/**
 * CustomCaptionsWindow component to be wrapped with popupWithKeyboardA11y
 * @class CustomCaptionsWindow
 * @extends {Component}
 */
class CustomCaptionsWindow extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CustomCaptionsWindow
   */
  render(props: any): React$Element<any> {
    const fontFamily = props.player.TextStyle.FontFamily;
    const edgeStyles = props.player.TextStyle.EdgeStyles;
    const standardColors = props.player.TextStyle.StandardColors;

    const fontSizeOptions = props.player.TextStyle.FontSizes.map(size => ({
      value: size.value,
      label: size.label,
      active: props.state.customTextStyle.fontScale === size.value
    }));

    const fontColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.state.customTextStyle.fontColor.every((value, index) => value === standardColors[key][index])
    }));

    const fontFamilyOptions = Object.keys(fontFamily).map(key => ({
      value: fontFamily[key],
      label: fontFamily[key],
      active: props.state.customTextStyle.fontFamily === fontFamily[key]
    }));

    const fontStyleOptions = Object.keys(edgeStyles).map(key => ({
      value: edgeStyles[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.state.customTextStyle.fontEdge === edgeStyles[key]
    }));

    const backgroundColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.state.customTextStyle.backgroundColor.every((value, index) => value === standardColors[key][index])
    }));

    return (
      <div
        onKeyDown={e => {
          props.handleKeyDown(e);
        }}
        className={[style.overlayScreen, style.active].join(' ')}>
        <form className={[style.form, style.customCaptionForm].join(' ')}>
          <div className={[style.formGroupRow, style.fontSize].join(' ')}>
            <label>
              <Text id={'cvaa.size_label'} />
            </label>
            <DropDown
              pushRef={el => {
                props.setFirstFocusedElement(el);
              }}
              tabbable="true"
              onMenuChosen={fontScale => props.changeCustomStyle({fontScale})}
              options={fontSizeOptions}
            />
          </div>
          <div className={[style.formGroupRow, style.fontColor].join(' ')}>
            <label>
              <Text id={'cvaa.font_color_label'} />
            </label>
            <DropDown tabbable="true" onMenuChosen={fontColor => props.changeCustomStyle({fontColor})} options={fontColorOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontFamily].join(' ')}>
            <label>
              <Text id={'cvaa.font_family_label'} />
            </label>
            <DropDown tabbable="true" onMenuChosen={fontFamily => props.changeCustomStyle({fontFamily})} options={fontFamilyOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontStyle].join(' ')}>
            <label>
              <Text id={'cvaa.font_style_label'} />
            </label>
            <DropDown tabbable="true" onMenuChosen={fontEdge => props.changeCustomStyle({fontEdge})} options={fontStyleOptions} />
          </div>
          <div className={[style.formGroupRow, style.fontOpacity].join(' ')}>
            <label>
              <Text id={'cvaa.font_opacity_label'} />
            </label>
            <Slider
              min={0}
              max={100}
              value={props.state.customTextStyle.fontOpacity * 100}
              onChange={fontOpacity => props.changeCustomStyle({fontOpacity: fontOpacity / 100})}
            />
          </div>
          <div className={[style.formGroupRow, style.backgroundColor].join(' ')}>
            <label>
              <Text id={'cvaa.background_color_label'} />
            </label>
            <DropDown tabbable="true" onMenuChosen={backgroundColor => props.changeCustomStyle({backgroundColor})} options={backgroundColorOptions} />
          </div>
          <div className={[style.formGroupRow, style.backgroundOpacity].join(' ')}>
            <label>
              <Text id={'cvaa.background_opacity_label'} />
            </label>
            <Slider
              min={0}
              max={100}
              value={props.state.customTextStyle.backgroundOpacity * 100}
              onChange={backgroundOpacity => props.changeCustomStyle({backgroundOpacity: backgroundOpacity / 100})}
            />
          </div>
          <div className={style.formGroupRow}>
            <a
              tabIndex="0"
              onClick={() => props.changeCaptionsStyle(props.state.customTextStyle)}
              className={[style.btn, style.btnBranded, style.btnBlock].join(' ')}>
              <Text id={'cvaa.apply'} />
            </a>
          </div>

          <div className={style.previewContainer}>
            <span style={props.getPreviewStyle()}>
              <Text id={'cvaa.caption_preview'} />
            </span>
          </div>
        </form>
      </div>
    );
  }
}

@withKeyboardA11y
/**
 * MainWindow component to be wrapped with popupWithKeyboardA11y
 * @class MainWindow
 * @extends {Component}
 */
class MainWindow extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof MainWindow
   */
  render(props: any): React$Element<any> {
    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <div className={style.title}>
          <Text id={'cvaa.title'} />
        </div>
        <div>
          <div
            tabIndex="0"
            ref={el => {
              props.setFirstFocusedElement(el);
            }}
            className={style.sample}
            onClick={() => props.changeCaptionsStyle(props.captionsStyleDefault)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.changeCaptionsStyle(props.captionsStyleDefault);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(props.player.textStyle, props.captionsStyleDefault) ? (
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
            onClick={() => props.changeCaptionsStyle(props.captionsStyleBlackBG)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.changeCaptionsStyle(props.captionsStyleBlackBG);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(props.player.textStyle, props.captionsStyleBlackBG) ? (
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
            onClick={() => props.changeCaptionsStyle(props.captionsStyleYellow)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.changeCaptionsStyle(props.captionsStyleYellow);
              }
            }}>
            <Text id={'cvaa.sample_caption_tag'} />
            {isEqual(props.player.textStyle, props.captionsStyleYellow) ? (
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            ) : (
              undefined
            )}
          </div>
        </div>
        {!props.isAdvancedStyleApplied() ? (
          <a
            tabIndex="0"
            className={style.buttonSaveCvaa}
            onClick={() => props.transitionToState(cvaaOverlayState.CustomCaptions)}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.transitionToState(cvaaOverlayState.CustomCaptions);
              }
            }}>
            <Text id={'cvaa.set_custom_caption'} />
          </a>
        ) : (
          <div className={style.customCaptionsApplied}>
            <div tabIndex="0" className={[style.sample, style.custom].join(' ')} style={props.state.customTextStyle.toCSS()}>
              <span>Custom captions</span>
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            </div>
            <a
              tabIndex="0"
              onClick={() => props.transitionToState(cvaaOverlayState.CustomCaptions)}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  props.transitionToState(cvaaOverlayState.CustomCaptions);
                }
              }}>
              <Text id={'cvaa.edit_caption'} />
            </a>
          </div>
        )}
      </div>
    );
  }
}

export {CVAAOverlay};
