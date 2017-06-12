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
                <div className='dropdown-menu-item' onClick={() => props.onSelect(o)}>
                  <span>{o.label}</span>
                  { this.state.selected === o ? <Icon type='check' /> : '' }
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
