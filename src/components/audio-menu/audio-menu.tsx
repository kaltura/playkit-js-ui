import {h, Component, VNode} from 'preact';
import {withText, Text, Localizer} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions as settingsActions} from '../../reducers/settings';
import {actions as audioDescriptionActions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {WithPlayerProps} from '../player/with-player';
import {WithEventDispatcherProps} from '../event-dispatcher';

import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';

type AudioMenuProps = {
  audioTracks?: any[];
  audioLabelText?: string;
  audioDescriptionAvailableText?: string;
  thereIsAudioDescriptionAvailableText?: string;
  thereIsNoAudioDescriptionAvailableText?: string;
  advancedAudioDescriptionLanguages?: string[];
  audioDescriptionLanguages?: string[];
  asDropdown?: boolean;
  audioDescriptionEnabled?: boolean;
  audioDescriptionType?: AUDIO_DESCRIPTION_TYPE;
  updateAudioDescriptionEnabled?: (isEnabled: boolean) => void;
  updateAudioDescriptionType?: (selectedType: AUDIO_DESCRIPTION_TYPE) => void;
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
  audioDescriptionEnabled: state.audioDescription.isEnabled
});

const COMPONENT_NAME = 'AudioMenu';

/**
 * AudioMenu component
 *
 * @class AudioMenu
 * @example <AudioMenu />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...settingsActions, ...audioDescriptionActions}))
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
@withText({
  audioLabelText: 'settings.audio',
  audioDescriptionAvailableText: 'audioDescription.audioDescriptionAvailable',
  thereIsAudioDescriptionAvailableText: 'audioDescription.thereIsAudioDescriptionAvailable',
  thereIsNoAudioDescriptionAvailableText: 'audioDescription.thereIsNoAudioDescriptionAvailable'
})
class AudioMenu extends Component<AudioMenuProps & WithPlayerProps & WithEventDispatcherProps, any> {
  /**
   * call to player selectTrack method and change audio track
   *
   * @param {Object} audioTrack - audio track
   * @returns {void}
   * @memberof Settings
   */
  public onAudioChange(audioTrack: any): void {
    const hasAudioDescription = !!this.props.audioDescriptionLanguages?.find(l => l === audioTrack.language);
    const hasAdvancedAudioDescription = !!this.props.advancedAudioDescriptionLanguages?.find(l => l === audioTrack.language);

    if (this.props.audioDescriptionEnabled) {
      if (!hasAudioDescription && !hasAdvancedAudioDescription) {
        this.props.updateAudioDescriptionEnabled?.(false);
      } else if (hasAudioDescription && !hasAdvancedAudioDescription) {
        this.props.updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      } else if (!hasAudioDescription && hasAdvancedAudioDescription) {
        this.props.updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
      }
    }

    this.props.player!.selectTrack(audioTrack);
    this.props.notifyClick!({
      type: this.props.player!.Track.AUDIO,
      track: audioTrack
    });
  }

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof AudioMenu
   */
  public render(props: AudioMenuProps): VNode<any> | undefined {
    const audioOptions = props.audioTracks?.length
      ? props.audioTracks
          .filter(t => t.label || t.language)
          .map(t => {
            const hasAudioDescription = !!props.audioDescriptionLanguages?.find(l => l === t.language);
            const hasAdvancedAudioDescription = !!props.advancedAudioDescriptionLanguages?.find(l => l === t.language);

            const label = `${t.label || t.language} ${hasAudioDescription || hasAdvancedAudioDescription ? props.audioDescriptionAvailableText : ''}`;
            const ariaLabel = `${t.label || t.language} - ${
              hasAudioDescription || hasAdvancedAudioDescription
                ? this.props.thereIsAudioDescriptionAvailableText
                : this.props.thereIsNoAudioDescriptionAvailableText
            }`;
            return {
              label,
              ariaLabel,
              active: t.active,
              value: t
            };
          })
      : [];

    if (this.props.asDropdown) {
      return (
        <SmartContainerItem
          pushRef={el => {
            //props.pushRef(el);
          }}
          icon={IconType.Captions}
          label={this.props.audioLabelText}
          options={audioOptions}
          onMenuChosen={audioTrack => this.onAudioChange(audioTrack)}
          onClose={() => {}}
        />
      );
    } else {
      return (
        <Menu
          pushRef={el => {
            // TODO where does this come from ?
            //this.props.addAccessibleChild(el);
            //props.pushRef(el);
          }}
          options={audioOptions}
          onMenuChosen={audioTrack => this.onAudioChange(audioTrack)}
          onClose={() => {}}
        />
      );
    }
  }
}

AudioMenu.displayName = COMPONENT_NAME;
export {AudioMenu};
