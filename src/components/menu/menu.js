//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {default as Icon, IconType} from '../icon';
import {connect} from 'preact-redux';
import {KeyMap} from '../../utils/key-map';
import {bindMethod} from '../../utils/bind-method';
import {PLAYER_SIZE} from '../shell/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  playerClientRect: state.shell.playerClientRect,
  playerSize: state.shell.playerSize
});

@connect(mapStateToProps)
/**
 * Menu component
 *
 * @class Menu
 * @example <Menu
 *  options={this.videoTrackOptions}
 *  onSelect={track => this.videoTrackChangeHandler(track)}
 *  onClose={() => this.onClose()}
 * />
 * @extends {Component}
 */
class Menu extends Component {
  state: Object;
  handleClickOutside: Function;
  _menuElement: any;

  /**
   * Creates an instance of Menu.
   *
   * @constructor
   * @memberof Menu
   */
  constructor() {
    super();
    this.handleClickOutside = bindMethod(this, this.handleClickOutside);
  }

  /**
   * before component mounted, set initial state of the menu position
   * @returns {void}
   * @memberof Menu
   */
  componentWillMount() {
    this.setState({position: [style.top, style.left]});
  }

  /**
   * after component mounted, listen to click outside of the component
   * @returns {void}
   * @memberof Menu
   */
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    if (!this.props.isMobile && ![PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize)) {
      this.setState({position: this.getPosition()});
    }
  }

  /**
   * before component unmount, remove the event listener
   *
   * @returns {void}
   * @memberof Menu
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  /**
   * get menu position based on document boundaries
   *
   * @returns {Array} position style classes array
   * @memberof Menu
   */
  getPosition(): Array<string> {
    const menuElementRect = this._menuElement.getBoundingClientRect();
    const playerContainerRect = this.props.playerClientRect;

    // The menu is first rendered above its label.
    // top / bottom are determined from the top of the view port, if the menus top edge is lower than the top of the
    // player it means that menu.top is bigger than player.top.
    if (menuElementRect.top >= playerContainerRect.top) {
      return [style.top, style.left];
    } else if (menuElementRect.bottom + menuElementRect.height < playerContainerRect.bottom) {
      // menu.bottom + menu.height is the value of the bottom edge of the menu if its rendered below the label.
      return [style.bottom, style.left];
    } else {
      // If we cannot render it on top of the label or below it, we will reduce the height of the menu to be
      // 80% of the player height and put it at the bottom of the player.
      this._menuElement.style.maxHeight = playerContainerRect.height * 0.8 + 'px';
      return [style.stickBottom, style.left];
    }
  }

  /**
   * handler to click outside of the component event listener.
   * if not mobile device and clicked outside the component, call the onClose callback
   *
   * @param {*} e click event
   * @returns {void}
   * @memberof Menu
   */
  handleClickOutside(e: any) {
    if (
      !this.props.isMobile &&
      ![PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize) &&
      this._menuElement &&
      !this._menuElement.contains(e.target)
    ) {
      this.props.onClose();
    }
  }

  /**
   * indication if option is active or not
   *
   * @param {Object} option option object
   * @returns {boolean} is option active boolean
   * @memberof Menu
   */
  isSelected(option: Object): boolean {
    return option.active;
  }

  /**
   * when option selected, change the active prop immediately for instant ui change
   * and call the onSelect callback with the option value
   *
   * @param {Object} option - option object
   * @returns {void}
   * @memberof Menu
   */
  onSelect(option: Object): void {
    this.props.onSelect(option.value);
    // Instant select
    this.props.options.filter(t => t.active).forEach(option => {
      option.active = false;
    });
    this.props.options.filter(t => t.value === option.value)[0].active = true;
  }

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @param {Object} o - option object
   * @returns {void}
   * @memberof Menu
   */
  onKeyDown(e: KeyboardEvent, o: Object): void {
    switch (e.keyCode) {
      case KeyMap.ENTER:
        this.onSelect(o);
        break;
      case KeyMap.ESC:
        this.props.onClose();
        e.stopPropagation();
        break;
      default:
        break;
    }
  }

  /**
   * get active option label
   *
   * @returns {string} active option label
   * @memberof Menu
   */
  getActiveOptionLabel(): string {
    let activeOptions = this.props.options.filter(t => t.active);
    return activeOptions.length > 0 ? activeOptions[0].label : this.props.options[0].label;
  }

  /**
   * render native select element
   *
   * @returns {React$Element} - component element
   * @memberof Menu
   */
  renderNativeSelect(): React$Element<any> {
    let classes = this.props.hideSelect ? style.mobileHiddenSelect : '';
    classes += ` ${style.dropdown}`;
    return (
      <select className={classes} onChange={e => this.onSelect(this.props.options[e.target.value])}>
        {this.props.options.map((o, index) => (
          <option selected={this.isSelected(o)} value={index} key={index}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  /**
   * if mobile device detected, renders the native select element.
   * otherwise, render the styled menu
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Menu
   */
  render(props: any): React$Element<any> {
    return props.isMobile || [PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize) ? (
      this.renderNativeSelect()
    ) : (
      <div ref={c => (this._menuElement = c)} className={[style.dropdownMenu, ...this.state.position].join(' ')}>
        {props.options.map((o, index) => (
          <div
            tabIndex=""
            key={index}
            className={this.isSelected(o) ? [style.dropdownMenuItem, style.active].join(' ') : style.dropdownMenuItem}
            onClick={() => this.onSelect(o)}
            onKeyDown={e => this.onKeyDown(e, o)}>
            <span>{o.label}</span>
            <span className={style.menuIconContainer} style={`opacity: ${this.isSelected(o) ? 1 : 0}`}>
              <Icon type={IconType.Check} />
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export {Menu};
