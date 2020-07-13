## Using the keyboard event handler API in your component

### withKeyboardEvent HoC

If your components require a keyboard event, then the UI supplies a keyboard event registration as a service.
The keyboard event registration enables to add and remove keyboard events for our player.
The registration is for a specific component - when the component will be removed, the relevant keyboard events would be removed.
For a combination of a Key code + altKey + ctrlKey + metaKey + shiftKey, one handler can be used.
Let's see an example:

> This sample will add a listener for the combination of F + shiftKey and will be removed on unmount

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

Same can be done with the use of decorators:

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

For using only this component keyboard handlers `setKeyboardEventToScope` can used.
This method will enable only keyboard event handlers of this component to be invoked.
All other component keyboard events will be temporarily disabled.

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

For disabling ALL components keyboard handlers, `updateIsKeyboardEnabled` method can be used (set to false).
A clear use case for that would be for example, when creating a component with an input text field.

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
