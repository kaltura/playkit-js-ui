//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import isEqual from '../../utils/is-equal';
import {bindActions} from '../../utils/bind-actions';
import {actions as cvaaActions} from '../../reducers/cvaa';
import {actions as shellActions} from '../../reducers/shell';
import {Overlay} from '../overlay';
import {DropDown} from '../dropdown';
import {Slider} from '../slider';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import {withKeyboardA11y} from '../../utils/popup-keyboard-accessibility';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';

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
  captionsStyleDefault: Object;
  captionsStyleYellow: Object;
  captionsStyleBlackBG: Object;

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

    this.captionsStyleDefault = Object.assign(new player.TextStyle(), {
      backgroundOpacity: player.TextStyle.StandardOpacities.TRANSPARENT
    });

    this.captionsStyleYellow = Object.assign(new player.TextStyle(), {
      backgroundOpacity: player.TextStyle.StandardOpacities.TRANSPARENT,
      fontColor: player.TextStyle.StandardColors.YELLOW
    });

    this.captionsStyleBlackBG = Object.assign(new player.TextStyle(), {
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      fontColor: player.TextStyle.StandardColors.WHITE
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
   * detection if advanced style applied or one of the default presets applied
   *
   * @returns {boolean} advanced style applied boolean
   * @memberof CVAAOverlay
   */
  isAdvancedStyleApplied(): boolean {
    const {player} = this.props;
    return (
      !isEqual(player.textStyle, this.captionsStyleDefault) &&
      !isEqual(player.textStyle, this.captionsStyleBlackBG) &&
      !isEqual(player.textStyle, this.captionsStyleYellow)
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
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): React$Element<any> {
    const {player} = this.props;
    props.clearAccessibleChildren();
    return (
      <Overlay
        handleKeyDown={e => this.props.handleKeyDown(e)}
        addAccessibleChild={this.props.addAccessibleChild}
        open
        onClose={() => props.onClose()}
        type="cvaa">
        {this.state.activeWindow === cvaaOverlayState.Main ? (
          <MainWindow
            addAccessibleChild={props.addAccessibleChild}
            state={this.state}
            player={player}
            captionsStyleDefault={this.captionsStyleDefault}
            captionsStyleBlackBG={this.captionsStyleBlackBG}
            captionsStyleYellow={this.captionsStyleYellow}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            isAdvancedStyleApplied={this.isAdvancedStyleApplied.bind(this)}
            transitionToState={this.transitionToState.bind(this)}
          />
        ) : (
          <CustomCaptionsWindow
            addAccessibleChild={props.addAccessibleChild}
            focusOnDefault={this.props.focusOnDefault}
            state={this.state}
            player={player}
            changeCaptionsStyle={this.changeCaptionsStyle.bind(this)}
            changeCustomStyle={this.changeCustomStyle.bind(this)}
            getPreviewStyle={this._getPreviewStyle.bind(this)}
          />
        )}
      </Overlay>
    );
  }
}

/**
 * CustomCaptionsWindow component
 * @class CustomCaptionsWindow
 * @extends {Component}
 */
class CustomCaptionsWindow extends Component {
  /**
   * after component mounted, set focus on default
   *
   * @returns {void}
   * @memberof CustomCaptionsWindow
   */
  componentDidMount(): void {
    this.props.focusOnDefault();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CustomCaptionsWindow
   */
  render(props: any): React$Element<any> {
    const {player} = this.props;
    const fontFamily = player.TextStyle.FontFamily;
    const edgeStyles = player.TextStyle.EdgeStyles;
    const standardColors = player.TextStyle.StandardColors;

    const fontSizeOptions = player.TextStyle.FontSizes.map(size => ({
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
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <form className={[style.form, style.customCaptionForm].join(' ')}>
          {this.renderDropDownOption(props, 'cvaa.size_label', fontSizeOptions, [style.formGroupRow, style.fontSize], 'fontSize')}
          {this.renderDropDownOption(props, 'cvaa.font_color_label', fontColorOptions, [style.formGroupRow, style.fontColor], 'fontColor')}
          {this.renderDropDownOption(props, 'cvaa.font_family_label', fontFamilyOptions, [style.formGroupRow, style.fontFamily], 'fontFamily')}
          {this.renderDropDownOption(props, 'cvaa.font_style_label', fontStyleOptions, [style.formGroupRow, style.fontStyle], 'fontStyle')}
          {this.renderSliderOption(
            props,
            'cvaa.font_opacity_label',
            props.state.customTextStyle.fontOpacity,
            [style.formGroupRow, style.fontOpacity],
            'fontOpacity'
          )}
          {this.renderDropDownOption(
            props,
            'cvaa.background_color_label',
            backgroundColorOptions,
            [style.formGroupRow, style.backgroundColor],
            'backgroundColor'
          )}
          {this.renderSliderOption(
            props,
            'cvaa.background_opacity_label',
            props.state.customTextStyle.backgroundOpacity,
            [style.formGroupRow, style.backgroundOpacity],
            'backgroundOpacity'
          )}

          <div className={style.formGroupRow}>
            <a
              tabIndex="0"
              ref={el => {
                props.addAccessibleChild(el);
              }}
              onClick={() => props.changeCaptionsStyle(props.state.customTextStyle)}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  props.changeCaptionsStyle(props.state.customTextStyle);
                }
              }}
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

  /**
   * renders a custom dropdown style option
   *
   * @param {*} props - component props
   * @param {string} labelId - the label id to localize
   * @param {Array<any>} options - dropdown options array
   * @param {classNames} classNames - the css classes to apply
   * @param {string} styleName - the property name to change
   * @returns {React$Element} - component element
   * @memberof CustomCaptionsWindow
   */
  renderDropDownOption(props: any, labelId: string, options: Array<any>, classNames: Array<string>, styleName: string) {
    return (
      <div className={classNames.join(' ')}>
        <label>
          <Text id={labelId} />
        </label>
        <DropDown
          pushRef={el => {
            props.addAccessibleChild(el);
          }}
          tabbable
          onMenuChosen={chosenOption => {
            let changedStyle = {};
            changedStyle[styleName] = chosenOption;
            props.changeCustomStyle(changedStyle);
          }}
          options={options}
        />
      </div>
    );
  }

  /**
   * renders a custom slider style option
   *
   * @param {*} props - component props
   * @param {string} labelId - the label id to localize
   * @param {number} value - the current value of the slider
   * @param {classNames} classNames - the css classes to apply
   * @param {string} styleName - the property name to change
   * @returns {React$Element} - component element
   * @memberof CustomCaptionsWindow
   */
  renderSliderOption(props: any, labelId: string, value: number, classNames: Array<string>, styleName: string) {
    return (
      <div className={classNames.join(' ')}>
        <label>
          <Text id={labelId} />
        </label>
        <Slider
          pushRef={el => {
            props.addAccessibleChild(el);
          }}
          min={0}
          max={100}
          value={value * 100}
          onChange={valueChanged => {
            let changedStyle = {};
            changedStyle[styleName] = valueChanged / 100;
            props.changeCustomStyle(changedStyle);
          }}
        />
      </div>
    );
  }
}

/**
 * MainWindow component
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
          {this.renderPresetStyleButton(props, props.captionsStyleDefault, [style.sample])}
          {this.renderPresetStyleButton(props, props.captionsStyleBlackBG, [style.sample, style.blackBg])}
          {this.renderPresetStyleButton(props, props.captionsStyleYellow, [style.sample, style.yellowText])}
        </div>
        {!props.isAdvancedStyleApplied() ? (
          <a
            tabIndex="0"
            className={style.buttonSaveCvaa}
            onClick={() => props.transitionToState(cvaaOverlayState.CustomCaptions)}
            ref={el => {
              props.addAccessibleChild(el);
            }}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.transitionToState(cvaaOverlayState.CustomCaptions);
              }
            }}>
            <Text id={'cvaa.set_custom_caption'} />
          </a>
        ) : (
          <div className={style.customCaptionsApplied}>
            <div className={[style.sample, style.custom].join(' ')} style={props.state.customTextStyle.toCSS()}>
              <span>Custom captions</span>
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            </div>
            <a
              tabIndex="0"
              onClick={() => props.transitionToState(cvaaOverlayState.CustomCaptions)}
              ref={el => {
                props.addAccessibleChild(el);
              }}
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

  /**
   * renders a default style pick button
   *
   * @param {*} props - component props
   * @param {Object} captionStyle - the caption style the represents
   * @param {Array<string>} classNames - the css classes to apply
   * @returns {React$Element} - component element
   * @memberof MainWindow
   */
  renderPresetStyleButton(props: any, captionStyle: Object, classNames: Array<string>): React$Element<any> {
    const {player} = this.props;
    return (
      <div
        tabIndex="0"
        ref={el => {
          props.addAccessibleChild(el);
        }}
        className={classNames.join(' ')}
        onClick={() => props.changeCaptionsStyle(captionStyle)}
        onKeyDown={e => {
          if (e.keyCode === KeyMap.ENTER) {
            props.changeCaptionsStyle(captionStyle);
          }
        }}>
        <Text id={'cvaa.sample_caption_tag'} />
        {isEqual(player.textStyle, captionStyle) ? (
          <div className={style.activeTick}>
            <Icon type={IconType.Check} />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

CVAAOverlay.displayName = COMPONENT_NAME;
export {CVAAOverlay};
