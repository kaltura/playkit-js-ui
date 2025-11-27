import {Component, VNode} from 'preact';
import style from '../../styles/style.scss';
import {Text} from 'preact-i18n';
import {KeyMap} from '../../utils/key-map';
import {Icon, IconType} from '../icon';
import {SampleCaptionsStyleButton} from './sample-captions-style-button';
import {h} from 'preact';
import {withPlayer} from '../player';
import { KeyCode } from '../../utils/key-map';

/**
 * MainWindow component
 * @class MainCaptionsWindow
 * @extends {Component}
 */
@withPlayer
class MainCaptionsWindow extends Component<any, any> {
    presets: {
      key: string;
      className: string;
      textId: string;
      source: string;
      style: any;
    }[] = [];

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof MainWindow
   */
  componentWillMount() {
    const {player} = this.props;

    this.presets = [
      {
        key: "minimalist",
        className: style.minimalist,
        textId: "cvaa.sample_minimalist",
        source: "Advanced_captions_preset_minimalist",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[0].label,
          fontWeight: player.TextStyle.StandardFontWeights[1].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.WHITE,
          fontFamily: "Verdana",
          backgroundColor: player.TextStyle.StandardColors.BLACK,
          backgroundOpacity: player.TextStyle.StandardOpacities.SEMI_HIGH
        })
      },
      {
        key: "highContrast",
        className: style.highContrast,
        textId: "cvaa.sample_high_contrast",
        source: "Advanced_captions_preset_high_contrast",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[1].label,
          fontWeight: player.TextStyle.StandardFontWeights[3].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.YELLOW,
          fontFamily: "Arial",
          backgroundColor: player.TextStyle.StandardColors.BLACK,
          backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
        })
      },
      {
        key: "classicTv",
        className: style.classicTv,
        textId: "cvaa.sample_classic_tv",
        source: "Advanced_captions_preset_classic_tv_style",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[0].label,
          fontWeight: player.TextStyle.StandardFontWeights[1].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.WHITE,
          fontFamily: "Times New Roman",
          backgroundColor: player.TextStyle.StandardColors.BLACK,
          backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
        })
      },
      {
        key: "easyReading",
        className: style.easyReading,
        textId: "cvaa.sample_easy_reading",
        source: "Advanced_captions_preset_easy_reading",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[2].label,
          fontWeight: player.TextStyle.StandardFontWeights[3].value,
          textAlign: player.TextStyle.FontAlignment[1].value,
          fontColor: player.TextStyle.StandardColors.DARK_BLUE,
          fontFamily: "Tahoma",
          backgroundColor: player.TextStyle.StandardColors.LIGHT_YELLOW,
          backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
        })
      },
      {
        key: "earlyReaders",
        className: style.earlyReaders,
        textId: "cvaa.sample_early_readers",
        source: "Advanced_captions_preset_early_readers",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[2].label,
          fontWeight: player.TextStyle.StandardFontWeights[3].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.BLACK,
          fontFamily: "Trebuchet MS",
          backgroundColor: player.TextStyle.StandardColors.YELLOW,
          backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
        })
      },
      {
        key: "nightMode",
        className: style.nightMode,
        textId: "cvaa.sample_night_mode",
        source: "Advanced_captions_preset_night_mode",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[1].label,
          fontWeight: player.TextStyle.StandardFontWeights[3].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.LIGHT_GRAY,
          fontFamily: "EB Garamond",
          backgroundColor: player.TextStyle.StandardColors.BLACK,
          backgroundOpacity: player.TextStyle.StandardOpacities.SEMI_HIGH
        })
      }
    ];
  }

  componentDidMount() {
    const { player } = this.props;
    // If no preset or custom is applied, default to Minimalist
    const isPreset = this.presets.map(preset => preset.style).some(style => player.textStyle.isEqual(style));
    const isCustom = this.props.customPresetStyle && player.textStyle.isEqual(this.props.customPresetStyle);
    
    if (!isPreset && !isCustom) {
      this.props.changeCaptionsStyle(
        this.presets.find(preset => preset.key === "minimalist")?.style
      );
    }
  }

  /**
   * transition to state handler
   *
   * @returns {void}
   * @memberof MainWindow
   */
  transitionToState = (): void => {
    const activeStyle = this.getActiveStyle();
    this.props.setInitialCustomStyle(activeStyle);
    this.props.transitionToState(this.props.cvaaOverlayState.CustomCaptions);
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof MainWindow
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.code === KeyCode.Enter) {
      this.transitionToState();
    }
  };

  

  /**
   * get the active captions style for preview
   *
   * @returns {Object} - active captions style
   * @memberof MainWindow
   */
  getActiveStyle = () => {
    const { player, customPresetStyle } = this.props;

    // If the current style equals the saved custom preset, use it
    if (customPresetStyle && player.textStyle.isEqual(customPresetStyle)) {
      return customPresetStyle;
    }

    const styles = this.presets.map(preset => preset.style);
    const activeStyle = styles.find(style => player.textStyle.isEqual(style));

    // Fallback: Minimalist is always the default on first load
    return activeStyle ? activeStyle : this.presets.find(preset => preset.key === "minimalist")!.style;
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof MainWindow
   */
  render(props: any): VNode<any> {    
    const activePreset = this.presets.find(preset => this.props.player.textStyle.isEqual(preset.style));
    const isCustomEqualToPreset = this.presets.some(preset => props.customPresetStyle && props.customPresetStyle.isEqual(preset.style));
    const isCustomActive = props.customPresetStyle && this.props.player.textStyle.isEqual(props.customPresetStyle);
    
    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <h2 className={style.title} id={this.props.captionsTitleId}>
          <Text id={'cvaa.title'} />
        </h2>
        <div role="radiogroup">
          {this.presets.map(preset => (
            <SampleCaptionsStyleButton
              key={preset.key}
              addAccessibleChild={props.addAccessibleChild}
              classNames={[style.sample, preset.className]}
              changeCaptionsStyle={() =>
                props.changeCaptionsStyle(preset.style, preset.source)
              }
              isActive={props.player.textStyle.isEqual(preset.style)}
            >
              <Text id={preset.textId} />
            </SampleCaptionsStyleButton>
          ))}
        </div>
        <div className={style.customButtons}>
          {props.customPresetStyle && !isCustomEqualToPreset && (
            <SampleCaptionsStyleButton
              addAccessibleChild={props.addAccessibleChild}
              classNames={[style.sample]}
              changeCaptionsStyle={() => props.changeCaptionsStyle(props.customPresetStyle, "Advanced_captions_custom")}
              isActive={isCustomActive}
            >
              <span className={style.customButtonText}>
                <Text id={'cvaa.sample_custom'} />
              </span>
              {isCustomActive && (
                <span className={style.activeTick}>
                  <Icon type={IconType.Check} />
                </span>
              )}
            </SampleCaptionsStyleButton>
          )}
          <button
            id="setCustom"
            type="button"
            className={style.buttonSaveCvaa}
            onClick={this.transitionToState}
            ref={el => {
              props.addAccessibleChild(el);
              props.setCustomOrEditRef?.(el);
            }}
            onKeyDown={this.onKeyDown}
          >
            <span>
              <Text id={'cvaa.set_custom_caption'} />
            </span>
          </button>
        </div>
        <div className={`${style.previewContainer} ${activePreset?.key === "easyReading" ? style.previewEasyReading : ""}`}>
          <span style={this.getActiveStyle().toCSS()}>
            <Text id={'cvaa.caption_preview'} />
          </span>
        </div>
      </div>
    );
  }
}

export {MainCaptionsWindow};
