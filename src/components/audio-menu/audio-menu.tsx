import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/settings';
import {SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {WithPlayerProps} from '../player/with-player';
import {WithEventDispatcherProps} from '../event-dispatcher';

type AudioMenuProps = {
  audioTracks?: any[];
  audioLabelText?: string;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages
});

const COMPONENT_NAME = 'AudioMenu';

/**
 * AudioMenu component
 *
 * @class AudioMenu
 * @example <AudioMenu />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
@withText({
  audioLabelText: 'settings.audio'
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
    // @ts-ignore - store types
    this.props.updateAudio(audioTrack);
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
  public render(props: any): VNode<any> | undefined {
    const audioOptions = props.audioTracks
      .filter(t => t.label || t.language)
      .map(t => {
        const hasAudioDescription = !!props.audioDescriptionLanguages.find(l => l === t.language);
        const label = `${t.label || t.language} ${hasAudioDescription ? '(Audio Description Available)' : ''}`;

        return {
          label,
          active: t.active,
          value: t
        };
      });

    return (
      <SmartContainerItem
        pushRef={el => {
          props.pushRef(el);
        }}
        icon={IconType.Audio}
        label={this.props.audioLabelText}
        options={audioOptions}
        onMenuChosen={audioTrack => this.onAudioChange(audioTrack)}
      />
    );
  }
}

AudioMenu.displayName = COMPONENT_NAME;
export {AudioMenu};
