//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {NAME as packageName} from '../../index';

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
  Settings: 'settings',
  Check: 'check',
  Language: 'language',
  Quality: 'quality',
  Captions: 'captions',
  Speed: 'speed',
  SpeedDown: 'speed-down',
  SpeedUp: 'speed-up',
  Audio: 'audio',
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

const BadgeType = {
  qualityHd: `${style.badgeIcon} ${style.iconQualityHd}`,
  qualityHdActive: `${style.badgeIcon} ${style.iconQualityHdActive}`,
  quality4k: `${style.badgeIcon} ${style.iconQuality4K}`,
  quality4kActive: `${style.badgeIcon} ${style.iconQuality4KActive}`,
  quality8k: `${style.badgeIcon} ${style.iconQuality8K}`,
  quality8kActive: `${style.badgeIcon} ${style.iconQuality8KActive}`
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
      const styleSheet: any = Array.from(document.styleSheets).find((styleSheet: any) => styleSheet.ownerNode.id === packageName);
      const classCssExists = styleSheet ? Array.from(styleSheet.rules).find((rule: any) => rule.selectorText === `.${this._className}`) : false;
      if (!classCssExists) {
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
    const {path, state, color, activeColor, width, height, viewBox} = props;
    const fillColor = this.getFillColor(state, color, activeColor);
    const pathTag = this.getPathTag(path, fillColor);
    const svgUrl = this.getSVGUrl(pathTag, width, height, viewBox);
    const css = `.${this._className} { background-image: ${svgUrl}; }`;
    const style = document.getElementById(packageName);
    style && style.appendChild(document.createTextNode(css));
  };

  /**
   * Generates the encoded svg url for a certain svg path
   *
   * @param {string} path - svg path
   * @param {number} width - svg width
   * @param {number} height - svg height
   * @param {string} viewBox - svg viewBox
   * @returns {string} - encoded svg url
   * @memberof Icon
   */
  getSVGUrl = (path: string, width: number = 36, height: number = 36, viewBox: string = '0 0 1024 1024'): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${viewBox}" width="${width}" height="${height}">${path}</svg>`;
    const replaces = [
      ['"', "'"],
      ['%', '%25'],
      ['&', '%26'],
      ['#', '%23'],
      ['{', '%7B'],
      ['}', '%7D'],
      ['<', '%3C'],
      ['>', '%3E']
    ];
    const slice = 2000;
    const loops = Math.ceil(svg.length / slice);
    let index = 0;
    let encoded = '';
    for (let i = 0; i < loops; i++) {
      let chunk = svg.slice(index, index + slice - 1);
      for (let j = 0; j < replaces.length; j++) {
        chunk = chunk.split(replaces[j][0]).join(replaces[j][1]);
      }
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
   * @param {string | Array<string>} pathProps - svg path or paths (if an icon contains multiple paths)
   * @param {string} fillColor - icon fill color
   * @returns {string} - icon path tag
   * @memberof Icon
   */
  getPathTag = (pathProps: any | Array<any>, fillColor: string): string => {
    if (!Array.isArray(pathProps)) {
      pathProps = [pathProps];
    }

    return pathProps
      .map(prop => {
        const attributes = typeof prop === 'string' ? {d: prop, fill: fillColor} : {...prop, fill: fillColor};
        const parsedAttributes = Object.keys(attributes)
          .map(key => `${key}="${attributes[key]}"`)
          .join(' ');
        return `<path ${parsedAttributes} />`;
      })
      .join(' ');
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
export {Icon, IconType, BadgeType, IconState};
