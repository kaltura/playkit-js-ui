// @flow
import {Component, h} from 'preact';
import {connect} from 'react-redux';
import {actions} from 'reducers/shell';
import {bindActions} from 'utils/bind-actions';

const defaultProps = {
  allowSidePanels: false,
  allowPlayerArea: false
};

/**
 * connect decorator
 * @param {Object} options - options
 * @returns {function(*): *} connect
 */
const withPlayerPreset = (options: Object) => (InnerComponent: Component) => {
  @connect(
    null,
    bindActions(actions)
  )
  /**
   * hoc withPlayerPreset
   */
  class PlayerPreset extends Component {
    /**
     * on component mount
     *
     * @returns {void}
     * @memberof Fullscreen
     */
    componentDidMount(): void {
      const enhancedOptions = Object.assign({}, defaultProps, options);
      const {allowSidePanels, allowPlayerArea} = enhancedOptions;
      this.props.updatePresetSettings({
        allowSidePanels,
        allowPlayerArea
      });
    }

    /**
     * should component update handler
     * @returns {boolean} - should update
     *
     */
    shouldComponentUpdate(): boolean {
      return false;
    }

    /**
     * render
     * @param {any} props - params
     * @returns {*} component
     */
    render(props: any) {
      return <InnerComponent {...props} />;
    }
  }
  return PlayerPreset;
};

export {withPlayerPreset};
