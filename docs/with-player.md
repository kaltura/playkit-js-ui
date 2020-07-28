## Using the player API in your component

### withPlayer HoC

Sometimes you just need a presentational component or you are hooking up a UI component but it doesn't require any data of the playback state.  
In this case you can create your component in isolation from the player API and inject it to the UI.  
But in the cases where player API is required in order to add UI interaction that acts on the player API you may use the withPlayer HoC and get access to the player in your component.
Once used, the player will be accessible via the component props, i.e. `this.props.player`.

Let's see an example:

> This sample will create red button which, when clicked, reads the current time from player and prints it out to console.

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const Component = KalturaPlayer.ui.preact.Component;

class SampleComponent extends Component {
  componentDidMount() {
    // register to event handlers and other stuff here
  }

  componentWillUnount() {
    // free resources here
  }

  render(props) {
    return h(
      'div',
      {
        className: 'dumb-component',
        style: {
          width: '40px',
          height: '40px',
          backgroundColor: 'red'
        },
        onClick: () => {
          console.info(this.props.player.currentTime);
        }
      },
      props.children
    );
  }
}

export default withPlayer(SampleComponent);
```

If you want to use JSX follow this [guide](./custom-ui-preset.md#using-jsx), and use following JSX syntax:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const Component = KalturaPlayer.ui.preact.Component;

class DumbComponent extends Component {
  render(props) {
    return (
      <div
        className="dumb-component"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'red'
        }}
        onClick={() => {
          console.info(this.props.player.currentTime);
        }}>
        {props.children}
      </div>
    );
  }
}

export default withPlayer(DumbComponent);
```

And if you want to use it as a decorator:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const Component = KalturaPlayer.ui.preact.Component;

@withPlayer
class DumbComponent extends Component {
  render(props) {
    return <div
      className="dumb-component"
      style= {{
        width: '40px',
        height: '40px',
        backgroundColor: 'red'
      }}
      onClick: {() => {
        console.info(this.props.player.currentTime);
      }}
    >
      {props.children}
    </div>;
  }
}

export default DumbComponent;
```

The usage of this component will be:

```javascript
const h = KalturaPlayer.ui.h;
h(DumbComponent, null, h('p', null, 'You can add here any components and html you want and it will be appended to the DumbComponent'));
```

Or again, if using JSX:

```html
<DumbComponent>
  <p>You can add here any components and html you want and it will be appended to the DumbComponent</p>
</DumbComponent>
```
