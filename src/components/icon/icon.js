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
  Rewind10: 'rewind10',
  Forward: 'forward',
  Forward10: 'forward10',
  vrStereo: 'vr-stereo',
  vrStereoFull: 'vr-stereo-full',
  Cast: 'cast',
  CastBrand: 'cast-brand',
  Next: 'next',
  Prev: 'prev',
  PictureInPictureStart: 'picture-in-picture-start',
  PictureInPictureStop: 'picture-in-picture-stop'
};

const IconState: {[state: string]: number} = {
  INACTIVE: 0,
  ACTIVE: 1
};

/**
 * Icon component
 *
 * @class Icon
 * @example <Icon type={IconType.Play} />
 * @extends {Component}
 */
class Icon extends Component {
  _defaultColor: string = style.white;
  _activeColor: string = style.brandColor;
  _className: string = '';

  /**
   * @constructor
   * @param {Object} props - component props
   */
  constructor(props: Object) {
    super(props);
    const {path, id} = props;
    if (path && id) {
      this._className = `playkit-icon-${id}`;
      // Avoid from override existing classes
      if (!document.getElementsByClassName(this._className).length) {
        this.createDynamicIconClass(props);
      }
    }
  }

  /**
   * Creates a dynamic icon class with background image settings
   *
   * @param {Object} props - component props
   * @returns {void}
   * @memberof Icon
   */
  createDynamicIconClass = (props: Object) => {
    const {path, state, color, activeColor} = props;
    const fillColor = this.getFillColor(state, color, activeColor);
    const pathTag = this.getPathTag(path, fillColor);
    const svgUrl = this.getSVGUrl(pathTag);
    const css = `.${this._className} { background-image: ${svgUrl}; }`;
    const style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    style.appendChild(document.createTextNode(css));
  };

  /**
   * Generates the encoded svg url for a certain svg path
   *
   * @param {string} path - svg path
   * @returns {string} - encoded svg url
   * @memberof Icon
   */
  getSVGUrl = (path: string): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="36" height="36">${path}</svg>`;
    const slice = 2000;
    const loops = Math.ceil(svg.length / slice);
    let index = 0;
    let encoded = '';
    for (let i = 0; i < loops; i++) {
      let chunk = svg.slice(index, index + slice - 1);
      chunk = chunk.split('"').join("'");
      chunk = chunk.split('%').join('%25');
      chunk = chunk.split('&').join('%26');
      chunk = chunk.split('#').join('%23');
      chunk = chunk.split('{').join('%7B');
      chunk = chunk.split('}').join('%7D');
      chunk = chunk.split('<').join('%3C');
      chunk = chunk.split('>').join('%3E');
      encoded = `${encoded}${chunk}`;
      index += slice;
    }
    return `url("data:image/svg+xml,${encoded}")`;
  };

  /**
   * @param {?number} state - icon state
   * @param {?string} color - external default color
   * @param {?string} activeColor - external active color
   * @returns {string} - svg fill color
   * @memberof Icon
   */
  getFillColor = (state: ?number, color: ?string, activeColor: ?string): string => {
    if (state === IconState.ACTIVE) {
      return activeColor || this._activeColor;
    }
    return color || this._defaultColor;
  };

  /**
   * @param {string | Array<string>} path - svg path or paths (if an icon contains multiple paths)
   * @param {string} fillColor - icon fill color
   * @returns {string} - icon path tag
   * @memberof Icon
   */
  getPathTag = (path: string | Array<string>, fillColor: string): string => {
    if (typeof path === 'string') {
      path = [path];
    }
    return path.map(p => `<path fill="${fillColor}" d="${p}"/>`).join(' ');
  };

  /**
   * component will update
   * @param {Object} nextProps - the next props
   * @memberof Icon
   * @return {void}
   */
  componentWillUpdate(nextProps: Object) {
    if (this._className && this.props.state !== nextProps.state) {
      // Override icon class with the new state color
      this.createDynamicIconClass(nextProps);
    }
  }

  /**
   * render icon based on props.type
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Icon
   */
  render(props: any): React$Element<any> | void {
    if (this._className) {
      return <i className={[style.icon, this._className].join(' ')} />;
    } else {
      switch (props.type) {
        case IconType.Maximize:
          return <i className={[style.icon, style.iconMaximize].join(' ')} />;

        case IconType.Minimize:
          return <i className={[style.icon, style.iconMinimize].join(' ')} />;

        case IconType.Play:
          return <i className={[style.icon, style.iconPlay].join(' ')} />;

        case IconType.Pause:
          return <i className={[style.icon, style.iconPause].join(' ')} />;

        case IconType.VolumeBase:
          return <i className={[style.icon, style.iconVolumeBase].join(' ')} />;

        case IconType.VolumeWaves:
          return <i className={[style.icon, style.iconVolumeWaves].join(' ')} />;

        case IconType.VolumeWave:
          return <i className={[style.icon, style.iconVolumeWave].join(' ')} />;

        case IconType.VolumeMute:
          return <i className={[style.icon, style.iconVolumeMute].join(' ')} />;

        case IconType.Close:
          return <i className={[style.icon, style.iconClose].join(' ')} />;

        case IconType.Share:
          return <i className={[style.icon, style.iconShare].join(' ')} />;

        case IconType.Settings:
          return <i className={[style.icon, style.iconSettings].join(' ')} />;

        case IconType.Check:
          return <i className={[style.icon, style.iconCheck].join(' ')} />;

        case IconType.Language:
          return <i className={[style.icon, style.iconLanguage].join(' ')} />;

        case IconType.Quality:
          return <i className={[style.icon, style.iconQuality].join(' ')} />;

        case IconType.Captions:
          return <i className={[style.icon, style.iconCaptions].join(' ')} />;

        case IconType.Speed:
          return <i className={[style.icon, style.iconSpeed].join(' ')} />;

        case IconType.SpeedDown:
          return <i className={[style.icon, style.iconSpeedDown].join(' ')} />;

        case IconType.SpeedUp:
          return <i className={[style.icon, style.iconSpeedUp].join(' ')} />;

        case IconType.Audio:
          return <i className={[style.icon, style.iconAudio].join(' ')} />;

        case IconType.Copy:
          return <i className={[style.icon, style.iconCopy].join(' ')} />;

        case IconType.Facebook:
          return <i className={[style.icon, style.iconFacebook].join(' ')} />;

        case IconType.Twitter:
          return <i className={[style.icon, style.iconTwitter].join(' ')} />;

        case IconType.GooglePlus:
          return <i className={[style.icon, style.iconGooglePlus].join(' ')} />;

        case IconType.Linkedin:
          return <i className={[style.icon, style.iconLinkedin].join(' ')} />;

        case IconType.Email:
          return <i className={[style.icon, style.iconEmail].join(' ')} />;

        case IconType.Embed:
          return <i className={[style.icon, style.iconEmbed].join(' ')} />;

        case IconType.Link:
          return <i className={[style.icon, style.iconLink].join(' ')} />;

        case IconType.ArrowDown:
          return <i className={[style.icon, style.iconArrowDown].join(' ')} />;

        case IconType.StartOver:
          return <i className={[style.icon, style.iconStartOver].join(' ')} />;

        case IconType.SeekEnd:
          return <i className={[style.icon, style.iconSeekEnd].join(' ')} />;

        case IconType.Rewind:
          return <i className={[style.icon, style.iconRewind].join(' ')} />;

        case IconType.Rewind10:
          return <i className={[style.icon, style.iconRewind10].join(' ')} />;

        case IconType.Forward:
          return <i className={[style.icon, style.iconForward].join(' ')} />;

        case IconType.Forward10:
          return <i className={[style.icon, style.iconForward10].join(' ')} />;

        case IconType.vrStereo:
          return <i className={[style.icon, style.iconVrStereo].join(' ')} />;

        case IconType.vrStereoFull:
          return <i className={[style.icon, style.iconVrStereoFull].join(' ')} />;

        case IconType.Cast:
          return <i className={[style.icon, style.iconChromecast].join(' ')} />;

        case IconType.CastBrand:
          return <i className={[style.icon, style.iconChromecastBrand].join(' ')} />;

        case IconType.Next:
          return <i className={[style.icon, style.iconNext].join(' ')} />;

        case IconType.Prev:
          return <i className={[style.icon, style.iconPrev].join(' ')} />;

        case IconType.PictureInPictureStart:
          return <i className={[style.icon, style.iconPictureInPictureStart].join(' ')} />;

        case IconType.PictureInPictureStop:
          return <i className={[style.icon, style.iconPictureInPictureStop].join(' ')} />;

        default:
          break;
      }
    }
  }
}

export default Icon;
export {Icon, IconType, IconState};
