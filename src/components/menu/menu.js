//@flow
import { h, Component } from 'preact';
import { default as Icon, IconType } from '../icon';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps)
class Menu extends Component {

  _menuElement: any;

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(e: any) {
    if (!this.props.isMobile && this._menuElement && !this._menuElement.contains(event.target)) {
      e.stopPropagation();
      this.props.onClose();
    }
  }

  isSelected(o: Object): boolean {
    return o.active;
  }

  onSelect(o: Object) {
    this.props.onSelect(o.value);

    // Instant select
    this.props.options.filter(t => t.active).forEach(option => { option.active = false });
    this.props.options.filter(t => t.value === o.value)[0].active = true;
  }

  getActiveOptionLabel(): string {
    let activeOptions = this.props.options.filter(t => t.active);
    return activeOptions.length > 0 ? activeOptions[0].label : this.props.options[0].label;
  }

  renderNativeSelect() {
    return (
      <select
        className={this.props.hideSelect ? 'mobile-hidden-select' : ''}
        onChange={e => this.onSelect(this.props.options[e.target.value])}
      >
        {this.props.options.map((o, index) => <option selected={this.isSelected(o)} value={index} key={index}>{o.label}</option>)}
      </select>
    )
  }

  render(props: any) {
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
