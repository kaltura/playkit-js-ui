//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {Menu} from '../menu';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {PLAYER_SIZE} from '../shell/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  playerSize: state.shell.playerSize
});

@connect(mapStateToProps)
/**
 * DropDown component
 *
 * @class DropDown
 * @example <DropDown options={this.videoTrackOptions} />
 * @extends {Component}
 */
class DropDown extends Component {
  state: Object;
  _el: HTMLDivElement;
  _dropdownButton: HTMLDivElement;

  /**
   * before component mounted, set initial internal state
   *
   * @returns {void}
   * @memberof DropDown
   */
  componentWillMount() {
    this.onClose();
  }

  componentWillUpdate(newProps): void {
    if (newProps.parentClicked) {
      newProps.onParentClickedDone();
      this.toggleMenu();
    }
  }

  /**
   * is given option selected
   *
   * @param {Object} option - option object
   * @returns {boolean} - is the option selected
   * @memberof DropDown
   */
  isSelected(option: Object): boolean {
    return option.active;
  }

  /**
   * on option select - pass the selected option to upper component through props and close the menu
   *
   * @param {Object} option - option object
   * @returns {void}
   * @memberof DropDown
   */
  onSelect(option: Object): void {
    this.props.onSelect(option);
    this.onClose();
  }

  /**
   * on key down handler - on enter open toggle drop down menu
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof DropDown
   */
  onKeyDown(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case KeyMap.ENTER:
        this.toggleMenu();
        break;
      case KeyMap.ESC:
        this.onClose();
        e.stopPropagation();
        break;
    }
  }

  toggleMenu(): void {
    this.setState({dropMenuActive: !this.state.dropMenuActive});
    if (!this.state.dropMenuActive) {
      this.props.onDropdownClosed();
    }
  }

  /**
   * listener function from Menu component to close the dropdown menu.
   * set the internal state of dropMenuActive to false.
   *
   * @returns {void}
   * @memberof DropDown
   */
  onClose(): void {
    this.setState({dropMenuActive: false});
    this.props.onDropdownClosed();
  }

  /**
   * get active option label or first option's label
   *
   * @returns {string} - active option label
   * @memberof DropDown
   */
  getActiveOptionLabel(): string {
    let activeOptions = this.props.options.filter(t => t.active);
    try {
      return activeOptions[0].label;
    } catch (e) {
      return this.props.options[0].label || 'Unlabled';
    }
  }

  /**
   * render for menu only which will render a native select element in this case (mobile)
   *
   * @returns {React$Element} - component element
   * @memberof DropDown
   */
  renderNativeSelect(): React$Element<any> {
    return <Menu options={this.props.options} onSelect={o => this.onSelect(o)} onClose={() => this.onClose()} />;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof DropDown
   */
  render(props: any): React$Element<any> {
    return props.isMobile || [PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize) ? (
      this.renderNativeSelect()
    ) : (
      <div
        name={props.name}
        className={this.state.dropMenuActive ? [style.dropdown, style.active].join(' ') : style.dropdown}
        ref={el => (this._el = el)}>
        <div
          className={style.dropdownButton}
          onClick={() => {
            this.toggleMenu();
          }}
          onKeyDown={e => this.onKeyDown(e)}
          ref={bt => (this._dropdownButton = bt)}>
          <span>{this.getActiveOptionLabel()}</span>
          <Icon type={IconType.ArrowDown} />
        </div>
        {!this.state.dropMenuActive ? (
          undefined
        ) : (
          <Menu parentEl={this._el} options={props.options} onSelect={o => this.onSelect(o)} onClose={() => this.onClose()} />
        )}
      </div>
    );
  }
}

export {DropDown};
