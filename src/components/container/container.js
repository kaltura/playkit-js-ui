//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName
});

/**
 * get container component item by key
 * @param {*} dictionary dictionary
 * @param {*} componentName componentName
 * @returns {*} positionedComponent
 */
function getPositionedContainerItem(dictionary, componentName) {
  dictionary[componentName] = dictionary[componentName] || {
    before: [],
    after: [],
    replace: null
  };

  return dictionary[componentName];
}

const initialState = {
  containerComponents: null,
  hasPositionedComponents: false
};

/**
 * get component name
 * @param {*} component component
 * @returns {*} component name
 */
function getComponentName(component: Object) {
  if (!component || !component.nodeName) {
    return null;
  }

  return component.nodeName.displayName;
}

@connect(mapStateToProps)
/**
 * A video container enabling injecting components by preset, container and position
 */
class Container extends BaseComponent {
  presetComponentsOnlyMode: false;

  static defaultProps = {
    show: true
  };
  /**
   * constructor
   * @param {*} props props
   * @param {*} context context
   * @return {void}
   */
  constructor(props, context) {
    super(props, context);
    this.setState(initialState);
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    if (!this.context.presetComponentsStore) {
      return;
    }
    const {targetPresetName, activePresetName} = this.props;

    if (!activePresetName) {
      this.presetComponentsOnlyMode = true;
      return;
    }

    if (targetPresetName !== activePresetName) {
      this.logger.debug(`mount ui container (target preset '${targetPresetName}') - Container is not in use in active preset '${activePresetName}`);
      return;
    }

    this.logger.debug(`mount ui container (target preset '${targetPresetName}') - handle injected components`);
    this.context.presetComponentsStore.listen(this._onPresetsComponentsChange);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    if (!this.context.presetComponentsStore) {
      return;
    }

    if (this.presetComponentsOnlyMode) {
      return;
    }

    this.context.presetComponentsStore.unlisten(this._onPresetsComponentsChange);

    const {targetPresetName} = this.props;
    this.logger.debug(`un-mount ui container (target preset '${targetPresetName}')`);
  }

  /**
   * update container components
   * @param {*} presetsComponents presetsComponents
   * @return {void}
   */
  _onPresetsComponentsChange = presetsComponents => {
    if (!presetsComponents) {
      return;
    }

    const {targetPresetName, activePresetName} = this.props;

    if (targetPresetName !== activePresetName) {
      return;
    }

    const nextContainerComponents = {
      appendedComponents: [],
      positionedComponentMap: {}
    };
    const positionedComponentMap = nextContainerComponents.positionedComponentMap;
    let hasPositionedComponents = false;

    const presetComponents = presetsComponents[targetPresetName] || [];
    const relevantComponents = presetComponents.filter(component => component.container === this.props.name);
    relevantComponents.forEach(component => {
      if (component.beforeComponent) {
        getPositionedContainerItem(positionedComponentMap, component.beforeComponent).before.push(component);
        hasPositionedComponents = true;
      } else if (component.afterComponent) {
        getPositionedContainerItem(positionedComponentMap, component.afterComponent).after.push(component);
        hasPositionedComponents = true;
      } else if (component.replaceComponent) {
        getPositionedContainerItem(positionedComponentMap, component.replaceComponent).replace = component;
        hasPositionedComponents = true;
      } else {
        nextContainerComponents.appendedComponents.push(component);
      }
    });

    this.setState({
      containerComponents: nextContainerComponents,
      hasPositionedComponents
    });
  };

  /**
   *  render preset component
   * @param {UIComponent} uiComponent uiComponent
   * @returns {*} component
   * @private
   */
  _renderUIComponent(uiComponent: UIComponent) {
    if (!uiComponent.render) {
      return null;
    }

    return uiComponent.render({
      context: uiComponent.context
    });
  }

  /**
   * render container content
   * @param {*} children children
   * @returns {*} component
   */
  renderContent(children) {
    return <div className={this.props.className}>{children}</div>;
  }

  /**
   * render component
   *
   * @returns {null | *} - component
   * @memberof Container
   */
  render(): React$Element<any> {
    const {children, show} = this.props;
    const {containerComponents, hasPositionedComponents} = this.state;

    if (this.presetComponentsOnlyMode) {
      return this.renderContent(this.props.children);
    }

    if (!containerComponents || !show) {
      return null;
    }

    const newChildren = [];

    if (hasPositionedComponents) {
      children.forEach(child => {
        let childName = getComponentName(child);
        if (!childName) {
          newChildren.push(child);
          return;
        }
        const positionedComponent = containerComponents.positionedComponentMap[childName];
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
    } else {
      newChildren.push(...children);
    }

    containerComponents.appendedComponents.forEach(component => {
      const newChild = this._renderUIComponent(component);
      newChildren.push(newChild);
    });

    return this.renderContent(newChildren);
  }
}

export {Container};
