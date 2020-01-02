## Using the keyboard event handler API in your component

### withKeyboardEvent HoC

If your components requires a keyboard event then UI supplies a keyboard event registration as a service.  
The keyboard event registration enables add and remove keyboard event for our player.
The registration is for component - when component will be removed the relevant keyboard event should be removed.
For combination of code + altKey + ctrlKey + metaKey + shiftKey could be one handler.
Let's see an example:

> This sample will add listener for combination of F + shiftKey and remove on unmount

```javascript
const h = KalturaPlayer.ui.h;
const withKeyboardEvent = KalturaPlayer.ui.components.withKeyboardEvent;
const Component = KalturaPlayer.ui.preact.Component;

class SampleComponent extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.F,
        shiftKey: true
      },
      action: () => {
        console.log('F and shiftKey registered');
      }
    }
  ];
  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  render(props) {
    return h(props.children);
  }
}

export default withKeyboardEvent(SampleComponent);
```

And if you want to use it as a decorator:

```javascript
const h = KalturaPlayer.ui.h;
const withKeyboardEvent = KalturaPlayer.ui.components.withKeyboardEvent;
const Component = KalturaPlayer.ui.preact.Component;

@withKeyboardEvent
class DumbComponent extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.F,
        shiftKey: true
      },
      action: () => {
        console.log('F and shiftKey registered');
      }
    }
  ];

  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  render(props) {
    return <div>{props.children}</div>;
  }
}

export default DumbComponent;
```

For using only this component keyboard handlers

```javascript
const h = KalturaPlayer.ui.h;
const withKeyboardEvent = KalturaPlayer.ui.components.withKeyboardEvent;
const Component = KalturaPlayer.ui.preact.Component;
const componentName = 'DUMB_COMPONENT';

@withKeyboardEvent(componentName)
class DumbComponent extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.F,
        shiftKey: true
      },
      action: () => {
        console.log('F and shiftKey registered');
      }
    }
  ];

  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
    this.props.setKeyboardEventToScope(true);
  }

  render(props) {
    return <div>{props.children}</div>;
  }
}

export default DumbComponent;
```

For disabling the keyboard handler

```javascript
const h = KalturaPlayer.ui.h;
const withKeyboardEvent = KalturaPlayer.ui.components.withKeyboardEvent;
const Component = KalturaPlayer.ui.preact.Component;
const componentName = 'DUMB_COMPONENT';

@withKeyboardEvent(componentName)
class DumbComponent extends Component {
  componentDidMount() {
    this.props.updateIsKeyboardEnabled(false);
  }

  render(props) {
    return <div>{props.children}</div>;
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
