//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';

class DropDownMenu extends Component {

  componentWillMount() {
    this.setState({dropMenuActive: false});
  }

  isSelected(o): boolean {
    return o.active;
  }

  onSelect(o) {
    this.props.onSelect(o);
    this.setState({dropMenuActive: false});
  }

  render(props) {
    return (
      <div className='dropdown top left'>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {props.options.filter(t => t.active).length > 0 ? props.options.filter(t => t.active)[0].label : ''}
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
