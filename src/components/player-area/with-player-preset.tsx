import {Component, h} from 'preact';
import {connect} from 'react-redux';
import {actions} from '../../reducers/shell';
import {bindActions} from '../../utils';

const defaultProps = {
  allowSidePanels: false,
  allowPlayerArea: false
};

/**
 * connect decorator
 * @param {Object} options - options
 * @returns {function(*): *} connect
 */
const withPlayerPreset =
  (options: any) =>
  (InnerComponent: any): any => {
    /**
     * hoc withPlayerPreset
     */
    @connect(null, bindActions(actions))
    class PlayerPreset extends Component<any, any> {
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
