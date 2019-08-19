//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerNav: state.shell.playerNav
});
@connect(mapStateToProps)

/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
class SmartContainerItem extends Component {
  _el: HTMLDivElement;

  /**
   * after component mounted, focus dropdown button if passed to be focus
   * @returns {void}
   * @memberof DropDown
   */
  componentDidMount(): void {
    if (this.props.focus) {
      this._el.focus();
    }
    this.setState({dropMenuActive: false});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): React$Element<any> {
    const label = props.label && props.label.toLowerCase();
    return (
      <div
        onClick={e => {
          this.toggleDropDown();
          e.stopPropagation();
        }}
        onKeyDown={e => {
          if (e.keyCode == KeyMap.ENTER) {
            this.toggleDropDown();
          } else if (e.keyCode == KeyMap.ESC) {
            if (this.state.dropMenuActive) {
              this.closeDropDown();
              e.stopPropagation();
            }
          }
        }}
        ref={el => (this._el = el)}
        tabIndex="0"
        className={[style.smartContainerItem, style.selectMenuItem].join(' ')}>
        <label htmlFor={label}>
          {props.icon ? (
            <div className={style.labelIcon}>
              <Icon type={props.icon} />
            </div>
          ) : (
            undefined
          )}
          {props.label}
        </label>
        <DropDown name={label} onSelect={o => this.onSelect(o)} options={props.options} dropMenuActive={this.state.dropMenuActive} />
      </div>
    );
  }

  onSelect(option) {
    this.props.onSelect(option);
    this.closeDropDown();
  }

  toggleDropDown() {
    const dropMenuActive = !this.state.dropMenuActive;
    this.setState({dropMenuActive: dropMenuActive});
    if (!dropMenuActive && this.props.playerNav && this._el) {
      this._el.focus();
    }
  }

  closeDropDown() {
    this.setState({dropMenuActive: false});
    if (this.props.playerNav && this._el) {
      this._el.focus();
    }
  }
}

export {SmartContainerItem};
