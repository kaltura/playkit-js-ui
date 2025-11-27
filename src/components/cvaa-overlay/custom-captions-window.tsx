import {Component, VNode} from 'preact';
import style from '../../styles/style.scss';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import {h} from 'preact';
import {DropDownCaptionsStyle} from './drop-down-captions-style';
import {SliderCaptionsStyle} from './slider-captions-style';
import {withPlayer} from '../player';

/**
 * CustomCaptionsWindow component
 * @class CustomCaptionsWindow
 * @extends {Component}
 */
@withPlayer
class CustomCaptionsWindow extends Component<any, any> {
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
   * change captions style handler
   *
   * @returns {void}
   * @memberof CustomCaptionsWindow
   */
  changeCaptionsStyle = (): void => {
    const customStyle = this.props.customTextStyle;
    this.props.saveCustomPresetStyle(customStyle);
    this.props.changeCaptionsStyle(
      customStyle,
      "Advanced_captions_custom"
    );
  };

  /**
   * transition to state handler
   *
   * @returns {void}
   * @memberof MainWindow
   */
  transitionToState = (): void => {
    this.props.transitionToState(this.props.cvaaOverlayState.Main);
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof CustomCaptionsWindow
   */
  
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER || e.keyCode === KeyMap.SPACE) {
      e.preventDefault();
      e.stopPropagation();
      this.changeCaptionsStyle();
      this.transitionToState();
      this.focusCustomOrEdit();                
    }
  };
  
  focusCustomOrEdit(): void {
    this.props.focusCustomOrEdit?.();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CustomCaptionsWindow
   */
  render(props: any): VNode<any> {
    const {player} = this.props;
    const fontFamily = player.TextStyle.FontFamily;
    const edgeStyles = player.TextStyle.EdgeStyles;
    const standardColors = player.TextStyle.StandardColors;

    const fontSizeOptions = player.TextStyle.FontSizes.map(size => ({
      value: size.label,
      label: size.name,
      active: props.customTextStyle.fontSize === size.label
    }));

    const fontWeightOptions = player.TextStyle.StandardFontWeights.map(weight => ({
      value: weight.value,
      label: weight.label,
      active: props.customTextStyle.fontWeight === weight.value
    }));

    const fontColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.customTextStyle.fontColor.every((value, index) => value === standardColors[key][index])
    }));

    const fontFamilyOptions = Object.keys(fontFamily).map(key => {
      const fullValue = fontFamily[key];
      const shortLabel = fullValue.split(",")[0].replace(/['"]/g, "").trim();
      return {
        value: fullValue,
        label: shortLabel,
        active: props.customTextStyle.fontFamily === fullValue
      };
    });

    const backgroundColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.customTextStyle.backgroundColor.every((value, index) => value === standardColors[key][index])
    }));

    const fontAlignmentOption = player.TextStyle.FontAlignment.map(fontAlignment => ({
      ...fontAlignment,
      active: props.customTextStyle.textAlign === fontAlignment.value
    }));

    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <h2 className={style.title}>
          <Text id={'cvaa.set_custom_caption'}/>
        </h2>
        <form className={[style.form, style.customCaptionForm].join(' ')}>          
        <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.size_label"
            options={fontSizeOptions}
            classNames={[style.formGroupRow, style.fontSize]}
            styleName="fontSize"
            changeCustomStyle={props.changeCustomStyle}
          />
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_weight"
            options={fontWeightOptions}
            classNames={[style.formGroupRow, style.fontWeight]}
            styleName="fontWeight"
            changeCustomStyle={props.changeCustomStyle}
          />
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_alignment_label"
            options={fontAlignmentOption}
            classNames={[style.formGroupRow, style.fontAlignment]}
            styleName="textAlign"
            changeCustomStyle={props.changeCustomStyle}
          />
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_color_label"
            options={fontColorOptions}
            classNames={[style.formGroupRow, style.fontColor]}
            styleName="fontColor"
            changeCustomStyle={props.changeCustomStyle}
          />
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_family_label"
            options={fontFamilyOptions}
            classNames={[style.formGroupRow, style.fontFamily]}
            styleName="fontFamily"
            changeCustomStyle={props.changeCustomStyle}
          />
          <SliderCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_opacity_label"
            value={props.customTextStyle.fontOpacity}
            classNames={[style.formGroupRow, style.fontOpacity]}
            styleName="fontOpacity"
            changeCustomStyle={props.changeCustomStyle}
          />
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.background_color_label"
            options={backgroundColorOptions}
            classNames={[style.formGroupRow, style.backgroundColor]}
            styleName="backgroundColor"
            changeCustomStyle={props.changeCustomStyle}
          />
          <SliderCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.background_opacity_label"
            value={props.customTextStyle.backgroundOpacity}
            classNames={[style.formGroupRow, style.backgroundOpacity]}
            styleName="backgroundOpacity"
            changeCustomStyle={props.changeCustomStyle}
          />
          <div className={style.formGroupRow}>
            <a
              role="button"
              tabIndex={0}
              ref={el => {
                props.addAccessibleChild(el);
              }}
              onClick={() => {
                this.changeCaptionsStyle();
                this.transitionToState();
                this.focusCustomOrEdit();
              }}
              onKeyDown={this.onKeyDown}
              className={[style.btn, style.btnBranded, style.btnBlock].join(' ')}
            >
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

export {CustomCaptionsWindow};
