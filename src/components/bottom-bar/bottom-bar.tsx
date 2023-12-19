import style from '../../styles/style.scss';
import {h, Component, createRef, RefObject} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'react-redux';
import {PlayerArea} from '../../components/player-area';
import {PLAYER_BREAK_POINTS} from '../../components';
import {withEventManager} from '../../event';
import {withPlayer} from '../player';
import {calculateControlsSize, filterControlsByPriority} from './bettom-bar-utils';

const LOWER_PRIORITY_CONTROLS: string[][] = [['VrStereo'], ['Rewind', 'Forward'], ['ClosedCaptions'], ['PictureInPicture'], ['Cast']];
const CRL_WIDTH = 32;
const CRL_MARGIN = 12;

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
@connect(mapStateToProps, bindActions(actions))
class BottomBar extends Component<any, any> {
  bottomBarContainerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  presetControls: {[controlName: string]: boolean} = {};
  currentBarWidth: number = 0;
  resizeObserver!: ResizeObserver;

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
  }

  /**
   * when component did update
   *
   * @returns {void}
   * @memberof BottomBar
   */
  componentDidMount(): void {
    this.resizeObserver = new ResizeObserver((entry: ResizeObserverEntry[]) => this.onBarWidthChange(entry));
    this.resizeObserver.observe(this.bottomBarContainerRef.current!);
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

  onToggleControl = (controlName: string, isActive: boolean): void => {
    if (controlName in this.state.activeControls && this.state.activeControls[controlName] !== isActive) {
      this.setState(state => ({activeControls: {...state.activeControls, ...{[controlName]: isActive}}}));
    }
  };

  // eslint-disable-next-line require-jsdoc
  filterControls(currentBarWidth: number, currentMinBreakPointWidth: number, currentControlWidth: number, lowerPriorityControls: string[][]): void {
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
  render(props: any) {
    const styleClass = [style.bottomBar];
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }

    return (
      <div className={styleClass.join(' ')}>
        <div className={style.bottomBarArea}>
          <PlayerArea shouldUpdate={true} name={'BottomBar'}>
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
