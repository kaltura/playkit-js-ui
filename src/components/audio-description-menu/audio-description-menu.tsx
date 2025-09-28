import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import audioDescription, {actions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {WithPlayerProps} from '../player/with-player';
import {WithEventDispatcherProps} from '../event-dispatcher';
import {AUDIO_DESCRIPTION_ENABLED_STATE} from '../../types/reducers/audio-description';
import {getAudioDescriptionLanguageKey, getAudioLanguageKey} from '../../utils/audio-description';
import {EventType} from '../../event';

import {FakeEvent} from '@playkit-js/playkit-js';

type AudioDescriptionMenuProps = {
  audioTracks?: any[];
  audioLabelText?: string;
  asDropdown?: boolean;
  audioDescriptionEnabled?: AUDIO_DESCRIPTION_ENABLED_STATE;
  updateAudioDescriptionEnabled?: (enabledState: AUDIO_DESCRIPTION_ENABLED_STATE) => void;
  onClose: () => void;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: state.audioDescription.advancedAudioDescriptionLanguages,
  audioDescriptionEnabled: state.audioDescription.audioDescriptionEnabled
});

const COMPONENT_NAME = 'AudioDescriptionMenu';

/**
 * AudioDescriptionMenu component
 *
 * @class AudioDescriptionMenu
 * @example <AudioDescriptionMenu />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
// @withText({
//   audioDescriptionLabelText: 'settings.audioDescription'
// })
class AudioDescriptionMenu extends Component<AudioDescriptionMenuProps & WithPlayerProps & WithEventDispatcherProps, any> {
  /**
   * call to player selectTrack method and change audio track
   *
   * @param {Object} audioTrack - audio track
   * @returns {void}
   * @memberof Settings
   */
  public onAudioDescriptionChange(enabledState: AUDIO_DESCRIPTION_ENABLED_STATE): void {
    this.props.updateAudioDescriptionEnabled?.(enabledState);

    const currLanguageKey = this.props.player?.getActiveTracks()['audio'].language;
    const newLanguageKey =
      enabledState === AUDIO_DESCRIPTION_ENABLED_STATE.ENABLE_AUDIO_DESCRIPTION
        ? getAudioDescriptionLanguageKey(currLanguageKey)
        : getAudioLanguageKey(currLanguageKey);

    const newAudioTrack = this.props.player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (newAudioTrack) {
      this.props.player?.selectTrack(newAudioTrack);
    }

    // TODO use event dispatcher ?
    this.props.player?.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_AUDIO_DESCRIPTION, {enabledState}));
  }

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof AudioMenu
   */
  public render(props: any): VNode<any> | undefined {
    // TODO use i18n
    const options = ['Disable', 'Standard Audio Description', 'Extended Audio Description'].map((option, index) => {
      return {
        label: option,
        active: this.props.audioDescriptionEnabled === index,
        value: index
      };
    });

    //debugger;

    // TODO implement as settings submenu
    //if (this.props.asDropdown) {
    // return (
    //   <SmartContainerItem
    //     pushRef={el => {
    //       props.pushRef(el);
    //     }}
    //     icon={IconType.Captions}
    //     label={this.props.audioLabelText}
    //     options={options}
    //     onMenuChosen={enabledState => this.onAudioDescriptionChange(enabledState)}
    //     onClose={this.props.onClose}
    //   />
    // );
    // } else {
    return (
      <Menu
        pushRef={el => {
          // TODO where does this come from ?
          //this.props.addAccessibleChild(el);
          props.pushRef(el);
        }}
        options={options}
        onMenuChosen={enabledState => this.onAudioDescriptionChange(enabledState)}
        onClose={this.props.onClose}
      />
    );
    // }
  }
}

AudioDescriptionMenu.displayName = COMPONENT_NAME;
export {AudioDescriptionMenu};
