//@flow
import { h, Component } from 'preact';
import { default as Icon, IconType } from '../icon';
import { connect } from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile
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

  _menuElement: any;

  /**
   * after component mounted, listen to click outside of the component
   * @returns {void}
   * @memberof Menu
   */
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  /**
   * before component unmount, remove the event listener
   *
   * @returns {void}
   * @memberof Menu
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  /**
   * handler to click outside of the component event listener.
   * if not mobile device and clicked outside the component, call the onClose callback
   *
   * @param {Event} e click event
   * @returns {void}
   * @memberof Menu
   */
  handleClickOutside(e: Event) {
    if (!this.props.isMobile && this._menuElement && !this._menuElement.contains(event.target)) {
      e.stopPropagation();
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
    this.props.options.filter(t => t.active).forEach(option => { option.active = false });
    this.props.options.filter(t => t.value === option.value)[0].active = true;
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
    return (
      <select
        className={this.props.hideSelect ? 'mobile-hidden-select' : ''}
        onChange={e => this.onSelect(this.props.options[e.target.value])}
      >
        {this.props.options.map((o, index) => <option selected={this.isSelected(o)} value={index} key={index}>{o.label}</option>)}
      </select>
    )
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
    return props.isMobile ? this.renderNativeSelect() :
    (
      <div
        ref={c => this._menuElement = c}
        className='dropdown-menu top left'
      >
        {
          props.options.map((o, index) => (
            <div key={index} className={this.isSelected(o) ? 'dropdown-menu-item active' : 'dropdown-menu-item'} onClick={() => this.onSelect(o)}>
              <span>{o.label}</span>
              <span style={`opacity: ${ this.isSelected(o) ? 1 : 0 }`}><Icon type={IconType.Check} /></span>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Menu;
