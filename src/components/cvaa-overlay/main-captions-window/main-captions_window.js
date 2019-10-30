//@flow
import {Component} from 'preact/src/preact';
import style from '../../../styles/style.scss';
import {Text} from 'preact-i18n';
import {KeyMap} from 'utils/key-map';
import {default as Icon, IconType} from 'components/icon';
import {PresetStyleButton} from 'components/cvaa-overlay/main-captions-window/preset-captions-style-button';
import {h} from 'preact';
import {withPlayer} from 'components/player';
import isEqual from 'utils/is-equal';

@withPlayer

/**
 * MainWindow component
 * @class MainWindow
 * @extends {Component}
 */
class MainWindow extends Component {
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
  }

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
          <PresetStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample]}
            changeCaptionsStyle={props.changeCaptionsStyle}
            captionsStyle={this.captionsStyleDefault}
            player={props.player}
          />
          <PresetStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.blackBg]}
            changeCaptionsStyle={props.changeCaptionsStyle}
            captionsStyle={this.captionsStyleBlackBG}
            player={props.player}
          />
          <PresetStyleButton
            addAccessibleChild={props.addAccessibleChild}
            classNames={[style.sample, style.yellowText]}
            changeCaptionsStyle={props.changeCaptionsStyle}
            captionsStyle={this.captionsStyleYellow}
            player={props.player}
          />
        </div>
        {!this.isAdvancedStyleApplied() ? (
          <a
            tabIndex="0"
            className={style.buttonSaveCvaa}
            onClick={() => props.transitionToState(props.cvaaOverlayState.CustomCaptions)}
            ref={el => {
              props.addAccessibleChild(el);
            }}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                props.transitionToState(props.cvaaOverlayState.CustomCaptions);
              }
            }}>
            <Text id={'cvaa.set_custom_caption'} />
          </a>
        ) : (
          <div className={style.customCaptionsApplied}>
            <div className={[style.sample, style.custom].join(' ')} style={props.customTextStyle.toCSS()}>
              <span>Custom captions</span>
              <div className={style.activeTick}>
                <Icon type={IconType.Check} />
              </div>
            </div>
            <a
              tabIndex="0"
              onClick={() => props.transitionToState(props.cvaaOverlayState.CustomCaptions)}
              ref={el => {
                props.addAccessibleChild(el);
              }}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  props.transitionToState(props.cvaaOverlayState.CustomCaptions);
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
   * detection if advanced style applied or one of the default presets applied
   *
   * @returns {boolean} advanced style applied boolean
   * @memberof MainWindow
   */
  isAdvancedStyleApplied(): boolean {
    const {player} = this.props;
    return (
      !isEqual(player.textStyle, this.captionsStyleDefault) &&
      !isEqual(player.textStyle, this.captionsStyleBlackBG) &&
      !isEqual(player.textStyle, this.captionsStyleYellow)
    );
  }
}
export {MainWindow};
