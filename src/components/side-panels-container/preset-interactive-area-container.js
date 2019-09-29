//@flow
import {h, Component} from 'preact';
import {connectToUIPresetsStore} from '../side-panel';

@connectToUIPresetsStore
export class PresetInteractiveAreaContainer extends Component {
  render() {
    const {children, className, sidePanelsStore} = this.props;
    const presetStyle = sidePanelsStore.calculateInteractiveAreaStyles();
    console.log(`sakal render PresetInteractiveAreaContainer`, { presetStyle });
    return <div className={className} style={presetStyle}>
      {children}
    </div>;
  }
}
