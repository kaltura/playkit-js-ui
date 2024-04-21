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
import {withKeyboardEvent} from '../../components/keyboard';

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
    const textOptions = props.textTracks
      .map(t => ({
        label: t.label || t.language,
        active: t.active,
        value: t
      }))
      .sort((a, b) => (a.label > b.label || a.label === 'Off' ? 1 : -1));

    if (props.showAdvancedCaptionsMenu) {
      textOptions.push({label: props.advancedCaptionsSettingsText, value: props.advancedCaptionsSettingsText, active: false});
    }

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
  }
}

CaptionsMenu.displayName = COMPONENT_NAME;
export {CaptionsMenu};
