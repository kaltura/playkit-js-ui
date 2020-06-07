//@flow
import {h, Component, toChildArray, Fragment} from 'preact';
import {connect} from 'react-redux';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName
});

/**
 * get PlayerArea component item by key
 * @param {*} dictionary dictionary
 * @param {*} componentName componentName
 * @returns {*} positionedComponent
 */
function getPositionedPlayerAreaItem(dictionary, componentName) {
  dictionary[componentName] = dictionary[componentName] || {
    before: [],
    after: [],
    replace: null
  };

  return dictionary[componentName];
}

const initialState = {
  playerAreaComponents: null,
  hasPositionedComponents: false,
  presetComponentsOnlyMode: true
};

/**
 * get component name
 * @param {*} component component
 * @returns {*} component name
 */
function getComponentName(component: any) {
  if (!component || !component.type) {
    return null;
  }

  return component.type.displayName;
}

@withLogger('PlayerArea')
@connect(mapStateToProps)

/**
 * A video PlayerArea enabling injecting components by preset, PlayerArea and position
 */
class PlayerArea extends Component {
  static defaultProps = {
    show: true
  };
  _unregisterListenerCallback = null;

  /**
   * should component update handler
   *
   * @returns {boolean} - always update component
   * @param {Object} nextProps - next props of the component
   * @param {Object} nextState - next state of the component
   * @memberof OverlayAction
   */
  shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
    return this.state.playerAreaComponents !== nextState.playerAreaComponents || nextProps.activePresetName !== this.props.activePresetName;
  }

  /**
   * component did update handler
   *
   * @param {Object} prevProps - prev props of the component
   * @returns {void}
   * @memberof OverlayAction
   */
  componentDidUpdate(prevProps) {
    if (prevProps.activePresetName !== this.props.activePresetName) {
      this._registerListener();
    }
  }

  /**
   * @returns {void}
   */
  _unregisterListener() {
    if (this._unregisterListenerCallback) {
      this.props.logger.debug(`Player area '${this.props.name}' - unregister to changes`);
      this._unregisterListenerCallback();
      this._unregisterListenerCallback = null;
    }
  }

  /**
   * @returns {void}
   */
  _registerListener() {
    const {activePresetName, name: playerAreaName} = this.props;

    this._unregisterListener();

    if (!activePresetName || !playerAreaName) {
      return;
    }

    this.props.logger.debug(`Player area '${playerAreaName}' in preset '${activePresetName}' - register to changes`);

    this._unregisterListenerCallback = this.context.playerAreaComponentsStore.listen(activePresetName, playerAreaName, this._updateAreaComponents);
  }

  /**
   * @param {Array<Object>} playerAreaComponents - playerAreaComponents
   * @returns {void}
   * @private
   */
  _updateAreaComponents = (playerAreaComponents): void => {
    const {activePresetName, name: playerAreaName} = this.props;

    if (!playerAreaComponents) {
      return;
    }

    this.props.logger.debug(`Player area '${playerAreaName}' in preset '${activePresetName}' - update children components`);

    const positionedComponentMap = {};
    const nextPlayerAreaComponents = {
      appendedComponents: [],
      positionedComponentMap
    };

    let hasPositionedComponents = false;

    playerAreaComponents.forEach(component => {
      if (component.beforeComponent) {
        getPositionedPlayerAreaItem(positionedComponentMap, component.beforeComponent).before.push(component);
        hasPositionedComponents = true;
      } else if (component.afterComponent) {
        getPositionedPlayerAreaItem(positionedComponentMap, component.afterComponent).after.push(component);
        hasPositionedComponents = true;
      } else if (component.replaceComponent) {
        getPositionedPlayerAreaItem(positionedComponentMap, component.replaceComponent).replace = component;
        hasPositionedComponents = true;
      } else {
        nextPlayerAreaComponents.appendedComponents.push(component);
      }
    });

    this.setState({
      playerAreaComponents: nextPlayerAreaComponents,
      hasPositionedComponents,
      presetComponentsOnlyMode: false
    });
  };

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    this.props.logger.debug(`Player area '${this.props.name}' - handle did mount`);
    this.setState(initialState);
    this._registerListener();
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {name} = this.props;
    this.props.logger.debug(`Player area '${name}' - handle will unmount`);
    this._unregisterListener();
  }

  /**
   *  render preset component
   * @param {UIComponent} uiComponent uiComponent
   * @returns {*} component
   * @private
   */
  _renderUIComponent(uiComponent: PKUIComponent): React$Element<any> | null {
    if (!uiComponent.get) {
      return null;
    }

    return h(uiComponent.get, uiComponent.props);
  }

  /**
   * render PlayerArea content
   * @param {*} children children
   * @returns {*} component
   */
  renderContent(children: Array<any>) {
    return <Fragment>{children}</Fragment>;
  }

  /**
   * get positioned components
   * @param {*} children children
   * @returns {*} new children
   */
  _getPositionedComponents(children: Array<any>): Array<any> {
    const {playerAreaComponents} = this.state;
    const newChildren = [];
    toChildArray(children).forEach(child => {
      if (child.type === 'div') {
        child.props.children = this._getPositionedComponents(child.props.children);
        newChildren.push(child);
        return;
      }
      let childName = getComponentName(child);
      if (!childName) {
        newChildren.push(child);
        return;
      }
      const positionedComponent = playerAreaComponents.positionedComponentMap[childName];
      if (!positionedComponent) {
        newChildren.push(child);
        return;
      }
      const {replace, before, after} = positionedComponent;
      if (replace) {
        newChildren.push(this._renderUIComponent(replace));
        return;
      }
      if (before.length) {
        before.forEach(component => {
          newChildren.push(this._renderUIComponent(component));
        });
      }
      newChildren.push(child);
      if (after.length) {
        after.forEach(component => {
          newChildren.push(this._renderUIComponent(component));
        });
      }
    });
    return newChildren;
  }

  /**
   * render component
   *
   * @returns {null | *} - component
   * @memberof PlayerArea
   */
  render(): React$Element<any> | null {
    const {children, show, preAppendTo, name} = this.props;
    const {playerAreaComponents, hasPositionedComponents} = this.state;
    this.props.logger.debug(`Player area '${name}' - render`);

    if (this.state.presetComponentsOnlyMode) {
      return this.renderContent(this.props.children);
    }

    if (!playerAreaComponents || !show) {
      return null;
    }

    let newChildren = [];

    if (hasPositionedComponents) {
      newChildren = this._getPositionedComponents(children);
    } else {
      newChildren.push(...toChildArray(children));
    }

    const appendedChildren = playerAreaComponents.appendedComponents.map(component => {
      return this._renderUIComponent(component);
    });

    let startIndex = newChildren.length;
    if (preAppendTo) {
      const defaultIndex = newChildren.findIndex(item => getComponentName(item) === preAppendTo);
      startIndex = defaultIndex !== -1 ? defaultIndex : startIndex;
    }

    newChildren.splice(startIndex, 0, ...appendedChildren);

    return this.renderContent(newChildren);
  }
}

export {PlayerArea};
