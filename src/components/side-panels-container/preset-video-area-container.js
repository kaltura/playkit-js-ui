//@flow
import {h, Component} from 'preact';
import {connectToUIPresetsStore} from '../side-panel';

@connectToUIPresetsStore
export class PresetVideoAreaContainer extends Component {
  render() {
    const {divRef, className, sidePanelsStore} = this.props;
    const presetStyle = sidePanelsStore.calculateVideoStyles();
    console.log(`sakal render PresetVideoAreaContainer`);
    return <div className={className} style={presetStyle} ref={divRef}></div>;
  }
}
