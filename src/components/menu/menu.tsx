import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {BadgeType, default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withKeyboardA11y} from '../../utils';
import {KeyMap} from '../../utils';
import {withEventManager} from '../../event';
import {WithEventManagerProps} from '../../event/with-event-manager';

type OptionType = {
  value: any;
  label: string;
  ariaLabel?: string;
  active: boolean;
  disabled?: boolean;
};

type MenuProps = {
  isMobile?: boolean;
  isSmallSize?: boolean;
  guiClientRect?: DOMRect;
  topBarClientRect?: any;
  options: OptionType[];
  labelledby?: string;
  pushRef?: (HTMLElement) => void;
  onMenuChosen: (value: any) => void;
  onClose: () => void;
  hideSelect?: boolean;
  parentEl?: HTMLDivElement;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  guiClientRect: state.shell.guiClientRect,
  topBarClientRect: state.shell.topBarClientRect
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
class Menu extends Component<MenuProps & WithEventManagerProps, any> {
  private _menuElement!: HTMLDivElement;

  /**
   * before component mounted, set initial state of the menu position
   * @returns {void}
   * @memberof Menu
   */
  public componentWillMount(): void {
    this.setState({position: [style.top, style.left]});
  }

  /**
   * after component mounted, listen to click outside of the component
   * @returns {void}
   * @memberof Menu
   */
  public componentDidMount(): void {
    this.props.eventManager!.listen(document, 'click', this.handleClickOutside.bind(this));

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
  private getPosition(): Array<string> {
    const menuElementRect = this._menuElement.getBoundingClientRect();
    const guiClientRect = this.props.guiClientRect;
    const topBarClientRect = this.props.topBarClientRect;

    // The menu is first rendered above its label.
    // top / bottom are determined from the top of the view port, if the menus top edge is lower than the top of the
    // player it means that menu.top is bigger than player.top.
    if (menuElementRect.top >= topBarClientRect.bottom) {
      return [style.top, style.left];
    } else if (menuElementRect.bottom + menuElementRect.height < guiClientRect!.bottom) {
      // menu.bottom + menu.height is the value of the bottom edge of the menu if its rendered below the label.
      return [style.bottom, style.left];
    } else {
      // If we cannot render it on top of the label or below it, we will reduce the height of the menu to be
      // 80% of the player height and put it at the bottom of the player.
      this._menuElement.style.maxHeight = guiClientRect!.height - topBarClientRect.height - Number(style.bottomBarMaxHeight) + 'px';
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
  private handleClickOutside = (e: any): void => {
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
  private isSelected(option: any): boolean {
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
  private onSelect(option: OptionType): void {
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
  private onChange = (e: Event): void => {
    this.onSelect(this.props.options[(e.target as HTMLSelectElement).value]);
  };

  /**
   * render native select element
   * @param {string} labelledby - the label id the describes the dropdown (for screen reader)
   * @returns {React$Element} - component element
   * @memberof Menu
   */
  private renderNativeSelect(labelledby: string): VNode<any> {
    let classes = this.props.hideSelect ? style.mobileHiddenSelect : '';
    classes += ` ${style.dropdown}`;
    const selectedValue = this.props.options.findIndex(o => this.isSelected(o));
    return (
      <select
        aria-labelledby={labelledby}
        ref={el => {
          if (this.props.pushRef) {
            this.props.pushRef(el);
          }
        }}
        className={classes}
        value={selectedValue}
        onChange={this.onChange}>
        {this.props.options.map((o, index) => (
          <option disabled={o.disabled} value={index} key={index} aria-label={o.ariaLabel ? o.ariaLabel : o.label}>
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
  public render(props: any): VNode<any> {
    props.clearAccessibleChildren();
    return props.isMobile || props.isSmallSize ? (
      this.renderNativeSelect(props.labelledby)
    ) : (
      <div
        role="listbox"
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
            role="option"
            aria-selected={this.isSelected(o)}
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
class MenuItem extends Component<any, any> {
  /**
   * on click handler
   *
   * @param {Event} e - event
   * @returns {void}
   * @memberof MenuItem
   */
  private onClick = (e: Event): void => {
    if (this.props.data.disabled) return;

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
  private onKeyDown = (e: KeyboardEvent): void => {
    if (this.props.data.disabled) return;

    switch (e.keyCode) {
      case KeyMap.ENTER:
      case KeyMap.SPACE:
        this.props.onSelect(this.props.data);
        e.stopPropagation();
        e.preventDefault();
        break;
    }
  };

  /**
   * the menu item jsx
   * @param {any} props - MenuItem props
   * @returns {React$Element<any>} - rendered jsx
   * @memberof MenuItem
   */
  public render(props: any): VNode<any> {
    const badgeType: string | null =
      props.data.badgeType && !props.isSelected(props.data) ? BadgeType[props.data.badgeType] : BadgeType[props.data.badgeType + 'Active'];
    const ariaLabel = props.data.ariaLabel || props.data.label;

    return (
      <div
        role={props?.role}
        tabIndex={-1}
        aria-selected={props.isSelected(props.data)}
        disabled={props.data.disabled}
        ref={element => {
          this.props.addAccessibleChild(element);
          if (props.isSelected(props.data)) {
            setTimeout(() => props.setDefaultFocusedElement(element));
          }
        }}
        className={props.isSelected(props.data) ? [style.dropdownMenuItem, style.active].join(' ') : style.dropdownMenuItem}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}>
        <span
          className={badgeType ? [style.labelBadge, badgeType].join(' ') : ''}
          aria-label={badgeType?.includes('quality-hd') ? `${ariaLabel} HD` : ariaLabel}>
          {props.data.label}
        </span>
        <span className={[style.menuIconContainer, style.active].join(' ')}>
          <Icon type={IconType.CheckActive} />
        </span>
      </div>
    );
  }
}
