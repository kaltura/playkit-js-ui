//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';

/**
 *
 * @param {Object} component - a component
 * @returns {string} - the component name
 */
function getComponentName(component: Object) {
  let componentName = component.nodeName.name;
  if (component.nodeName.name === 'Connect') {
    componentName = component.nodeName.WrappedComponent.name;
  }
  return componentName;
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  externalPresetComponents: state.config.externalPresetComponents
});

@connect(
  mapStateToProps,
  null
)
/**
 * A video container enabling injecting components by preset, container and position
 */
class Container extends Component {
  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof Container
   */
  render(): React$Element<any> {
    const children = this.props.children;
    const newChildren = [];
    const presetComponents = this.props.externalPresetComponents.filter(newComponent => {
      return !newComponent.presets || newComponent.presets.includes(this.props.presetName);
    });
    const containerComponents = presetComponents.filter(presetComponent => {
      return presetComponent.container === this.props.name;
    });
    const lastContainerComponents = containerComponents
      .filter(containerComponent => {
        return !containerComponent.position;
      })
      .map(lastContainerComponent => h(lastContainerComponent.component, {player: this.props.player, context: lastContainerComponent.context}));
    children.map(child => {
      if (child && child.nodeName) {
        //try and get component name, if HoC then get the wrapped
        let componentName = getComponentName(child);
        const before = [];
        const after = [];
        //If there's a component name then go over container components
        // and find components that are either before or after the current child
        if (componentName) {
          containerComponents.forEach(containerComponent => {
            const component = h(containerComponent.component, {player: this.props.player, context: containerComponent.context});
            if (containerComponent.componentName === componentName) {
              switch (containerComponent.position) {
                case 'before':
                  before.push(component);
                  break;
                case 'replace':
                  child = component;
                  break;
                case 'after':
                  after.push(component);
                  break;
              }
            }
          });
        }
        newChildren.push(...before, child, ...after);
      } else {
        newChildren.push(child);
      }
      // Ignore the first child
    });
    newChildren.push(...lastContainerComponents);
    return (
      <div className={this.props.className} name={this.props.name}>
        {newChildren.length ? newChildren : newChildren[0]}
      </div>
    );
  }
}

export {Container};
