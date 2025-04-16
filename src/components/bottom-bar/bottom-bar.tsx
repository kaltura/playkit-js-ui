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
import {BottomBarClientRectEvent} from '../../event/events/bottom-bar-client-rect-event';

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
  playlist: state.engine.playlist,
  overlayOpen: state.overlay.isOpen
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
  private bottomBarContainerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  private presetControls: {[controlName: string]: boolean} = {};
  private resizeObserver!: ResizeObserver;

  private _currBarWidthArr = [0, 0];
  private _maxControlsWidthArr = [0, 0];

  private _isFullscreenModeChanging = false;

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

    let fullscreenChangeTimeout: number | null = null;
    const onFullscreenChange = (): void => {
      this._isFullscreenModeChanging = true;

      if (fullscreenChangeTimeout) {
        clearTimeout(fullscreenChangeTimeout);
      }

      fullscreenChangeTimeout = setTimeout(() => {
        this._isFullscreenModeChanging = false;
        this.onBarWidthChange(true);
        fullscreenChangeTimeout = null;
      }, 100) as unknown as number;
    };

    props.eventManager.listen(props.player, props.player.Event.Core.ENTER_FULLSCREEN, onFullscreenChange);
    props.eventManager.listen(props.player, props.player.Event.Core.EXIT_FULLSCREEN, onFullscreenChange);
  }

  /**
   * when component did update
   *
   * @returns {void}
   * @memberof BottomBar
   */
  public componentDidMount(): void {
    this.resizeObserver = new ResizeObserver(() => this.onBarWidthChange(false));
    this.resizeObserver.observe(this.bottomBarContainerRef.current!);
  }

  // eslint-disable-next-line require-jsdoc
  public componentWillUnmount(): void {
    this.resizeObserver.disconnect();
    this._currBarWidthArr = [0, 0];
    this._maxControlsWidthArr = [0, 0];
    this._isFullscreenModeChanging = false;
  }

  private _getControlsWidth = (): number => {
    return Array.from(this.bottomBarContainerRef.current!.childNodes).reduce((total, child: HTMLElement) => total + child.offsetWidth, 0);
  };

  // eslint-disable-next-line require-jsdoc
  private onBarWidthChange(shouldRecalculate: boolean): void {
    if (this._isFullscreenModeChanging) return;

    const {player} = this.props;

    const barWidth = this.bottomBarContainerRef.current?.offsetWidth || 0;
    const currentControlsWidth = this._getControlsWidth();

    this.setMaxControlsWidth(player.isFullscreen(), Math.max(this.getMaxControlsWidth(player.isFullscreen()), currentControlsWidth));

    if (shouldRecalculate || barWidth !== this.getCurrentBarWidth(player.isFullscreen())) {
      player.dispatchEvent(new BottomBarClientRectEvent());
      this.setCurrentBarWidth(player.isFullscreen(), barWidth);
      const currCrlWidth = this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.SMALL ? CRL_WIDTH + CRL_MARGIN / 2 : CRL_WIDTH + CRL_MARGIN;
      const lowerPriorityControls = LOWER_PRIORITY_CONTROLS.filter(c => this.state.activeControls[c[0]]);
      this.filterControls(barWidth, this.getMaxControlsWidth(player.isFullscreen()), currCrlWidth, lowerPriorityControls);
    }
  }

  private getMaxControlsWidth(isFullscreen: boolean): number {
    return this._maxControlsWidthArr[Number(isFullscreen)];
  }

  private setMaxControlsWidth(isFullscreen: boolean, maxControlsWidth: number): void {
    this._maxControlsWidthArr[Number(isFullscreen)] = maxControlsWidth;
  }

  private getCurrentBarWidth(isFullscreen: boolean): number {
    return this._currBarWidthArr[Number(isFullscreen)];
  }

  private setCurrentBarWidth(isFullscreen: boolean, barWidth: number): void {
    this._currBarWidthArr[Number(isFullscreen)] = barWidth;
  }

  private onToggleControl = (controlName: string, isActive: boolean): void => {
    if (controlName in this.state.activeControls && this.state.activeControls[controlName] !== isActive) {
      this.setState(state => ({activeControls: {...state.activeControls, ...{[controlName]: isActive}}}));
    }
  };

  // eslint-disable-next-line require-jsdoc
  private filterControls(
    currentBarWidth: number,
    currentMinBreakPointWidth: number,
    currentControlWidth: number,
    lowerPriorityControls: string[][]
  ): void {
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
  public render(props: any): any {
    const styleClass = [style.bottomBar];
    if ((props.isCasting && props.isPlaybackEnded) || props.overlayOpen) {
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
          <PlayerArea shouldUpdate={true} name={'BottomBarCenterControls'} />
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
