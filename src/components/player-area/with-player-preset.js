// @flow
import {Component, h} from 'preact';
import {connect} from 'react-redux';
import {actions} from 'reducers/shell';
import {bindActions} from 'utils/bind-actions';

const defaultProps = {
  allowSidePanels: false,
  allowPlayerArea: false,
  allowVideoArea: false
};

/**
 * connect decorator
 * @returns {function(*): *} connect
 */
const withPlayerPreset = options => InnerComponent => {
  @connect(
    null,
    bindActions(actions)
  )
  /**
   * store hoc withPlayerPreset
   */
  class PlayerPreset extends Component {
    componentDidMount(): void {
      const enhancedOptions = Object.assign({}, defaultProps, options);
      const {allowSidePanels, allowPlayerArea, allowVideoArea} = enhancedOptions;
      this.props.updatePresetSettings({
        allowSidePanels,
        allowPlayerArea,
        allowVideoArea
      });
    }

    /**
     * render
     * @returns {*} component
     */
    render() {
      const {presetContainerRef, setPresetContainerRef, presetContainerStyle, ...props} = this.props;
      const presetContainerProps = {
        style: presetContainerStyle,
        setRef: setPresetContainerRef
      }
      return (
        <InnerComponent {...props} presetContainerProps={presetContainerProps} />
      );
    }
  }
  return PlayerPreset;
};

export {withPlayerPreset};
