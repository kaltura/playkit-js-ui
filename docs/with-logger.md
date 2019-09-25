## Using a logger in your component

### withLogger HoC 

If your components requires a logger then UI supplies a logger as a service.  
The logger enables printing using log levels `DEBUG`, `INFO`, `WARN` and `ERROR`, and allowed log level can be set to disable logging.  
Default log level is `ERROR`.

Let's see an example, building on the [`withPlayer`](./with-player.md) sample:

> This sample will create red button which, when clicked, reads the current time from player and prints it out to console via the logger.

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withLogger;
const Component = KalturaPlayer.ui.preact.Component;

class SampleComponent extends Component {
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
          this.props.logger.info(this.props.player.currentTime);
        }
      }, 
      props.children
    );
  }
}

export default withLogger(withPlayer(SampleComponent));
```

If you want to use JSX follow this [guide](./custom-ui-preset.md#using-jsx), and use following JSX syntax:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withLogger;
const Component = KalturaPlayer.ui.preact.Component;

class DumbComponent extends Component {
  render(props) {
    return <div 
      className="dumb-component"
      style= {{
        width: '40px',
        height: '40px',
        backgroundColor: 'red'
      }}
      onClick = {() => {
        this.props.logger.info(this.props.player.currentTime);
      }}
    >
      {props.children}
    </div>;
  }
}

export default withLogger(withPlayer(DumbComponent));
```

And if you want to use it as a decorator:

```javascript
const h = KalturaPlayer.ui.h;
const withPlayer = KalturaPlayer.ui.components.withPlayer;
const withEventListener = KalturaPlayer.ui.components.withEventListener;
const Component = KalturaPlayer.ui.preact.Component;

@withPlayer
@withLogger
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
        this.props.logger.info(this.props.player.currentTime);
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
