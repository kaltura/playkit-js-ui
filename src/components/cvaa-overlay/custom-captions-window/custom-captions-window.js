//@flow
import {Component} from 'preact';
import style from '../../styles/style.scss';
import {KeyMap} from 'utils/key-map';
import {Text} from 'preact-i18n';
import {h} from 'preact';
import {DropDownCaptionsStyle} from './drop-down-captions-style';
import {SliderCaptionsStyle} from './slider-captions-style';
import {withPlayer} from 'components/player';

@withPlayer

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

    const fontScaleOptions = player.TextStyle.FontSizes.map(scale => ({
      value: scale.value,
      label: scale.label,
      active: props.customTextStyle.fontScale === scale.value
    }));

    const fontColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.customTextStyle.fontColor.every((value, index) => value === standardColors[key][index])
    }));

    const fontFamilyOptions = Object.keys(fontFamily).map(key => ({
      value: fontFamily[key],
      label: fontFamily[key],
      active: props.customTextStyle.fontFamily === fontFamily[key]
    }));

    const fontStyleOptions = Object.keys(edgeStyles).map(key => ({
      value: edgeStyles[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.customTextStyle.fontEdge === edgeStyles[key]
    }));

    const backgroundColorOptions = Object.keys(standardColors).map(key => ({
      value: standardColors[key],
      label: key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
      active: props.customTextStyle.backgroundColor.every((value, index) => value === standardColors[key][index])
    }));

    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <form className={[style.form, style.customCaptionForm].join(' ')}>
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.size_label"
            options={fontScaleOptions}
            classNames={[style.formGroupRow, style.fontSize]}
            styleName="fontScale"
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
          <DropDownCaptionsStyle
            addAccessibleChild={props.addAccessibleChild}
            labelId="cvaa.font_style_label"
            options={fontStyleOptions}
            classNames={[style.formGroupRow, style.fontStyle]}
            styleName="fontEdge"
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
              tabIndex="0"
              ref={el => {
                props.addAccessibleChild(el);
              }}
              onClick={() => props.changeCaptionsStyle(props.customTextStyle)}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  props.changeCaptionsStyle(props.customTextStyle);
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
}

export {CustomCaptionsWindow};
