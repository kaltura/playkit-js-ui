// @flow
import {Component} from 'preact';
import getLogger from '../../utils/logger';

const logger = getLogger('ContainerProvider');

/**
 *  A provider of injected preset components configuration
 */
export class ContainerProvider extends Component {
  /**
   * constructor
   * @return {void}
   */
  constructor() {
    super();
    this._listeners = [];
    this._data = {
      allPresets: [],
      specificPreset: {}
    };
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    const specificPreset = {};
    const allPresets = [];
    (this.props.uiComponents || []).forEach(component => {
      if (!component.render || !component.container) {
        logger.warn(
          `preset with label '${component.label ||
            ''}' configuration is invalid, missing required configuration (did you remember to set 'container' and 'render'?)`
        );
        return;
      }

      if (!component.presets) {
        allPresets.push(component);
      } else {
        component.presets.forEach(preset => {
          (specificPreset[preset] || (specificPreset[preset] = [])).push(component);
        });
      }
    });

    this._data = {
      specificPreset,
      allPresets
    };

    this._listeners.forEach(cb => {
      try {
        cb(this._data);
      } catch (e) {
        // do nothing
      }
    });
  }

  /**
   * listen to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _listen = (cb): void => {
    try {
      cb(this._data);
    } catch (e) {
      // do nothing
    }
    this._listeners.push(cb);
  };

  /**
   * remove listener to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _unlisten = (cb): void => {
    const index = this._listeners.indexOf(cb);
    if (index === -1) {
      return;
    }
    this._listeners.splice(index, 1);
  };

  /**
   *
   * @returns {void}
   */
  getChildContext() {
    // Notice: the listen/unlisten methods are used instead of passing the data directly
    // as it appears that context changes doesnt re-render the components.
    return {
      presetData: {
        listen: this._listen,
        unlisten: this._unlisten
      }
    };
  }

  /**
   * render provider
   * @param {any} props - params
   * @returns {void}
   */
  render(props: any) {
    return props.children[0];
  }
}
