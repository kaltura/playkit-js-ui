//@flow
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from 'utils';
import {actions} from 'reducers/settings';
import {BadgeType, SmartContainerItem} from 'components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';

const HeightResolution = {
  HD: 1080,
  UHD_4K: 2160,
  UHD_8K: 4320
};

const DEFAULT_VIDEO_TRACK = 360;

/**
 * Determines the badge icon type of the quality option based on the height of the resolution.
 *
 * @param {number} videoTrackHeight - video track resolution height.
 * @returns {string | null} - the badge icon type or null depends on the resolution height.
 */
function getLabelBadgeType(videoTrackHeight: number): string | null {
  const [QHD, , Q4K, , Q8k] = Object.keys(BadgeType);
  if (videoTrackHeight >= HeightResolution.HD && videoTrackHeight < HeightResolution.UHD_4K) {
    return QHD;
  } else if (videoTrackHeight >= HeightResolution.UHD_4K && videoTrackHeight < HeightResolution.UHD_8K) {
    return Q4K;
  } else if (videoTrackHeight >= HeightResolution.UHD_8K) {
    return Q8k;
  }
  return null;
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks
});

const rtlLanguages = ['ae', 'ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he', 'ku', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi'];

const COMPONENT_NAME = 'QualityMenu';

/**
 * QualityMenu component
 *
 * @class QualityMenu
 * @example <QualityMenu />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
@withText({
  qualityLabelText: 'settings.quality',
  qualityAutoLabelText: 'settings.qualityAuto'
})
class QualityMenu extends Component {
  /**
   * change quality track or if value is 'auto', enable player adaptive bitrate
   *
   * @param {(Object | string)} videoTrack - video track
   * @returns {void}
   * @memberof QualityMenu
   */
  onQualityChange(videoTrack: Object | string): void {
    this.props.updateQuality(videoTrack);
    const {player} = this.props;
    if (videoTrack === 'auto') {
      player.enableAdaptiveBitrate();
    } else {
      player.selectTrack(videoTrack);
    }
    this.props.notifyClick({
      type: player.Track.VIDEO,
      track: videoTrack
    });
  }

  /**
   * This function gets an array and increases it if needed in each iteration. The function checks if the last element
   * in the sorted array has the same label as the new current track element. If so, it compares their bandwidth
   * and selects the one with the higher. If the resolution is different then it just adds it to the array
   *
   * @param {Array} qualities - sorted (!) video tracks array
   * @param {object} currentTrack - a track
   * @returns {Array<any>} - an array with unique values, compared by their height. if the new track (currenttrack) has
   * the same height value, then we take the one with the higher bandwidth (replace it if needed)
   * @memberof QualityMenu
   */
  filterUniqueQualities(qualities: Array<any>, currentTrack: any): Array<any> {
    const arrLength = qualities.length - 1;
    const previousTrack = qualities[arrLength];
    if (arrLength > -1 && currentTrack.label === previousTrack.label) {
      if (currentTrack.bandwidth > previousTrack.bandwidth) {
        qualities[arrLength] = currentTrack;
      }
      qualities[arrLength].active = currentTrack.active || previousTrack.active;
    } else {
      qualities.push(currentTrack);
    }
    return qualities;
  }

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof QualityMenu
   */
  render(props: any): React$Element<any> | void {
    const qualityOptions = props.videoTracks
      .sort((a, b) => {
        return a.height < b.height ? 1 : -1;
      })
      .filter(t => {
        return t.bandwidth || t.height;
      })
      .reduce(this.filterUniqueQualities, [])
      .map(t => ({
        label: t.label,
        active: !props.player.isAdaptiveBitrateEnabled() && t.active,
        value: t,
        badgeType: getLabelBadgeType(t.height)
      }));

    // Progressive playback doesn't support auto
    if (qualityOptions.length > 1 && props.player.streamType !== 'progressive') {
      const activeTrack: Object = qualityOptions.find(track => track.value.active === true)?.value;
      const label = activeTrack?.label || `${DEFAULT_VIDEO_TRACK}p`;
      let qualityLabel;
      if (rtlLanguages.includes(this.props.player._localPlayer._config.ui.locale)) {
        qualityLabel = label + ' - ' + this.props.qualityAutoLabelText;
      } else {
        qualityLabel = this.props.qualityAutoLabelText + ' - ' + label;
      }
      qualityOptions.unshift({
        label: this.props.qualityAutoLabelText,
        dropdownOptions: {
          label: qualityLabel,
          badgeType: getLabelBadgeType(activeTrack?.height || DEFAULT_VIDEO_TRACK)
        },
        active: props.player.isAdaptiveBitrateEnabled(),
        value: 'auto'
      });
    }

    return (
      <SmartContainerItem
        pushRef={el => {
          props.pushRef(el);
        }}
        icon={IconType.Quality}
        label={props.qualityLabelText}
        options={qualityOptions}
        onMenuChosen={o => this.onQualityChange(o)}
      />
    );
  }
}

QualityMenu.displayName = COMPONENT_NAME;
export {QualityMenu, HeightResolution, getLabelBadgeType};
