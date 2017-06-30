//@flow
import { h, Component } from 'preact';

class SmartContainer extends Component {
  render(props: any) {
    return (
      <div className='smart-container top left'>
        {props.children}
      </div>
    )
  }
}

export default SmartContainer;
