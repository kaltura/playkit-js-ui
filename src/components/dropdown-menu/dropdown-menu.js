//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';

class DropDownMenu extends Component {

  componentDidMount() {
    this.setState({dropMenuActive: false});
  }

  render(props) {
    return (
      <div className='dropdown top left'>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {props.selected ? props.selected.label : props.options[0].label}
        </div>
        {
          !this.state.dropMenuActive ? '' :
          <div className='dropdown-menu'>
            {
              props.options.map(o => (
                <div className='dropdown-menu-item' onClick={() => props.onSelect(o)}>
                  <span>{o.label}</span> <Icon type='check' />
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
