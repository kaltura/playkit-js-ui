//@flow
import {h, Component, toChildArray} from 'preact';
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
  PlayerAreaComponents: null,
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

  componentDidUpdate(prevProps) {
    if (prevProps.activePresetName !== this.props.activePresetName) {
      this._updateAreaComponents();
    }
  }

  _updateAreaComponents = (): void => {
   
    const { activePresetName, name } = this.props;
    const presetComponentsStore = this.context.presetComponentsStore;
    const presetsComponents = presetComponentsStore ? presetComponentsStore.getPresetComponents() : null;

    if (!presetComponentsStore || !activePresetName || !presetsComponents) {
      this.props.logger.debug(`PlayerArea name '${name}' is limited to self components only`);
      this.setState(initialState);
      return;
    }

    this.props.logger.debug(`PlayerArea name '${name}' allows injections for preset '${activePresetName}'`);

    const nextPlayerAreaComponents = {
      appendedComponents: [],
      positionedComponentMap: {}
    };
    const positionedComponentMap = nextPlayerAreaComponents.positionedComponentMap;
    let hasPositionedComponents = false;

    const presetComponents = presetsComponents[activePresetName] || [];
    const PlayerAreaComponents = presetComponents.filter(component => component.container === this.props.name);
    PlayerAreaComponents.forEach(component => {
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
      PlayerAreaComponents: nextPlayerAreaComponents,
      hasPositionedComponents,
      presetComponentsOnlyMode: false
    });
  
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    this.props.logger.debug(`PlayerArea name '${this.props.name}' mounted`);
    this.context.presetComponentsStore.listen(this._updateAreaComponents);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    const { name } = this.props;
    this.props.logger.debug(`PlayerArea name '${this.props.name}' will-unmount`);
    this.context.presetComponentsStore.unlisten(this._updateAreaComponents);
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
   * @memberof PlayerArea
   */
  render(): React$Element<any> | null {
    const {children, show, preAppendTo} = this.props;
    const {PlayerAreaComponents, hasPositionedComponents} = this.state;

    if (this.state.presetComponentsOnlyMode) {
      return this.renderContent(this.props.children);
    }

    if (!PlayerAreaComponents || !show) {
      return null;
    }

    const newChildren = [];

    if (hasPositionedComponents) {
      toChildArray(children).forEach(child => {
        let childName = getComponentName(child);
        if (!childName) {
          newChildren.push(child);
          return;
        }
        const positionedComponent = PlayerAreaComponents.positionedComponentMap[childName];
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
      newChildren.push(...toChildArray(children));
    }

    const appendedChildren = PlayerAreaComponents.appendedComponents.map(component => {
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
