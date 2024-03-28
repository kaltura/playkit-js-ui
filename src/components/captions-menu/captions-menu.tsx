import {h, Component, Fragment, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/cvaa';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {withEventDispatcher} from '../event-dispatcher';
import {KeyMap} from '../../utils';
import {withKeyboardEvent} from '../../components/keyboard';
import {KeyboardEventHandlers} from '../../types';
import {Menu} from '../menu';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  showAdvancedCaptionsMenu: state.config.settings.showAdvancedCaptionsMenu
});

const COMPONENT_NAME = 'CaptionsMenu';

/**
 * CaptionsMenu component
 *
 * @class CaptionsMenu
 * @example <CaptionsMenu />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  captionsLabelText: 'captions.captions',
  advancedCaptionsSettingsText: 'captions.advanced_captions_settings'
})
class CaptionsMenu extends Component<any, any> {
  _lastActiveTextLanguage: string = '';
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.C
      },
      action: () => {
        const {player, logger} = this.props;
        let activeTextTrack = player.getActiveTracks().text;
        if (activeTextTrack) {
          if (activeTextTrack.language === 'off' && this._lastActiveTextLanguage) {
            logger.debug(`Changing text track to language`, this._lastActiveTextLanguage);
            const selectedTextTrack = player.getTracks('text').find(track => track.language === this._lastActiveTextLanguage);
            player.selectTrack(selectedTextTrack);
          } else if (activeTextTrack.language !== 'off' && !this._lastActiveTextLanguage) {
            logger.debug(`Hiding text track`);
            this._lastActiveTextLanguage = activeTextTrack.language;
            player.hideTextTrack();
          }
        }
      }
    }
  ];

  /**
   * We update the last language selected here upon trackTracks props change. This is done to make sure we update the
   * last text track lanague upon language menu selection and using the (C) keyboard key.
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentWillReceiveProps(nextProps: any): void {
    const currActiveTrack = this.props.textTracks.find(track => track.active);
    const nextActiveTrack = nextProps.textTracks.find(track => track.active);
    if (currActiveTrack && currActiveTrack.language !== 'off' && nextActiveTrack && nextActiveTrack.language === 'off') {
      this._lastActiveTextLanguage = currActiveTrack.language;
    } else if (nextActiveTrack && nextActiveTrack.language !== 'off') {
      this._lastActiveTextLanguage = '';
    }
  }

  /**
   * Select the given text track
   *
   * @param {Object} textTrack - text track
   * @returns {void}
   * @memberof CaptionsMenu
   */
  onCaptionsChange(textTrack: any | string): void {
    if (textTrack === this.props.advancedCaptionsSettingsText) {
      this.props.onAdvancedCaptionsClick();
      return;
    }
    this.props.player.selectTrack(textTrack);
    this.props.notifyClick({
      type: this.props.player.Track.TEXT,
      track: textTrack
    });
  }

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof CaptionsMenu
   */
  render(props: any): VNode<any> {
    const textOptions = props.textTracks.map(t => ({
      label: t.label || t.language,
      active: t.active,
      value: t
    }));

    if (props.showAdvancedCaptionsMenu) {
      textOptions.push({label: props.advancedCaptionsSettingsText, value: props.advancedCaptionsSettingsText, active: false});
    }

    if (this.props.asDropdown) {
      return (
        <SmartContainerItem
          pushRef={el => {
            props.pushRef(el);
          }}
          icon={IconType.Captions}
          label={this.props.captionsLabelText}
          options={textOptions}
          onMenuChosen={textTrack => this.onCaptionsChange(textTrack)}
        />
      );
    } else {
      return <Menu options={textOptions} onMenuChosen={textTrack => this.onCaptionsChange(textTrack)} onClose={() => {}} />;
    }
  }
}

CaptionsMenu.displayName = COMPONENT_NAME;
export {CaptionsMenu};
