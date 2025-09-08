import {Component, VNode} from 'preact';
import style from '../../styles/style.scss';
import {Text} from 'preact-i18n';
import {KeyMap} from '../../utils/key-map';
import {Icon, IconType} from '../icon';
import {SampleCaptionsStyleButton} from './sample-captions-style-button';
import {h} from 'preact';
import {withPlayer} from '../player';

/**
 * MainWindow component
 * @class MainCaptionsWindow
 * @extends {Component}
 */
@withPlayer
class MainCaptionsWindow extends Component<any, any> {
  captionsStyleHighContrast: any;
  captionsStyleMinimalist: any;
  captionsStyleClassicTV: any;
  captionsStyleEasyReading: any;
  captionsStyleEarlyReaders: any;
  captionsStyleNightMode: any;

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof MainWindow
   */
  componentWillMount() {
    const {player} = this.props;

    // Minimalist
    this.captionsStyleMinimalist = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[2].label,
      textAlign: player.TextStyle.FontAlignment[2].value,
      fontColor: player.TextStyle.StandardColors.WHITE,
      fontFamily: "Roboto, Open Sans, Arial, sans-serif",
      fontEdge: player.TextStyle.EdgeStyles.UNIFORM,
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      backgroundOpacity: player.TextStyle.StandardOpacities.SEMI_HIGH
    });
    // High Contrast
    this.captionsStyleHighContrast = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[3].label,
      textAlign: player.TextStyle.FontAlignment[2].value,
      fontColor: player.TextStyle.StandardColors.YELLOW,
      fontFamily: "Helvetica, Arial, sans-serif",
      fontEdge: player.TextStyle.EdgeStyles.RAISED,
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
    });
    // Classic TV
    this.captionsStyleClassicTV = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[3].label,
      textAlign: player.TextStyle.FontAlignment[2].value,
      fontColor: player.TextStyle.StandardColors.WHITE,
      fontFamily: "Courier, Lucida Console, Verdana, monospace",
      fontEdge: player.TextStyle.EdgeStyles.DEPRESSED,
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
    });
    // Easy Reading
    this.captionsStyleEasyReading = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[3].label,
      textAlign: player.TextStyle.FontAlignment[1].value,
      fontColor: player.TextStyle.StandardColors.DARK_BLUE,
      fontFamily: "OpenDyslexic, Lexend, sans-serif",
      fontEdge: player.TextStyle.EdgeStyles.NONE,
      backgroundColor: player.TextStyle.StandardColors.LIGHT_YELLOW,
      backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
    });
    // Early Readers
    this.captionsStyleEarlyReaders = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[4].label,
      textAlign: player.TextStyle.FontAlignment[2].value,
      fontColor: player.TextStyle.StandardColors.BLACK,
      fontFamily: "Comic Sans MS, Century Gothic, Arial, sans-serif",
      fontEdge: player.TextStyle.EdgeStyles.RAISED,
      backgroundColor: player.TextStyle.StandardColors.YELLOW,
      backgroundOpacity: player.TextStyle.StandardOpacities.OPAQUE
    });
    // Night Mode
    this.captionsStyleNightMode = player.TextStyle.fromJson({
      fontSize: player.TextStyle.FontSizes[2].label,
      textAlign: player.TextStyle.FontAlignment[2].value,
      fontColor: player.TextStyle.StandardColors.LIGHT_GRAY,
      fontFamily: "Segoe UI, SF Pro Text, Helvetica, sans-serif",
      fontEdge: player.TextStyle.EdgeStyles.DROP,
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      backgroundOpacity: player.TextStyle.StandardOpacities.SEMI_HIGH
    });
  }

  componentDidMount() {
    const { player } = this.props;
    // If no preset or custom is applied, default to Minimalist
    const isPreset =
      player.textStyle.isEqual(this.captionsStyleMinimalist) ||
      player.textStyle.isEqual(this.captionsStyleHighContrast) ||
      player.textStyle.isEqual(this.captionsStyleClassicTV) ||
      player.textStyle.isEqual(this.captionsStyleEasyReading) ||
      player.textStyle.isEqual(this.captionsStyleEarlyReaders) ||
      player.textStyle.isEqual(this.captionsStyleNightMode);

    const isCustom = this.props.customPresetStyle && player.textStyle.isEqual(this.props.customPresetStyle);
    
    if (!isPreset && !isCustom) {
      this.props.changeCaptionsStyle(this.captionsStyleMinimalist);
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
    if (e.keyCode === KeyMap.ENTER) {
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

    // Otherwise check which preset is active
    if (player.textStyle.isEqual(this.captionsStyleMinimalist)) return this.captionsStyleMinimalist;
    if (player.textStyle.isEqual(this.captionsStyleHighContrast)) return this.captionsStyleHighContrast;
    if (player.textStyle.isEqual(this.captionsStyleClassicTV)) return this.captionsStyleClassicTV;
    if (player.textStyle.isEqual(this.captionsStyleEasyReading)) return this.captionsStyleEasyReading;
    if (player.textStyle.isEqual(this.captionsStyleEarlyReaders)) return this.captionsStyleEarlyReaders;
    if (player.textStyle.isEqual(this.captionsStyleNightMode)) return this.captionsStyleNightMode;

    // Fallback: Minimalist is always the default on first load
    return this.captionsStyleMinimalist;
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof MainWindow
   */
  render(props: any): VNode<any> {
    return (
      <div className={[style.overlayScreen, style.active].join(' ')}>
        <h2 className={style.title} id={this.props.captionsTitleId}>
          <Text id={'cvaa.title'} />
        </h2>
        <div role="radiogroup">
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.highContrast]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleHighContrast, "Advanced_captions_preset_high_contrast")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleHighContrast)}
          >
            <Text id={'cvaa.sample_high_contrast'} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.minimalist]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleMinimalist, "Advanced_captions_preset_minimalist")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleMinimalist)}
          >
            <Text id={'cvaa.sample_minimalist'} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.classicTv]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleClassicTV, "Advanced_captions_preset_classic_tv_style")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleClassicTV)}
          >
            <Text id={'cvaa.sample_classic_tv'} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.easyReading]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleEasyReading, "Advanced_captions_preset_easy_reading")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleEasyReading)}
          >
            <Text id={'cvaa.sample_easy_reading'} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.earlyReaders]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleEarlyReaders, "Advanced_captions_preset_early_readers")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleEarlyReaders)}
          >
            <Text id={'cvaa.sample_early_readers'} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.nightMode]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleNightMode, "Advanced_captions_preset_night_mode")}
            isActive={props.player.textStyle.isEqual(this.captionsStyleNightMode)}
          >
            <Text id={'cvaa.sample_night_mode'} />
          </SampleCaptionsStyleButton>
        </div>
        <div>
          {props.customPresetStyle && (
            <SampleCaptionsStyleButton
              addAccessibleChild={props.addAccessibleChild}
              classNames={[style.sample]}
              changeCaptionsStyle={() => props.changeCaptionsStyle(props.customPresetStyle, "Advanced_captions_custom")}
              isActive={props.player.textStyle.isEqual(props.customPresetStyle)}
            >
              <Text id={'cvaa.sample_custom'} />
              {props.player.textStyle.isEqual(props.customPresetStyle) && (
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
        <div className={style.previewContainer}>
          <span style={this.getActiveStyle().toCSS()}>
            <Text id={'cvaa.caption_preview'} />
          </span>
        </div>
      </div>
    );
  }
}

export {MainCaptionsWindow};
