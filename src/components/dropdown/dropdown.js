//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Menu} from '../menu';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';

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
  onMenuChosen(option: Object): void {
    this.props.onMenuChosen(option);
    this.setState({dropMenuActive: false});
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
        this.setState(prevState => {
          return {dropMenuActive: !prevState.dropMenuActive};
        });
        break;
      case KeyMap.ESC:
        if (this.state.dropMenuActive) {
          this.onClose();
          e.stopPropagation();
        }
        break;
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
        onMenuChosen={o => this.onMenuChosen(o)}
        onClose={() => this.onClose()}
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
          onClick={e => {
            e.stopPropagation();
            this.toggleDropDown();
          }}
          onKeyDown={e => {
            switch (e.keyCode) {
              case KeyMap.ENTER:
                this.toggleDropDown();
                e.stopPropagation();
                break;
            }
          }}>
          <span id={activeOptionId}>{this.getActiveOptionLabel()}</span>
          <Icon type={IconType.ArrowDown} />
          {!this.state.dropMenuActive ? undefined : (
            <Menu parentEl={this._el} options={props.options} onMenuChosen={o => this.onMenuChosen(o)} onClose={() => this.onClose()} />
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
