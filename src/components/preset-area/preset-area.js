//@flow
import {h, Component} from 'preact';
import {Container} from '../container';

export class PresetArea extends Component {
  render() {
    const {children, className, preAppendTo} = this.props;

    return (
      <Container className={className} name={'PresetArea'} preAppendTo={preAppendTo}>
        {children}
      </Container>
    );
  }
}
