## Create New Component

### Dumb component

This component will just be a div wrapper with a className

```javascript
const h = KalturaPlayer.ui.h;
const BaseComponent = KalturaPlayer.ui.Components.BaseComponent;

class DumbComponent extends Component {
  render(props) {
    return h(
      'div', 
      {className: 'dumb-component'},
      props.children
    )
  }
}

export default DumbComponent;
```

If you want to use JSX follow this [guide](./custom-ui-preset.md#using-jsx), and use following JSX syntax:

```javascript
const h = KalturaPlayer.ui.h;
const BaseComponent = KalturaPlayer.ui.Components.BaseComponent;

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

```javascript
const h = KalturaPlayer.ui.h;
h(
  DumbComponent,
  null,
  h(
    "p",
    null,
    "You can add here any components and html you want and it will be appended to the DumbComponent"
  )
);
```

Or again, if using JSX:
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
const h = KalturaPlayer.ui.h;
const BaseComponent = KalturaPlayer.ui.Components.BaseComponent;
const connect = playkit.ui.redux.connect;

const mapStateToProps = state => ({ playerState: state.engine.playerState });

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
      h(
        "ul",
        { className: className },
        this.log.map(function (playerState) {
          return h(
            "li",
            null,
            playerState
          );
        })
      )
    )
  }
}

export default connect(mapStateToProps)(PlayerStateLog);

```

The usage of this component will be:

```javascript
const h = KalturaPlayer.ui.h;
h(
  PlayerStateLog,
  { additionalClass: 'red-list' }
);
```

Or again, if using JSX:

change the `render` method above to

```javascript
return (
  <ul className={className}>
    { this.log.map(playerState => <li>{playerState}</li>) }
  </ul>
)
```

And the usage of this component will be:

```html
<PlayerStateLog additionalClass='red-list' />
```

### Creating a component to be included in the core library

If a component is to be made in order to be included in the core library then same guidelines are applied as above.

Main difference it that dependencies are managed by importing the core libraries.

instead of referring to the components via the `KalturaPlayer.ui.*` path they can be included like:

```javascript
import { h, Component } from 'preact';
import { bindActions } from '../../utils/bind-actions';
import BaseComponent from '../base';
```
