//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps)
class DropDown extends Component {
  state: Object;

  componentWillMount() {
    this.setState({dropMenuActive: false});
  }

  isSelected(o: Object): boolean {
    return o.active;
  }

  onSelect(option: Object) {
    this.props.onSelect(option);
    this.setState({dropMenuActive: false});
  }

  getActiveOptionLabel(): string {
    let activeOptions = this.props.options.filter(t => t.active);
    try {
      return activeOptions[0].label
    } catch (e) {
      return this.props.options[0].label || 'Unlabled';
    }
  }

  renderNativeSelect() {
    return (
      <select onChange={(e) => this.onSelect(this.props.options[e.target.value])}>
        {this.props.options.map((o, index) => <option selected={this.isSelected(o)} value={index} key={index}>{o.label}</option>)}
      </select>
    )
  }

  render(props: any) {
    return props.isMobile ? this.renderNativeSelect() :
    (
      <div className='dropdown'>
        <div className='dropdown-button' onClick={() => this.setState({dropMenuActive: !this.state.dropMenuActive})}>
          {this.getActiveOptionLabel()}
        </div>
        {
          !this.state.dropMenuActive ? undefined : <Menu options={props.options} onSelect={(o) => this.onSelect(o)} />
        }
      </div>
    )
  }
}

export default DropDown;
