## Create New Component

### Dumb component

This component will just be a div wrapper with a className

```javascript
import { h, Component } from 'preact';

class DumbComponent extends Component {
  render(props) {
    return (
      <div className='dumb-component'>{ props.children }</div>
    )
  }
}

export default DumbComponent;
```

The usage of this component will be:

```html
<DumbComponent>
  <p>You can add here any components and html you want and it will be appended to the DumbComponent</p>
</DumbComponent>
```

### Redux-Store Connected Component

This component will log all player state changes (based on the redux store) and print them as a log.
`componentDidUpdate` lifecycle function is used.
See all component lifecycle function at: <a href="https://preactjs.com/guide/lifecycle-methods">https://preactjs.com/guide/lifecycle-methods</a>
The component will also get a prop of additional className.

```javascript
//@flow
import { h } from 'preact';
import { bindActions } from '../../utils/bind-actions';
import BaseComponent from '../base';

const mapStateToProps = state => ({ playerState: state.engine.playerState });

@connect(mapStateToProps)
class PlayerStateLog extends BaseComponent {
  log = new Array();

  constructor() { super({name: 'PlayerStateLog'}); }

  componentDidUpdate() {
    this.log.push(this.props.playerState.currentState);
  }

  render(props) {
    var className = 'log';
    className += ` ${props.additionalClass}`;

    return (
      <ul className={className}>
        { this.log.map(playerState => <li>{playerState}</li>) }
      </div>
    )
  }
}

export default PlayerStateLog;

```

The usage of this component will be:

```html
<PlayerStateLog additionalClass='red-list' />
```


