//@flow
import style from '../../styles/style.scss';
import {h, Component, createRef, RefObject} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';
import {
  Cast,
  ClosedCaptions,
  Forward,
  Fullscreen,
  LiveTag,
  Logo,
  PictureInPicture,
  PlaybackControls,
  PLAYER_BREAK_POINTS,
  Rewind,
  Settings,
  TimeDisplayPlaybackContainer,
  Volume,
  VrStereo
} from 'components';
import {withEventManager} from 'event';
import {withPlayer} from '../player';
import {calculateControlsSize, filterControlsByPriority} from './bettom-bar-utils';

const LOWER_PRIORITY_CONTROLS = [['VrStereo'], ['Rewind', 'Forward'], ['ClosedCaptions'], ['PictureInPicture'], ['Cast']];
const CRL_WIDTH = 32;
const CRL_MARGIN = 12;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isMobile: state.shell.isMobile,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  guiClientRect: state.shell.guiClientRect,
  playerSize: state.shell.playerSize,
  playlist: state.engine.playlist
});

const COMPONENT_NAME = 'BottomBar';

// eslint-disable-next-line valid-jsdoc
/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
@withPlayer
@withEventManager
@connect(mapStateToProps, bindActions(actions))
class BottomBar extends Component {
  bottomBarContainerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  presetControls: {[controlName: string]: boolean} = {};
  minBreakPointWidth: number;
  currentBarWidth: number = 0;
  resizeObserver: ResizeObserver;

  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super();
    props.leftControls.concat(props.rightControls).forEach(controlName => (this.presetControls[controlName] = true));
    this.state = {fitInControls: this.presetControls, activeControls: this.presetControls};
  }

  /**
   * when component did update
   *
   * @returns {void}
   * @memberof BottomBar
   */
  componentDidMount(): void {
    this.resizeObserver = new ResizeObserver((entry: ResizeObserverEntry[]) => this.onBarWidthChange(entry));
    this.resizeObserver.observe(this.bottomBarContainerRef.current);
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount(): void {
    this.resizeObserver.disconnect();
  }

  // eslint-disable-next-line require-jsdoc
  onBarWidthChange(entry: ResizeObserverEntry[]): void {
    const barWidth = entry[0].contentRect.width;
    if (barWidth !== this.currentBarWidth) {
      const activeControls = Object.keys(this.state.activeControls).filter(c => this.state.activeControls[c]);
      const currCrlWidth = this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.SMALL ? CRL_WIDTH + CRL_MARGIN / 2 : CRL_WIDTH + CRL_MARGIN;
      const currentMinBreakPointWidth = calculateControlsSize(activeControls, currCrlWidth, this.props.guiClientRect.width, this.props.playlist);
      const lowerPriorityControls = LOWER_PRIORITY_CONTROLS.filter(c => this.state.activeControls[c[0]]);
      this.currentBarWidth = barWidth;
      this.filterControls(barWidth, currentMinBreakPointWidth, currCrlWidth, lowerPriorityControls);
    }
  }

  onToggleControl = (controlName, isActive): void => {
    if (controlName in this.state.activeControls && this.state.activeControls[controlName] !== isActive) {
      this.setState(state => ({activeControls: {...state.activeControls, ...{[controlName]: isActive}}}));
    }
  };

  // eslint-disable-next-line require-jsdoc
  filterControls(currentBarWidth: number, currentMinBreakPointWidth: number, currentControlWidth: number, lowerPriorityControls: string[]): void {
    // move up
    const isBreak = currentMinBreakPointWidth >= currentBarWidth;
    if (isBreak) {
      const controlsToRemove = filterControlsByPriority(currentMinBreakPointWidth, currentBarWidth, currentControlWidth, lowerPriorityControls);
      const removedControls = {};
      controlsToRemove.forEach(control => (removedControls[control] = false));
      this.setState({fitInControls: {...this.presetControls, ...removedControls}});
    } else {
      this.setState({fitInControls: {...this.presetControls}});
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof BottomBar
   */
  render(props: any): ?React$Element<any> {
    const styleClass = [style.bottomBar];
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }
    // Left Controls
    const showPlaybackControls = this.presetControls[PlaybackControls.displayName] && this.state.fitInControls.PlaybackControls;
    const showRewind = this.presetControls[Rewind.displayName] && this.state.fitInControls.Rewind;
    const showForward = this.presetControls[Forward.displayName] && this.state.fitInControls.Forward;
    const showLiveTag = this.presetControls[LiveTag.displayName] && this.state.fitInControls.LiveTag;
    const showTimeDisplay = this.presetControls[TimeDisplayPlaybackContainer.displayName] && this.state.fitInControls.TimeDisplayPlaybackContainer;

    // Right Controls
    const showVrStereo = this.presetControls[VrStereo.displayName] && this.state.fitInControls.VrStereo;
    const showVolume = this.presetControls[Volume.displayName] && this.state.fitInControls.Volume;
    const showClosedCaptions = this.presetControls[ClosedCaptions.displayName] && this.state.fitInControls.ClosedCaptions;
    const showSettings = this.presetControls[Settings.displayName] && this.state.fitInControls.Settings;
    const showCast = this.presetControls[Cast.displayName] && this.state.fitInControls.Cast;
    const showPIP = this.presetControls[PictureInPicture.displayName] && this.state.fitInControls.PictureInPicture;
    const showFullscreen = this.presetControls[Fullscreen.displayName] && this.state.fitInControls.Fullscreen;
    const showLogo = this.presetControls[Logo.displayName] && this.state.fitInControls.Logo;

    return (
      <div className={styleClass.join(' ')}>
        <div className={style.bottomBarArea}>
          <PlayerArea name={'BottomBar'}>{props.children}</PlayerArea>
        </div>
        <div ref={this.bottomBarContainerRef} style={{display: 'flex', justifyContent: 'space-between', overflow: 'hidden'}}>
          <div className={style.leftControls}>
            {/*<PlayerArea name={'BottomBarLeftControls'}>*/}
            {showPlaybackControls && <PlaybackControls name={'BottomBarPlaybackControls'} showPreview={true} />}
            {showRewind && <Rewind onToggle={this.onToggleControl} />}
            {showForward && <Forward onToggle={this.onToggleControl} />}
            {showTimeDisplay && <TimeDisplayPlaybackContainer onToggle={this.onToggleControl} />}
            {showLiveTag && <LiveTag onToggle={this.onToggleControl} />}
            {/*</PlayerArea>*/}
          </div>
          <div className={style.rightControls}>
            {/*<PlayerArea name={'BottomBarRightControls'}>*/}
            {showVrStereo && <VrStereo onToggle={this.onToggleControl} />}
            {showVolume && <Volume onToggle={this.onToggleControl} />}
            {showClosedCaptions && <ClosedCaptions onToggle={this.onToggleControl} />}
            {showSettings && <Settings onToggle={this.onToggleControl} />}
            {showCast && <Cast onToggle={this.onToggleControl} />}
            {showPIP && <PictureInPicture onToggle={this.onToggleControl} />}
            {showFullscreen && <Fullscreen onToggle={this.onToggleControl} />}
            {showLogo && <Logo onToggle={this.onToggleControl} />}
            {/*</PlayerArea>*/}
          </div>
        </div>
      </div>
    );
  }
}

BottomBar.displayName = COMPONENT_NAME;
export {BottomBar};
