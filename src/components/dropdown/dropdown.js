//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Menu from '../menu';
import { default as Icon, IconType } from '../icon';

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
 * DropDown component
 *
 * @class DropDown
 * @example <DropDown options={this.videoTrackOptions} />
 * @extends {Component}
 */
class DropDown extends Component {
  state: Object;

  /**
   * before component mounted, set initial internal state
   *
   * @returns {void}
   * @memberof DropDown
   */
  componentWillMount() {
    this.setState({dropMenuActive: false});
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
    this.setState({dropMenuActive: false});
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
      return activeOptions[0].label
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
    return (
      <Menu
        options={this.props.options}
        onSelect={o => this.onSelect(o)}
        onClose={() => this.onClose()}
      />
    )
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof DropDown
   */
  render(props: any): React$Element<any> {
    return props.isMobile ? this.renderNativeSelect() :
    (
      <div className={this.state.dropMenuActive ? 'dropdown active' : 'dropdown'}>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {this.getActiveOptionLabel()}
          <Icon type={IconType.ArrowDown} />
        </div>
        {
          !this.state.dropMenuActive ? undefined :
          <Menu
            options={props.options}
            onSelect={(o) => this.onSelect(o)}
            onClose={() => this.onClose()}
          />
        }
      </div>
    )
  }
}

export default DropDown;
