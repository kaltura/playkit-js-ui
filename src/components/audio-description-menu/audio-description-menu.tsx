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
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {getAudioDescriptionLanguageKey, getAudioLanguageKey} from '../../utils/audio-description';
import {EventType} from '../../event';

import {FakeEvent} from '@playkit-js/playkit-js';

type AudioDescriptionMenuProps = {
  asDropdown?: boolean;
  audioTracks?: any[];
  audioDescriptionText?: string;
  audioDescriptionEnabled?: boolean;
  audioDescriptionType?: AUDIO_DESCRIPTION_TYPE;
  audioDescriptionLanguages?: string[];
  advancedAudioDescriptionLanguages?: string[];
  updateAudioDescriptionEnabled?: (isEnabled: boolean) => void;
  updateAudioDescriptionType?: (selectedType: AUDIO_DESCRIPTION_TYPE) => void;
  disableText?: string;
  standardAudioDescriptionText?: string;
  advancedAudioDescriptionText?: string;
  standardAudioDescriptionAvailableText?: string;
  noStandardAudioDescriptionAvailableText?: string;
  noExtendedAudioDescriptionAvailableText?: string;
  extendedAudioDescriptionAvailableText?: string;
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
  audioDescriptionEnabled: state.audioDescription.isEnabled,
  audioDescriptionType: state.audioDescription.selectedType
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
@withText({
  audioDescriptionText: 'settings.audioDescription',
  disableText: 'audioDescription.disable',
  standardAudioDescriptionText: 'audioDescription.standardAudioDescription',
  advancedAudioDescriptionText: 'audioDescription.advancedAudioDescription',
  noStandardAudioDescriptionAvailableText: 'audioDescription.noStandardAudioDescriptionAvailable',
  standardAudioDescriptionAvailableText: 'audioDescription.standardAudioDescriptionAvailable',
  noExtendedAudioDescriptionAvailableText: 'audioDescription.noExtendedAudioDescriptionAvailable',
  extendedAudioDescriptionAvailableText: 'audioDescription.extendedAudioDescriptionAvailable'
})
class AudioDescriptionMenu extends Component<AudioDescriptionMenuProps & WithPlayerProps & WithEventDispatcherProps, any> {
  /**
   * call to player selectTrack method and change audio track
   *
   * @param {Object} audioTrack - audio track
   * @returns {void}
   * @memberof Settings
   */
  public onAudioDescriptionChange(enabledState: number): void {
    const activeAudioLanguage = getAudioLanguageKey(this.props.player?.getActiveTracks()['audio']?.language || '');

    if (enabledState === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION && !this.props.audioDescriptionLanguages?.includes(activeAudioLanguage)) {
      this.props.updateAudioDescriptionEnabled?.(this.props.audioDescriptionEnabled ?? false);
      this.props.updateAudioDescriptionType?.(this.props.audioDescriptionType ?? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      return;
    }

    if (
      enabledState === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION &&
      !this.props.advancedAudioDescriptionLanguages?.includes(activeAudioLanguage)
    ) {
      this.props.updateAudioDescriptionEnabled?.(this.props.audioDescriptionEnabled ?? false);
      this.props.updateAudioDescriptionType?.(this.props.audioDescriptionType ?? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      return;
    }

    const isEnabled = enabledState !== 0;
    const selectedType = enabledState === 0 ? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION : enabledState;

    this.props.updateAudioDescriptionEnabled?.(isEnabled);
    this.props.updateAudioDescriptionType?.(selectedType);

    const currLanguageKey = this.props.player?.getActiveTracks()['audio'].language;
    const newLanguageKey = this.props.audioDescriptionEnabled
      ? getAudioDescriptionLanguageKey(currLanguageKey)
      : getAudioLanguageKey(currLanguageKey);

    const newAudioTrack = this.props.player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (newAudioTrack) {
      this.props.player?.selectTrack(newAudioTrack);
    }

    // TODO use event dispatcher ?
    this.props.player?.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_AUDIO_DESCRIPTION, {isEnabled, selectedType}));
  }

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof AudioMenu
   */
  public render(props: any): VNode<any> | undefined {
    const audioLanguage = this.props.player?.getActiveTracks()['audio']?.language || '';
    const hasAudioDescription = !!props.audioDescriptionLanguages?.includes(audioLanguage);
    const hasAdvancedAudioDescription = !!props.advancedAudioDescriptionLanguages?.includes(audioLanguage);

    const options = [
      {
        active: !this.props.audioDescriptionEnabled,
        label: this.props.disableText,
        value: 0
      },
      {
        active: this.props.audioDescriptionEnabled && this.props.audioDescriptionType === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION,
        label: this.props.standardAudioDescriptionText,
        ariaLabel: hasAudioDescription ? this.props.standardAudioDescriptionAvailableText : this.props.noStandardAudioDescriptionAvailableText,
        value: AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION
      },
      {
        active: this.props.audioDescriptionEnabled && this.props.audioDescriptionType === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION,
        label: this.props.advancedAudioDescriptionText,
        ariaLabel: hasAdvancedAudioDescription
          ? this.props.extendedAudioDescriptionAvailableText
          : this.props.noExtendedAudioDescriptionAvailableText,
        value: AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION
      }
    ];

    if (this.props.asDropdown) {
      return (
        <SmartContainerItem
          pushRef={el => {
            props.pushRef(el);
          }}
          icon={IconType.Captions}
          label={this.props.audioDescriptionText}
          options={options}
          onMenuChosen={enabledState => this.onAudioDescriptionChange(enabledState)}
        />
      );
    } else {
      return (
        <Menu
          pushRef={el => {
            // TODO where does this come from ?
            //this.props.addAccessibleChild(el);
            props.pushRef(el);
          }}
          options={options}
          onMenuChosen={enabledState => this.onAudioDescriptionChange(enabledState)}
          onClose={() => {}}
        />
      );
    }
  }
}

AudioDescriptionMenu.displayName = COMPONENT_NAME;
export {AudioDescriptionMenu};
