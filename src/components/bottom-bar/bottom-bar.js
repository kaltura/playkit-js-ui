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
const LEFT_CONTROLS = ['PlaybackControls', 'Rewind', 'Forward', 'LiveTag', 'TimeDisplayPlaybackContainer'];
const RIGHT_CONTROLS = ['Cast', 'ClosedCaptions', 'Fullscreen', 'Logo', 'PictureInPicture', 'Settings', 'Volume', 'VrStereo'];
const CONTROLS = [...LEFT_CONTROLS, ...RIGHT_CONTROLS];
const SPACE_BETWEEN_BARS = 16;
const LOWER_PRIORITY_CONTROLS = [['VrStereo'], ['Rewind', 'Forward'], ['ClosedCaptions'], ['PictureInPicture'], ['Cast']];
const CONTROL_WIDTH = 32;
const CONTROL_MARGIN = 12;
const CONTROL_TOTAL_WIDTH = CONTROL_WIDTH + CONTROL_MARGIN;
const SPATIAL_CONTROLS = {TimeDisplayPlaybackContainer: 107};

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
  playbackControlsWidth: number;
  minBreakPointWidth: number;
  currentBarWidth: number = 0;

  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super();
    [...props.leftControls, ...props.rightControls].forEach(controlName => (this.presetControls[controlName] = true));
    this.state = {
      currentMinBreakPointWidth: Infinity,
      fitInControls: this.presetControls,
      activeControls: this.presetControls
    };
  }

  /**
   * when component did update
   *
   * @returns {void}
   * @memberof BottomBar
   */
  componentDidMount(): void {
    const {totalWidth, playbackControlsWidth} = this.calculateControlsSize([...this.props.rightControls, ...this.props.leftControls]);
    this.minBreakPointWidth = totalWidth;
    this.playbackControlsWidth = playbackControlsWidth;
    this.setState({currentMinBreakPointWidth: totalWidth + SPACE_BETWEEN_BARS});

    const resizeObserver = new ResizeObserver(entry => {
      const newWidth = entry[0].contentRect.width;
      if (newWidth !== this.currentBarWidth) {
        // eslint-disable-next-line no-console
        console.log(`The width of the div changed to ${newWidth}px`);
        this.currentBarWidth = newWidth;
        this.reorderControls(newWidth);
      }
    });
    // Start observing the div for changes in its size
    resizeObserver.observe(this.bottomBarContainerRef.current);
  }

  // eslint-disable-next-line require-jsdoc
  componentDidUpdate(prevProps): void {
    if (prevProps.playerSize !== this.props.playerSize)
      if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.SMALL) {
        this.setState({
          currentMinBreakPointWidth:
            this.minBreakPointWidth +
            SPACE_BETWEEN_BARS -
            this.playbackControlsWidth -
            (CONTROL_MARGIN / 2) * ([...this.props.leftControls, ...this.props.rightControls].length - 2)
        });
      } else {
        this.setState({currentMinBreakPointWidth: this.minBreakPointWidth + SPACE_BETWEEN_BARS});
      }
  }

  onToggleControl = (controlName, isActive): void => {
    if (controlName in this.state.activeControls && this.state.activeControls[controlName] !== isActive) {
      this.setState(state => ({activeControls: {...state.activeControls, ...{[controlName]: isActive}}}));
    }
  };

  // eslint-disable-next-line require-jsdoc
  reorderControls(currentBarWidth): void {
    const isBreak = this.state.currentMinBreakPointWidth >= currentBarWidth;
    if (isBreak) {
      const controlsToRemove = this.filterControlsByPriority(this.state.currentMinBreakPointWidth, currentBarWidth);
      const removedControls = {};
      controlsToRemove.forEach(control => (removedControls[control] = false));
      this.setState({fitInControls: {...this.presetControls, ...removedControls}});
    } else {
      this.setState({fitInControls: {...this.presetControls}});
    }
  }

  // eslint-disable-next-line require-jsdoc
  filterControlsByPriority(currentMinBreakPointWidth: number, currentBarWidth: number): number {
    const lowerPriorityControls = [...LOWER_PRIORITY_CONTROLS];
    let controlsToRemove = [];
    let ffff = Object.entries(this.state.activeControls).filter(active => !active[1]);
    let ggg = Object.entries(this.state.fitInControls).filter(active => !active[1]);
    // eslint-disable-next-line no-console
    console.log('###', [...ffff], [...ggg]);
    let newWidth = currentMinBreakPointWidth;
    let index = 0;
    while (newWidth >= currentBarWidth && index < lowerPriorityControls.length) {
      let reducedWidth = 0;
      lowerPriorityControls[index].forEach((control, subIndex) => {
        controlsToRemove.push(control);
        reducedWidth += CONTROL_TOTAL_WIDTH;
        if (subIndex > 0) {
          let restoredControl = controlsToRemove[index - subIndex];
          if (typeof restoredControl === 'string') {
            reducedWidth -= CONTROL_TOTAL_WIDTH;
            controlsToRemove.splice(index - subIndex, 1);
            lowerPriorityControls.splice(index + 1, 0, [restoredControl]);
          }
        }
      });
      newWidth -= reducedWidth;
      index++;
    }
    return controlsToRemove;
  }

  // eslint-disable-next-line require-jsdoc
  calculateControlsSize(controls: strign[]): {totalWidth: number, playbackControlsWidth: number} {
    let totalWidth = 0;
    let playbackControlsWidth = CONTROL_TOTAL_WIDTH;
    let controlWidth = 0;
    for (let control of controls) {
      if (control in SPATIAL_CONTROLS) {
        controlWidth = SPATIAL_CONTROLS[control];
      } else if (control === 'PlaybackControls' && this.props.playlist) {
        controlWidth = CONTROL_TOTAL_WIDTH * 3;
        playbackControlsWidth = controlWidth;
      } else {
        controlWidth = CONTROL_TOTAL_WIDTH;
      }
      totalWidth += controlWidth;
    }
    return {totalWidth, playbackControlsWidth};
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
            {showRewind && <Rewind step={10} onToggle={this.onToggleControl} />}
            {showForward && <Forward step={10} onToggle={this.onToggleControl} />}
            {showTimeDisplay && <TimeDisplayPlaybackContainer format="current / total" onToggle={this.onToggleControl} />}
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
