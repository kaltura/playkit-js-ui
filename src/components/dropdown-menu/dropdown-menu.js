//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';

class DropDownMenu extends Component {

  componentWillMount() {
    this.setState({dropMenuActive: false});
    if (!this.props.selected) {
      this.setState({selected: this.props.options[0]});
    } else {
      this.setState({selected: this.props.selected});
    }
  }

  isSelected(o): boolean {
    return this.state.selected.value === o.value;
  }

  onSelect(o) {
    this.props.onSelect(o);
    this.setState({dropMenuActive: false});
  }

  render(props) {
    return (
      <div className='dropdown top left'>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {this.state.selected.label}
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
