//@flow
import {h, Component} from 'preact';
import {Container} from '../container';
import {connectToUIPresetsStore} from 'components/side-panel';

@connectToUIPresetsStore
export class PresetArea extends Component {
  render() {
    const {children, className, preAppendTo, sidePanelsStore} = this.props;
    const presetStyle = sidePanelsStore.calculateInteractiveAreaStyles();

    return (
      <Container style={presetStyle} className={className} name={'PresetArea'} preAppendTo={preAppendTo}>
        {children}
      </Container>
    );
  }
}
