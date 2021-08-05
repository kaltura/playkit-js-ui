//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Menu} from '../menu';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {Badge} from 'components/badge';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize
});

const COMPONENT_NAME = 'DropDown';

/**
 * DropDown component
 *
 * @class DropDown
 * @example <DropDown options={this.videoTrackOptions} />
 * @extends {Component}
 */
@connect(mapStateToProps)
class DropDown extends Component {
  state: Object;
  _el: HTMLDivElement;

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
   * after component mounted, set the callback to be called when parent selected
   * @returns {void}
   * @memberof DropDown
   */
  componentDidMount(): void {
    if (this.props.registerParentSelectedCallback) {
      this.props.registerParentSelectedCallback(this.toggleDropDown.bind(this));
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
  onMenuChosen = (option: Object): void => {
    this.props.onMenuChosen(option);
    this.setState({dropMenuActive: false});
  };

  /**
   * on click handler
   *
   * @param {Event} e - keyboard event
   * @returns {void}
   * @memberof DropDown
   */
  onClick = (e: Event): void => {
    e.stopPropagation();
    this.toggleDropDown();
  };

  /**
   * on key down handler - on enter open toggle drop down menu
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof DropDown
   */
  onKeyDown = (e: KeyboardEvent): void => {
    switch (e.keyCode) {
      case KeyMap.ENTER:
        this.onClick(e);
        break;
      case KeyMap.ESC:
        if (this.state.dropMenuActive) {
          this.onClose();
          e.stopPropagation();
        }
        break;
    }
  };

  /**
   * listener function from Menu component to close the dropdown menu.
   * set the internal state of dropMenuActive to false.
   *
   * @returns {void}
   * @memberof DropDown
   */
  onClose = (): void => {
    this.setState({dropMenuActive: false});
  };

  /**
   * get active option or first option
   *
   * @returns {Object} - active option
   * @memberof DropDown
   */
  getActiveOption(): Object {
    const activeOption = this.props.options.find(option => option.active);
    return activeOption ? activeOption : {label: 'Unlabled'};
  }

  /**
   * render for menu only which will render a native select element in this case (mobile)
   * @param {string} labelledby - the label id the describes the dropdown (for screen reader)
   * @returns {React$Element} - component element
   * @memberof DropDown
   */
  renderNativeSelect(labelledby: string): React$Element<any> {
    return (
      <Menu
        labelledby={labelledby}
        pushRef={this.props.pushRef}
        options={this.props.options}
        onMenuChosen={this.onMenuChosen}
        onClose={this.onClose}
      />
    );
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof DropDown
   */
  render(props: any): React$Element<any> {
    const activeOptionId = props.name + 'Active';
    const activeOption = this.getActiveOption();
    const label = activeOption?.dropdownOptions?.label || activeOption.label;
    const badgeContent = activeOption.badgeContent || activeOption?.dropdownOptions?.badgeContent;
    return props.isMobile || props.isSmallSize ? (
      this.renderNativeSelect(props.name)
    ) : (
      <div
        name={props.name}
        className={this.state.dropMenuActive ? [style.dropdown, style.active].join(' ') : style.dropdown}
        ref={el => (el ? (this._el = el) : undefined)}>
        <div
          tabIndex={props.tabbable ? 0 : -1}
          ref={el => {
            if (props.pushRef) {
              props.pushRef(el);
            }
          }}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={this.state.dropMenuActive ? 'true' : 'false'}
          aria-labelledby={[props.name, activeOptionId].join(' ')}
          className={style.dropdownButton}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}>
          <span id={activeOptionId}>
            {label}
            {badgeContent ? <Badge content={badgeContent} active={false} /> : null}
          </span>
          <Icon type={IconType.ArrowDown} />
          {!this.state.dropMenuActive ? undefined : (
            <Menu parentEl={this._el} options={props.options} onMenuChosen={this.onMenuChosen} onClose={this.onClose} />
          )}
        </div>
      </div>
    );
  }

  /**
   * toggles the dropdown menu window
   * @returns {void}
   * @memberof DropDown
   */
  toggleDropDown(): void {
    this.setState(prevState => {
      return {dropMenuActive: !prevState.dropMenuActive};
    });
  }
}

DropDown.displayName = COMPONENT_NAME;
export {DropDown};
