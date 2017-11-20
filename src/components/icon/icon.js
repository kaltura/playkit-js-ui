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
  VolumeMute: 'volume-mute',
  Close: 'close',
  Share: 'share',
  Settings: 'settings',
  Check: 'check',
  Language: 'language',
  Quality: 'quality',
  Captions: 'captions',
  Speed: 'speed',
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
  Rewind: 'rewind',
  Rewind10: 'rewind10'
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
    switch (props.type) {
      case IconType.Maximize:
        return (<i className={[style.icon, style.iconMaximize].join(' ')}/>);

      case IconType.Minimize:
        return (<i className={[style.icon, style.iconMinimize].join(' ')}/>);

      case IconType.Play:
        return (<i className={[style.icon, style.iconPlay].join(' ')}/>);

      case IconType.Pause:
        return (<i className={[style.icon, style.iconPause].join(' ')}/>);

      case IconType.VolumeBase:
        return (<i className={[style.icon, style.iconVolumeBase].join(' ')}/>);

      case IconType.VolumeWaves:
        return (<i className={[style.icon, style.iconVolumeWaves].join(' ')}/>);

      case IconType.VolumeMute:
        return (<i className={[style.icon, style.iconVolumeMute].join(' ')}/>);

      case IconType.Close:
        return (<i className={[style.icon, style.iconClose].join(' ')}/>);

      case IconType.Share:
        return (<i className={[style.icon, style.iconShare].join(' ')}/>);

      case IconType.Settings:
        return (<i className={[style.icon, style.iconSettings].join(' ')}/>);

      case IconType.Check:
        return (<i className={[style.icon, style.iconCheck].join(' ')}/>);

      case IconType.Language:
        return (<i className={[style.icon, style.iconLanguage].join(' ')}/>);

      case IconType.Quality:
        return (<i className={[style.icon, style.iconQuality].join(' ')}/>);

      case IconType.Captions:
        return (<i className={[style.icon, style.iconCaptions].join(' ')}/>);

      case IconType.Speed:
        return (<i className={[style.icon, style.iconSpeed].join(' ')}/>);

      case IconType.Audio:
        return (<i className={[style.icon, style.iconAudio].join(' ')}/>);

      case IconType.Copy:
        return (<i className={[style.icon, style.iconCopy].join(' ')}/>);

      case IconType.Facebook:
        return (<i className={[style.icon, style.iconFacebook].join(' ')}/>);

      case IconType.Twitter:
        return (<i className={[style.icon, style.iconTwitter].join(' ')}/>);

      case IconType.GooglePlus:
        return (<i className={[style.icon, style.iconGoogleplus].join(' ')}/>);

      case IconType.Linkedin:
        return (<i className={[style.icon, style.iconLinkedin].join(' ')}/>);

      case IconType.Email:
        return (<i className={[style.icon, style.iconEmail].join(' ')}/>);

      case IconType.Embed:
        return (<i className={[style.icon, style.iconEmbed].join(' ')}/>);

      case IconType.Link:
        return (<i className={[style.icon, style.iconLink].join(' ')}/>);

      case IconType.ArrowDown:
        return (<i className={[style.icon, style.iconArrowDown].join(' ')}/>);

      case IconType.StartOver:
        return (<i className={[style.icon, style.iconStartOver].join(' ')}/>);

      case IconType.Rewind:
        return (<i className={[style.icon, style.iconRewind].join(' ')}/>);

      case IconType.Rewind10:
        return (<i className={[style.icon, style.iconRewind10].join(' ')}/>);

      default:
        break;
    }
  }
}

export default Icon;
export {IconType};
