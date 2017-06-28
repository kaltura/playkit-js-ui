//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps)
class DropDownMenu extends Component {

  componentWillMount() {
    this.setState({dropMenuActive: false});
  }

  isSelected(o): boolean {
    return o.active;
  }

  onSelect(o) {
    this.props.onSelect(o.value);
    this.setState({dropMenuActive: false});
  }

  getActiveOptionLabel(): string {
    let activeOptions = this.props.options.filter(t => t.active);
    return activeOptions.length > 0 ? activeOptions[0].label : this.props.options[0].label;
  }

  renderNativeSelect() {
    return (
      <select onChange={(e) => this.onSelect(this.props.options[e.target.value])}>
        {this.props.options.map((o, index) => <option selected={this.isSelected(o)} value={index}>{o.label}</option>)}
      </select>
    )
  }

  render(props) {
    return props.isMobile ? this.renderNativeSelect() :
    (
      <div className='dropdown top left'>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {this.getActiveOptionLabel()}
        </div>
        {
          !this.state.dropMenuActive ? '' :
          <div className='dropdown-menu'>
            {
              props.options.map(o => (
                <div className={this.isSelected(o) ? 'dropdown-menu-item active' : 'dropdown-menu-item'} onClick={() => this.onSelect(o)}>
                  <span>{o.label}</span>
                  { this.isSelected(o) ? <Icon type='check' /> : '' }
                </div>
              ))
            }
          </div>
        }
      </div>
    )
  }
}

export default DropDownMenu;
