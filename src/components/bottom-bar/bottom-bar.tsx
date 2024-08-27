import style from '../../styles/style.scss';
import {h, Component, createRef, RefObject} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {actions as bottomBarActions} from '../../reducers/bottom-bar';
import {connect} from 'react-redux';
import {PlayerArea} from '../../components/player-area';
import {PLAYER_BREAK_POINTS, TimeDisplayPlaybackContainer} from '../../components';
import {withEventManager} from '../../event';
import {withPlayer} from '../player';
import {filterControlsByPriority} from './bottom-bar-utils';
import {BottomBarRegistryManager, bottomBarRegistryManager} from './bottom-bar-registry-manager';

const LOWER_PRIORITY_CONTROLS: string[][] = [
  ['PictureInPicture'],
  ['VrStereo'],
  ['TimeDisplayPlaybackContainer'],
  ['AdvancedAudioDesc'],
  ['ClosedCaptions'],
  ['CaptionsControl'],
  ['Cast']
];
const CRL_WIDTH = 32;
const CRL_MARGIN = 12;

const TIME_DISPLAY_COMP: string = 'TimeDisplayPlaybackContainer';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
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
@connect(mapStateToProps, bindActions({...actions, ...bottomBarActions}))
class BottomBar extends Component<any, any> {
  bottomBarContainerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  presetControls: {[controlName: string]: boolean} = {};
  currentBarWidth: number = 0;
  resizeObserver!: ResizeObserver;

  currentMinBreakPointWidth = 0;

  // eslint-disable-next-line require-jsdoc
  constructor(props: any) {
    super();
    props.leftControls = props.leftControls || [];
    props.rightControls = props.rightControls || [];

    props.leftControls
      .concat(props.rightControls)
      .map(control => control.displayName)
      .forEach(controlName => (this.presetControls[controlName] = true));
    this.state = {fitInControls: this.presetControls, activeControls: this.presetControls};
    props.player.registerService(bottomBarRegistryManager, new BottomBarRegistryManager());
  }

  /**
   * when component did update
   *
   * @returns {void}
   * @memberof BottomBar
   */
  componentDidMount(): void {
    this.resizeObserver = new ResizeObserver((entry: ResizeObserverEntry[]) => this.onBarWidthChange(entry[0]));
    this.resizeObserver.observe(this.bottomBarContainerRef.current!);
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount(): void {
    this.resizeObserver.disconnect();
  }

  private _getControlsWidth = (element: HTMLElement) => {
    return Array.from(element.childNodes).reduce((total, child: HTMLElement) => total + child.offsetWidth, 0);
  };

  // eslint-disable-next-line require-jsdoc
  onBarWidthChange(resizeObserverEntry: ResizeObserverEntry): void {
    // @ts-ignore
    if (!this.currentMinBreakPointWidth) {
      // @ts-ignore
      // this.currentMinBreakPointWidth = Object.values(barRef.target.childNodes).reduce((total, i: HTMLElement) => total + i.offsetWidth, 0));
      this.currentMinBreakPointWidth = this._getControlsWidth(resizeObserverEntry.target);
    }
    const barWidth = resizeObserverEntry.contentRect.width;
    if (barWidth !== this.currentBarWidth) {
      this.currentBarWidth = barWidth;
      const currCrlWidth = this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.SMALL ? CRL_WIDTH + CRL_MARGIN / 2 : CRL_WIDTH + CRL_MARGIN;
      const lowerPriorityControls = LOWER_PRIORITY_CONTROLS.filter(c => this.state.activeControls[c[0]]);
      this.filterControls(barWidth, this.currentMinBreakPointWidth, currCrlWidth, lowerPriorityControls);
    }
  }

  onToggleControl = (controlName: string, isActive: boolean): void => {
    if (controlName in this.state.activeControls && this.state.activeControls[controlName] !== isActive) {
      this.setState(state => ({activeControls: {...state.activeControls, ...{[controlName]: isActive}}}));
    }
  };

  // eslint-disable-next-line require-jsdoc
  filterControls(currentBarWidth: number, currentMinBreakPointWidth: number, currentControlWidth: number, lowerPriorityControls: string[][]): void {
    const isBreak = currentMinBreakPointWidth >= currentBarWidth;
    if (isBreak) {
      const controlsToRemove = filterControlsByPriority(currentMinBreakPointWidth, currentBarWidth, currentControlWidth, lowerPriorityControls);
      const removedControls = {};
      controlsToRemove.forEach(control => (removedControls[control] = false));
      this.props.updateControlsToMove(controlsToRemove);
      this.setState({fitInControls: {...this.presetControls, ...removedControls}});
    } else {
      this.setState({fitInControls: {...this.presetControls}});
      this.props.updateControlsToMove([]);
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof BottomBar
   */
  render(props: any) {
    const styleClass = [style.bottomBar];
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }

    const shouldRenderTimeDisplay: boolean = this.presetControls[TIME_DISPLAY_COMP] && !this.state.fitInControls[TIME_DISPLAY_COMP];
    return (
      <div className={styleClass.join(' ')}>
        <div className={style.bottomBarArea}>
          <PlayerArea shouldUpdate={true} name={'BottomBar'}>
            {shouldRenderTimeDisplay && <TimeDisplayPlaybackContainer />}
            {props.children}
          </PlayerArea>
        </div>
        <div ref={this.bottomBarContainerRef} className={style.controlsContainer}>
          <div className={style.leftControls}>
            <PlayerArea shouldUpdate={true} name={'BottomBarLeftControls'}>
              {props.leftControls &&
                props.leftControls.map(
                  Control =>
                    this.presetControls[Control.displayName] &&
                    this.state.fitInControls[Control.displayName] && <Control key={Control.displayName} onToggle={this.onToggleControl} />
                )}
            </PlayerArea>
          </div>
          <div className={style.rightControls}>
            <PlayerArea shouldUpdate={true} name={'BottomBarRightControls'}>
              {props.rightControls &&
                props.rightControls.map(
                  Control =>
                    this.presetControls[Control.displayName] &&
                    this.state.fitInControls[Control.displayName] && <Control key={Control.displayName} onToggle={this.onToggleControl} />
                )}
            </PlayerArea>
          </div>
        </div>
      </div>
    );
  }
}

BottomBar.displayName = COMPONENT_NAME;
export {BottomBar};
