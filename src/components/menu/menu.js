//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {BadgeType, default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withKeyboardA11y} from '../../utils/popup-keyboard-accessibility';
import {KeyMap} from 'utils/key-map';
import {withEventManager} from 'event/with-event-manager';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  guiClientRect: state.shell.guiClientRect
});

const COMPONENT_NAME = 'Menu';

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
@connect(mapStateToProps)
@withEventManager
@withKeyboardA11y
class Menu extends Component {
  state: Object;
  _menuElement: HTMLDivElement;

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
    this.props.eventManager.listen(document, 'click', this.handleClickOutside);

    if (!this.props.isMobile && !this.props.isSmallSize) {
      this.setState({position: this.getPosition()});
    }
  }

  /**
   * get menu position based on document boundaries
   *
   * @returns {Array} position style classes array
   * @memberof Menu
   */
  getPosition(): Array<string> {
    const menuElementRect = this._menuElement.getBoundingClientRect();
    const guiClientRect = this.props.guiClientRect;

    // The menu is first rendered above its label.
    // top / bottom are determined from the top of the view port, if the menus top edge is lower than the top of the
    // player it means that menu.top is bigger than player.top.
    if (menuElementRect.top >= guiClientRect.top) {
      return [style.top, style.left];
    } else if (menuElementRect.bottom + menuElementRect.height < guiClientRect.bottom) {
      // menu.bottom + menu.height is the value of the bottom edge of the menu if its rendered below the label.
      return [style.bottom, style.left];
    } else {
      // If we cannot render it on top of the label or below it, we will reduce the height of the menu to be
      // 80% of the player height and put it at the bottom of the player.
      this._menuElement.style.maxHeight = guiClientRect.height * 0.8 + 'px';
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
  handleClickOutside = (e: any) => {
    if (!this.props.isMobile && !this.props.isSmallSize && this._menuElement && !this._menuElement.contains(e.target)) {
      this.props.onClose();
    }
  };

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
    this.props.onMenuChosen(option.value);
    // Instant select
    this.props.options
      .filter(t => t.active)
      .forEach(option => {
        option.active = false;
      });
    this.props.options.filter(t => t.value === option.value)[0].active = true;
  }

  /**
   * on change handler
   * @param {Event} e - event
   * @returns {void}
   * @memberof Menu
   */
  onChange = (e: {...Event, target: HTMLInputElement}): void => {
    this.onSelect(this.props.options[e.target.value]);
  };

  /**
   * render native select element
   * @param {string} labelledby - the label id the describes the dropdown (for screen reader)
   * @returns {React$Element} - component element
   * @memberof Menu
   */
  renderNativeSelect(labelledby: string): React$Element<any> {
    let classes = this.props.hideSelect ? style.mobileHiddenSelect : '';
    classes += ` ${style.dropdown}`;
    return (
      <select
        aria-labelledby={labelledby}
        role="listbox"
        ref={el => {
          if (this.props.pushRef) {
            this.props.pushRef(el);
          }
        }}
        className={classes}
        onChange={this.onChange}>
        {this.props.options.map((o, index) => (
          <option role="option" aria-selected={this.isSelected(o) ? 'true' : ''} selected={this.isSelected(o)} value={index} key={index}>
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
    props.clearAccessibleChildren();
    return props.isMobile || props.isSmallSize ? (
      this.renderNativeSelect(props.labelledby)
    ) : (
      <div
        role="menu"
        onKeyDown={props.handleKeyDown}
        ref={c => (c ? (this._menuElement = c) : undefined)}
        className={[style.dropdownMenu, ...this.state.position].join(' ')}>
        {props.options.map((o, index) => (
          <MenuItem
            setDefaultFocusedElement={props.setDefaultFocusedElement}
            addAccessibleChild={props.addAccessibleChild}
            isSelected={this.isSelected}
            onSelect={option => {
              this.onSelect(option);
            }}
            key={index}
            data={o}
          />
        ))}
      </div>
    );
  }
}

Menu.displayName = COMPONENT_NAME;
export {Menu};

/**
 * MenuItem component to be wrapped as keyboard accessibility item
 *
 * @class MenuItem
 * @extends {Component}
 */
class MenuItem extends Component {
  /**
   * on click handler
   *
   * @param {Event} e - event
   * @returns {void}
   * @memberof MenuItem
   */
  onClick = (e: Event): void => {
    e.stopPropagation();
    this.props.onSelect(this.props.data);
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof MenuItem
   */
  onKeyDown = (e: KeyboardEvent): void => {
    switch (e.keyCode) {
      case KeyMap.ENTER:
        this.props.onSelect(this.props.data);
        e.stopPropagation();
        break;
    }
  };

  /**
   * the menu item jsx
   * @param {any} props - MenuItem props
   * @returns {React$Element<any>} - rendered jsx
   * @memberof MenuItem
   */
  render(props: any): React$Element<any> {
    const badgeType: string | null =
      props.data.badgeType && !props.isSelected(props.data) ? BadgeType[props.data.badgeType] : BadgeType[props.data.badgeType + 'Active'];
    return (
      <div
        role="menuitemradio"
        tabIndex="-1"
        aria-checked={props.isSelected(props.data) ? 'true' : 'false'}
        ref={element => {
          this.props.addAccessibleChild(element);
          if (props.isSelected(props.data)) {
            props.setDefaultFocusedElement(element);
          }
        }}
        className={props.isSelected(props.data) ? [style.dropdownMenuItem, style.active].join(' ') : style.dropdownMenuItem}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}>
        <span className={badgeType ? [style.labelBadge, badgeType].join(' ') : ''}>{props.data.label}</span>
        <span className={[style.menuIconContainer, style.active].join(' ')}>
          <Icon type={IconType.CheckActive} />
        </span>
      </div>
    );
  }
}
