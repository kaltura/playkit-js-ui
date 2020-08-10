//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';

const IconType = {
  Maximize: 'maximize',
  Minimize: 'minimize',
  Play: 'play',
  Pause: 'pause',
  VolumeBase: 'volume-base',
  VolumeWaves: 'volume-waves',
  VolumeWave: 'volume-wave',
  VolumeMute: 'volume-mute',
  Close: 'close',
  Share: 'share',
  Settings: 'settings',
  Check: 'check',
  Language: 'language',
  Quality: 'quality',
  Captions: 'captions',
  Speed: 'speed',
  SpeedDown: 'speed-down',
  SpeedUp: 'speed-up',
  Audio: 'audio',
  Copy: 'copy',
  Facebook: 'facebook',
  Twitter: 'twitter',
  GooglePlus: 'google-plus',
  Linkedin: 'linkedin',
  Email: 'email',
  Embed: 'embed',
  Link: 'link',
  ArrowDown: 'arrow-down',
  StartOver: 'start-over',
  SeekEnd: 'seek-end',
  Rewind: 'rewind',
  Rewind10: 'rewind-10',
  Forward: 'forward',
  Forward10: 'forward-10',
  vrStereo: 'vr-stereo',
  vrStereoFull: 'vr-stereo-full',
  Cast: 'cast',
  CastBrand: 'cast-brand',
  Next: 'next',
  Prev: 'prev',
  PictureInPictureStart: 'picture-in-picture-start',
  PictureInPictureStop: 'picture-in-picture-stop'
};

/**
 * Icon component
 *
 * @class Icon
 * @example <Icon type={IconType.Play} />
 * @extends {Component}
 */
class Icon extends Component {
  /**
   * render icon based on props.type
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Icon
   */
  render(props: any): React$Element<any> | void {
    let classes = [style.icon, style[`icon-${props.type}`]];
    if (props.isActive) {
      classes.push(style.active);
    }
    return <i className={classes.join(' ')} />;
  }
}

export default Icon;
export {Icon, IconType};
