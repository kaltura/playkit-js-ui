//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
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
function getComponentName(component: any) {
  if (!component || !component.nodeName) {
    return null;
  }

  return component.nodeName.displayName;
}

@connect(mapStateToProps)
@withLogger('Container')
/**
 * A video container enabling injecting components by preset, container and position
 */
class Container extends Component {
  presetComponentsOnlyMode = false;

  static defaultProps = {
    show: true
  };
  /**
   * constructor
   * @param {*} props props
   * @param {*} context context
   * @return {void}
   */
  constructor(props: Object) {
    super(props);
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
    const {activePresetName} = this.props;

    if (!activePresetName) {
      this.presetComponentsOnlyMode = true;
      return;
    }

    this.props.logger.debug(`mount ui container (active preset '${activePresetName}') - handle injected components`);
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

    const {activePresetName} = this.props;
    this.props.logger.debug(`un-mount ui container (active preset '${activePresetName}')`);
  }

  /**
   * update container components
   * @param {*} presetsComponents presetsComponents
   * @return {void}
   */
  _onPresetsComponentsChange = (presetsComponents: any) => {
    if (!presetsComponents) {
      return;
    }

    const {activePresetName} = this.props;

    const nextContainerComponents = {
      appendedComponents: [],
      positionedComponentMap: {}
    };
    const positionedComponentMap = nextContainerComponents.positionedComponentMap;
    let hasPositionedComponents = false;

    const presetComponents = presetsComponents[activePresetName] || [];
    const containerComponents = presetComponents.filter(component => component.container === this.props.name);
    containerComponents.forEach(component => {
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
  _renderUIComponent(uiComponent: PKUIComponent): React$Element<any> | null {
    if (!uiComponent.get) {
      return null;
    }

    return h(uiComponent.get, uiComponent.props);
  }

  /**
   * render container content
   * @param {*} children children
   * @returns {*} component
   */
  renderContent(children: Array<any>) {
    const {className, id, name, style} = this.props;
    return (
      <div style={style} className={className} id={id} data-kp-container={name}>
        {children}
      </div>
    );
  }

  /**
   * render component
   *
   * @returns {null | *} - component
   * @memberof Container
   */
  render(): React$Element<any> | null {
    const {children, show, preAppendTo} = this.props;
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

    const appendedChildren = containerComponents.appendedComponents.map(component => {
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

export {Container};
