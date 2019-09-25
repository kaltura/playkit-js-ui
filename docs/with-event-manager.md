## Using an event manager in your component

### withEventManager HoC 

If your components requires to listen to events then UI supplies an event manager as a service.  
The event manager provides encapsulation over the document native event system, taking care of managing event registry per event and target and cleaning event listeners and upon component unmount to avoid memory leaks via the HoC.
In addition, the player, which is exposed via the [`withPlayer`](./with-player.md) HoC, is compatible as an event target that the event manager requires.
The HoC exposes the event manager to the wrapped component and will be accessible via the component props, i.e. `this.props.eventManager`.
Events can be added by `this.props.eventManager.listen(EVENT_TARGET, EVENT_NAME, EVENT_HANDLER)` or `listenOnce` which removes listener after first occurrence of the event.   

Let's see an example, building on the [`withPlayer`](./with-player.md) sample:

> This sample will add a player `playing` event listener and prints it out to console when it is triggered.

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withEventListener;
const Component = KalturaPlayer.ui.preact.Component;

class SampleComponent extends Component {
  componentDidMount() {
    this.props.eventManager.addEventListener(
      this.props.player, 
      'playing', 
      () => {console.info('playing')}
    );
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

export default withEventListener(withPlayer(SampleComponent));
```

If you want to use JSX follow this [guide](./custom-ui-preset.md#using-jsx), and use following JSX syntax:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withEventListener;
const Component = KalturaPlayer.ui.preact.Component;

class DumbComponent extends Component {
  componentDidMount() {
    this.props.eventManager.addEventListener(
      this.props.player, 
      'playing', 
      () => {console.info('playing')}
    );
  }
  render(props) {
    return <div 
      className="dumb-component"
      style= {{
        width: '40px',
        height: '40px',
        backgroundColor: 'red'
      }}
      onClick = {() => {
        console.info(this.props.player.currentTime);
      }}
    >
      {props.children}
    </div>;
  }
}

export default withEventListener(withPlayer(DumbComponent));
```

And if you want to use it as a decorator:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withEventListener;
const Component = KalturaPlayer.ui.preact.Component;

@withPlayer
@withEventListener
class DumbComponent extends Component {
  componentDidMount() {
    this.props.eventManager.addEventListener(
      this.props.player, 
      'playing', 
      () => {console.info('playing')}
    );
  }
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
