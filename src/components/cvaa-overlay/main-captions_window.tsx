import {Component, VNode} from 'preact';
import style from '../../styles/style.scss';
import {Text, withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {SampleCaptionsStyleButton} from './sample-captions-style-button';
import {h} from 'preact';
import {withPlayer} from '../player';
import { KeyCode } from '../../utils';

const translates = (props: any) => ({ 
  title: <Text id={'cvaa.title'} />,
  sampleHighContrast: <Text id={'cvaa.sample_high_contrast'} />,
  sampleMinimalist: <Text id={'cvaa.sample_minimalist'} />,
  sampleClassicTv: <Text id={'cvaa.sample_classic_tv'} />,
  sampleEasyReading: <Text id={'cvaa.sample_easy_reading'} />,
  sampleEarlyReaders: <Text id={'cvaa.sample_early_readers'} />,
  sampleNightMode: <Text id={'cvaa.sample_night_mode'} />,
  sampleCustom: <Text id={'cvaa.sample_custom'} />,
  setCustomCaption: <Text id={'cvaa.set_custom_caption'} />,
  captionPreview: <Text id={'cvaa.caption_preview'} />
});

/**
 * MainWindow component
 * @class MainCaptionsWindow
 * @extends {Component}
 */
@withPlayer
@withText(translates)
class MainCaptionsWindow extends Component<any, any> {
    presets: {
      key: string;
      className: string;
      textId: string;
      label: string;
      ariaLabel: string;
      source: string;
      style: any;
    }[] = [];

    presetRefs: Array<HTMLDivElement | null> = [];

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
        label: "Minimalist",
        ariaLabel: this.props.sampleMinimalist,
        textId: "cvaa.sample_minimalist",
        source: "Advanced_captions_preset_minimalist",
        style: player.TextStyle.fromJson({
          fontSize: player.TextStyle.FontSizes[1].label,
          fontWeight: player.TextStyle.StandardFontWeights[1].value,
          textAlign: player.TextStyle.FontAlignment[2].value,
          fontColor: player.TextStyle.StandardColors.WHITE,
          fontFamily: "Sans-Serif",
          backgroundColor: player.TextStyle.StandardColors.BLACK,
          backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
        })
      },
      {
        key: "highContrast",
        className: style.highContrast,
        label: "High Contrast",
        ariaLabel: this.props.sampleHighContrast,
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
        label: "Classic",  
        ariaLabel: this.props.sampleClassicTv,
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
        label: "Easy Reading",
        ariaLabel: this.props.sampleEasyReading,
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
        label: "Early Readers",
        ariaLabel: this.props.sampleEarlyReaders,
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
        label: "Night Mode",
        ariaLabel: this.props.sampleNightMode,
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

  focusPresets = (index: number): void => {
    const el = this.presetRefs[index];
    if (el) {
      el.focus();
    }
  };

  selectPresetByIndex = (index: number): void => {
    const preset = this.presets[index];
    if (preset) {
      this.props.changeCaptionsStyle(preset.style, preset.source);
    }
  };

  onPresetsKeyDown = (e: KeyboardEvent, currentIndex: number): void => {
    switch (e.code) {
      case KeyCode.ArrowRight:
      case KeyCode.ArrowDown: {
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % this.presets.length;
        this.selectPresetByIndex(nextIndex);
        this.focusPresets(nextIndex);
        break;
      }
      case KeyCode.ArrowLeft:
      case KeyCode.ArrowUp: {
        e.preventDefault();
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + this.presets.length) % this.presets.length;
        this.selectPresetByIndex(prevIndex);
        this.focusPresets(prevIndex);
        break;
      }
      case KeyCode.Space:
      case KeyCode.Enter: {
        e.preventDefault();
        e.stopPropagation();
        this.selectPresetByIndex(currentIndex);
        break;
      }
      case KeyCode.Home: {
        e.preventDefault();
        this.selectPresetByIndex(0);
        this.focusPresets(0);
        break;
      }
      case KeyCode.End: {
        e.preventDefault();
        const last = this.presets.length - 1;
        this.selectPresetByIndex(last);
        this.focusPresets(last);
        break;
      }
      default:
        break;
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
    const activePresetIndex = this.presets.findIndex(preset => this.props.player.textStyle.isEqual(preset.style));
    // If no preset is active, fall back to the first preset
    const focusIndex = activePresetIndex !== -1 ? activePresetIndex : 0;
    
    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <h2 className={style.title} id={this.props.captionsTitleId}>
          {this.props.title}
        </h2>
        <div role="radiogroup" aria-labelledby={this.props.captionsTitleId}>
          {this.presets.map((preset, index) => (
            <SampleCaptionsStyleButton
              key={preset.key}
              addAccessibleChild={props.addAccessibleChild}
              classNames={[style.sample, preset.className]}
              changeCaptionsStyle={() =>
                props.changeCaptionsStyle(preset.style, preset.source)
              }
              isActive={props.player.textStyle.isEqual(preset.style)}
              tabIndex={index === focusIndex ? 0 : -1}
              onKeyDown={(e: KeyboardEvent) => this.onPresetsKeyDown(e, index)}
              setRef={(el: HTMLDivElement | null) => {this.presetRefs[index] = el;}}
              aria-label={preset.ariaLabel}
            >
              {preset.label}
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
              tabIndex={0}
              aria-label={this.props.sampleCustom}
            >
              <span className={style.customButtonText}>
                Custom captions
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
            aria-label={this.props.setCustomCaption}
          >
            <span>
              Set custom caption
            </span>
          </button>
        </div>
        <div className={`${style.previewContainer} ${activePreset?.key === "easyReading" ? style.previewEasyReading : ""}`}>
          <span style={this.getActiveStyle().toCSS()}>
            {this.props.captionPreview}
          </span>
        </div>
      </div>
    );
  }
}

export {MainCaptionsWindow};
