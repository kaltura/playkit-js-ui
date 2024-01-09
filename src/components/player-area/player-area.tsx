import {h, Component, toChildArray, Fragment, VNode, ComponentChild, ComponentChildren} from 'preact';
import {connect} from 'react-redux';
import {withLogger} from "../logger";
import { KPUIComponent } from "../../types";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName
});

export const Remove = 'remove';
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

/**
 * A video PlayerArea enabling injecting components by preset, PlayerArea and position
 */
@withLogger('PlayerArea')
@connect(mapStateToProps)
class PlayerArea extends Component<any, any> {
  static defaultProps = {
    show: true
  };

  _unregisterListenerCallback!: ((args?: any) => any) | null;
  _actualChildren: ComponentChildren;

  /**
   * should component update handler
   *
   * @returns {boolean} - always update component
   * @param {Object} nextProps - next props of the component
   * @param {Object} nextState - next state of the component
   * @memberof OverlayAction
   */
  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return (
      nextProps.shouldUpdate ||
      this.state.playerAreaComponents !== nextState.playerAreaComponents ||
      nextProps.activePresetName !== this.props.activePresetName
    );
  }

  /**
   * component did update handler
   *
   * @param {Object} prevProps - prev props of the component
   * @returns {void}
   * @memberof OverlayAction
   */
  componentDidUpdate(prevProps: any) {
    if (prevProps.activePresetName !== this.props.activePresetName) {
      this._registerListener();
    }
  }

  /**
   * @returns {void}
   */
  _unregisterListener() {
    this.props.logger.debug(`Player area '${this.props.name}' - unregister to changes`);
    if (typeof this._unregisterListenerCallback === 'function') {
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
  _updateAreaComponents = (playerAreaComponents: Array<any>): void => {
    const {activePresetName, name: playerAreaName} = this.props;

    this.props.logger.debug(`Player area '${playerAreaName}' in preset '${activePresetName}' - update children components`);

    const positionedComponentMap = {};
    const nextPlayerAreaComponents: any = {
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
    this._actualChildren = [];
  }

  /**
   * component will update
   * @param {Object} nextProps - the next props
   * @return {void}
   */
  componentWillUpdate(nextProps: any): void {
    const {children} = nextProps;
    this._actualChildren = children && children.type === Fragment ? children.props.children : children;
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
   * @param {KPUIComponent} uiComponent uiComponent
   * @returns {*} component
   * @private
   */
  _renderUIComponent(uiComponent: KPUIComponent): VNode<any> | null {
    if (!uiComponent.get) {
      return null;
    }

    return h(uiComponent.get as () => any, uiComponent.props!);
  }

  /**
   * render PlayerArea content
   * @param {*} children children
   * @returns {*} component
   */
  renderContent(children: ComponentChildren) {
    return <Fragment>{children}</Fragment>;
  }

  /**
   * get positioned components
   * @param {*} children children
   * @returns {*} new children
   */
  _getPositionedComponents(children: ComponentChildren): Array<any> {
    const {playerAreaComponents} = this.state;
    const newChildren: any[] = [];
    toChildArray(children).forEach((child: VNode) => {
      if (child.type === 'div' || child.type === Fragment) {
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
        // if remove string was given then don't add the component to the newChildren array - hence it will be removed
        if (replace.get === Remove) {
          return;
        }
        if (typeof replace.get !== 'string') {
          // pass the replaced component props to the override one (if it's not an html element e.g. "div")
          replace.props = replace.props || {};
          replace.props.replacedComponentProps = child.props;
        }
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
  render(): ComponentChild {
    const {show} = this.props;
    const {playerAreaComponents, hasPositionedComponents, presetComponentsOnlyMode} = this.state;

    if (presetComponentsOnlyMode) {
      return this.renderContent(this._actualChildren);
    }

    if (!playerAreaComponents || !show) {
      return null;
    }

    let newChildren: any[] = [];

    if (hasPositionedComponents) {
      newChildren = this._getPositionedComponents(this._actualChildren);
    } else {
      newChildren.push(...toChildArray(this._actualChildren));
    }

    const appendedChildren = playerAreaComponents.appendedComponents.map(component => {
      return this._renderUIComponent(component);
    });

    let startIndex = newChildren.length;

    newChildren.splice(startIndex, 0, ...appendedChildren);

    return this.renderContent(newChildren);
  }
}

export {PlayerArea};
