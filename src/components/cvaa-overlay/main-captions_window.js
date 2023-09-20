//@flow
import {Component} from 'preact';
import style from '../../styles/style.scss';
import {Text} from 'preact-i18n';
import {KeyMap} from '../../utils/key-map';
import {default as Icon, IconType} from '../icon';
import {SampleCaptionsStyleButton} from './sample-captions-style-button';
import {h} from 'preact';
import {withPlayer} from '../player';

/**
 * MainWindow component
 * @class MainCaptionsWindow
 * @extends {Component}
 */
@withPlayer
class MainCaptionsWindow extends Component {
  captionsStyleDefault: Object;
  captionsStyleYellow: Object;
  captionsStyleBlackBG: Object;

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof MainWindow
   */
  componentWillMount() {
    const {player} = this.props;

    this.captionsStyleDefault = player.TextStyle.fromJson({
      backgroundOpacity: player.TextStyle.StandardOpacities.TRANSPARENT
    });

    this.captionsStyleYellow = player.TextStyle.fromJson({
      backgroundOpacity: player.TextStyle.StandardOpacities.TRANSPARENT,
      fontColor: player.TextStyle.StandardColors.YELLOW
    });

    this.captionsStyleBlackBG = player.TextStyle.fromJson({
      backgroundColor: player.TextStyle.StandardColors.BLACK,
      fontColor: player.TextStyle.StandardColors.WHITE
    });
  }

  /**
   * transition to state handler
   *
   * @returns {void}
   * @memberof MainWindow
   */
  transitionToState = (): void => {
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
        <div role="group">
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleDefault)}
            isActive={props.player.textStyle.isEqual(this.captionsStyleDefault)}>
            <Text id={'cvaa.sample_caption_tag'} fields={{number: '1'}} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.blackBg]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleBlackBG)}
            isActive={props.player.textStyle.isEqual(this.captionsStyleBlackBG)}>
            <Text id={'cvaa.sample_caption_tag'} fields={{number: '2'}} />
          </SampleCaptionsStyleButton>
          <SampleCaptionsStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.yellowText]}
            changeCaptionsStyle={() => props.changeCaptionsStyle(this.captionsStyleYellow)}
            isActive={props.player.textStyle.isEqual(this.captionsStyleYellow)}>
            <Text id={'cvaa.sample_caption_tag'} fields={{number: '3'}} />
          </SampleCaptionsStyleButton>
        </div>
        {!this.isAdvancedStyleApplied() ? (
          <a
            role="button"
            aria-haspopup="true"
            tabIndex="0"
            className={style.buttonSaveCvaa}
            onClick={this.transitionToState}
            ref={el => {
              props.addAccessibleChild(el);
            }}
            onKeyDown={this.onKeyDown}>
            <Text id={'cvaa.set_custom_caption'} />
          </a>
        ) : (
          <div className={style.customCaptionsApplied}>
            <div className={[style.sample, style.custom].join(' ')} style={props.customTextStyle.toCSS()}>
              <Text id={'cvaa.sample_custom_caption_tag'} />
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            </div>
            <a
              role="button"
              tabIndex="0"
              aria-haspopup="true"
              onClick={this.transitionToState}
              ref={el => {
                props.addAccessibleChild(el);
              }}
              onKeyDown={this.onKeyDown}>
              <Text id={'cvaa.edit_caption'} />
            </a>
          </div>
        )}
      </div>
    );
  }

  /**
   * detection if advanced style applied or one of the default presets applied
   *
   * @returns {boolean} advanced style applied boolean
   * @memberof MainWindow
   */
  isAdvancedStyleApplied(): boolean {
    const {player} = this.props;
    return (
      !player.textStyle.isEqual(this.captionsStyleDefault) &&
      !player.textStyle.isEqual(this.captionsStyleBlackBG) &&
      !player.textStyle.isEqual(this.captionsStyleYellow)
    );
  }
}

export {MainCaptionsWindow};
