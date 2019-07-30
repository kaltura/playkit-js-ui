// @flow
import {Component, h} from 'preact';
import getLogger from '../../utils/logger';
import {SidePanelModes, SidePanelPositions} from '../../reducers/shell';
import {connect} from 'preact-redux';

const logger = getLogger('UIPresetsProvider');

const sidePanelRatio = 0.33;
const minimumVideoWidth = 100; // TODO sakal get actual width from Oren
const minimumVideoHeight = 100; // TODO sakal get actual width from Oren

let sakalcount = 1;
/**
 * Calculate dimensions of video based on vertical side panels
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object, isVideo: boolean}} options player state
 * @return {Object} dimensions
 */
function calculateVerticalDimensions(options) {
  const {minSidePanelWidth, maxSidePanelWidth, sidePanels, playerClientRect, isVideo} = options;
  const playerWidth = playerClientRect.width;
  let verticalPanelWidth = Math.max(minSidePanelWidth, Math.min(maxSidePanelWidth, playerWidth * sidePanelRatio));

  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
  let verticalPanelCount;
  if (isVideo) {
    verticalPanelCount =
      leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO && rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? 2 : 1;
  } else {
    verticalPanelCount = leftSidePanelMode !== SidePanelModes.HIDDEN && rightSidePanelMode !== SidePanelModes.HIDDEN ? 2 : 1;
  }

  let videoWidth = playerWidth - verticalPanelCount * verticalPanelWidth;

  if (videoWidth < minimumVideoWidth) {
    videoWidth = minimumVideoWidth;
    verticalPanelWidth = (playerWidth - videoWidth) / verticalPanelCount;
  }
  return {verticalPanelWidth, videoWidth, verticalPanelCount};
}

/**
 * Calculate dimensions of video based on horizontal side panels
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object, isVideo: boolean}} options player state
 * @return {Object} dimensions
 */
function calculateHorizontalDimensions(options) {
  // TODO sakal from args
  const horizontalMinHeight = 144;
  // const isFullScreen = false; // TODO sakal what to do with full screen (DANA)
  const {sidePanels, playerClientRect, isVideo} = options;
  const playerHeight = playerClientRect.height;
  let horizontalPanelHeight = Math.max(horizontalMinHeight, playerHeight * sidePanelRatio);

  const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];
  let horizontalPanelCount;
  if (isVideo) {
    horizontalPanelCount =
      topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO && bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? 2 : 1;
  } else {
    horizontalPanelCount = topSidePanelMode !== SidePanelModes.HIDDEN && bottomSidePanelMode !== SidePanelModes.HIDDEN ? 2 : 1;
  }

  let videoHeight = playerHeight - horizontalPanelCount * horizontalPanelHeight;

  if (videoHeight < minimumVideoHeight) {
    videoHeight = minimumVideoHeight;
    horizontalPanelHeight = (playerHeight - videoHeight) / horizontalPanelCount;
  }

  return {horizontalPanelHeight, videoHeight, horizontalPanelCount};
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  playerClientRect: state.shell.playerClientRect
});

@connect(mapStateToProps)
/**
 *  A provider of injected preset components configuration
 */
class UIPresetsProvider extends Component {
  static defaultProps = {
    maxSidePanelWidth: 480,
    minSidePanelWidth: 240
  };

  _sidePanelPropsUpdateRef = {c:sakalcount};

  /**
   * component did update
   * @param {*} previousProps previousProps
   * @return {void}
   */
  componentDidUpdate(previousProps: PropsType): void {
    const sidePanelAffected =
      this.props.sidePanels !== previousProps.sidePanels ||
      this.props.sidePanelsAllowed !== previousProps.sidePanelsAllowed ||
      this.props.playerClientRect !== previousProps.playerClientRect;

    if (!sidePanelAffected) {
      return;
    }

    sakalcount++;
    this._sidePanelPropsUpdateRef = {c:sakalcount};
  }

  /**
   * constructor
   * @return {void}
   */
  constructor() {
    super();
    this._listeners = [];
    this._presetsComponents = {};
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    const presetsComponents = {};
    (this.props.uiComponents || []).forEach(component => {
      if (!component.render || !component.container || !component.presets) {
        logger.warn(
          `preset with label '${component.label ||
            ''}' configuration is invalid, missing required configuration (did you remember to set 'container', 'presets' and 'render'?)`
        );
        return;
      }

      component.presets.forEach(preset => {
        (presetsComponents[preset] || (presetsComponents[preset] = [])).push(component);
      });
    });

    this._presetsComponents = presetsComponents;

    this._listeners.forEach(cb => {
      try {
        cb(this._presetsComponents);
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
      cb(this._presetsComponents);
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
      presetComponentsStore: {
        listen: this._listen,
        unlisten: this._unlisten,
        calculateSidePanelStyles: this.calculateSidePanelStyles,
        calculateVideoStyles: this.calculateVideoStyles,
        calculatePresetChildStyles: this.calculatePresetChildStyles,
        sidePanelPropsUpdateRef: this._sidePanelPropsUpdateRef
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

  /**
   * Calculate styles of vertical side panel element based on side panels mode
   *
   * @param {string} position position
   * @return {Object} styles as hashtable
   */
  calculateSidePanelStyles = position => {
    if (!this.props.sidePanelsAllowed || !position) {
      return {};
    }

    const {sidePanels} = this.props;
    const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
    const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
    const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
    const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;

    if (isVertical) {
      if (leftSidePanelMode === SidePanelModes.HIDDEN && rightSidePanelMode === SidePanelModes.HIDDEN) {
        return {};
      }

      const {verticalPanelWidth} = calculateVerticalDimensions(this.props);
      const result = {};
      result['left'] = position === SidePanelPositions.LEFT ? 0 : 'auto';
      result['right'] = position === SidePanelPositions.RIGHT ? 0 : 'auto';
      result['width'] = verticalPanelWidth;
      return result;
    }

    if (topSidePanelMode === SidePanelModes.HIDDEN && bottomSidePanelMode === SidePanelModes.HIDDEN) {
      return {};
    }

    const {horizontalPanelHeight} = calculateHorizontalDimensions(this.props);
    const {verticalPanelWidth} = calculateVerticalDimensions(this.props);
    const result = {};
    result['top'] = position === SidePanelPositions.TOP ? 0 : 'auto';
    result['bottom'] = position === SidePanelPositions.BOTTOM ? 0 : 'auto';
    result['height'] = horizontalPanelHeight;
    result['left'] = leftSidePanelMode !== SidePanelModes.HIDDEN ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode !== SidePanelModes.HIDDEN ? verticalPanelWidth : 0;
    return result;
  };

  /**
   * Calculate styles of video elements based on side panels mode
   *
   * @return {Object} styles as hashtable
   */
  calculateVideoStyles = () => {
    // Video element cares only for side panels that are side to video

    if (!this.props.sidePanelsAllowed) {
      return {};
    }

    const {sidePanels} = this.props;
    const result = {};
    const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
    const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
    const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
    const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

    if (leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
      const {verticalPanelWidth, videoWidth} = calculateVerticalDimensions({...this.props, isVideo: true});

      result['left'] = leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
      result['right'] = rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
      result['width'] = videoWidth;
    }

    if (topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
      const {horizontalPanelHeight, videoHeight} = calculateHorizontalDimensions({...this.props, isVideo: true});

      result['top'] = topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
      result['bottom'] = bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
      result['height'] = videoHeight;
    }
    return result;
  };

  /**
   * Calculate styles of preset element based on side panels mode
   *
   * @param {string} anchor anchor
   * @return {Object} styles as hashtable
   */
  calculatePresetChildStyles = anchor => {
    // Preset children care only for side panels that are are on top of video, otherwise they are handled as part of the preset itself.

    if (!this.props.sidePanelsAllowed || ['TOP', 'BOTTOM'].indexOf(anchor) === -1) {
      return {};
    }

    const {sidePanels} = this.props;
    const result = {};
    const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
    const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
    const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
    const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

    if (leftSidePanelMode === SidePanelModes.OVER_THE_VIDEO || rightSidePanelMode === SidePanelModes.OVER_THE_VIDEO) {
      const {verticalPanelWidth} = calculateVerticalDimensions(this.props);

      result['left'] = leftSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? verticalPanelWidth : 0;
      result['right'] = rightSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? verticalPanelWidth : 0;
      result['width'] = 'auto';
    }

    if (topSidePanelMode === SidePanelModes.OVER_THE_VIDEO || bottomSidePanelMode === SidePanelModes.OVER_THE_VIDEO) {
      const {horizontalPanelHeight} = calculateHorizontalDimensions(this.props);

      if (anchor === 'TOP') {
        result['top'] = topSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? horizontalPanelHeight : 0;
      }

      if (anchor === 'BOTTOM') {
        result['bottom'] = bottomSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? horizontalPanelHeight : 0;
      }
    }
    return result;
  };
}

/**
 * connect decorator
 * @returns {function(*): *} connect
 */
const connectToUIPresetsStore = () => {
  return InnerComponent => {
    /**
     * store hoc
     */
    class UIPresetsStoreHOC extends Component {
      /**
       * render
       * @returns {*} component
       */
      render() {
        const presetComponentsStore = this.context.presetComponentsStore;
        const {sidePanelPropsUpdateRef} = presetComponentsStore;
        return <InnerComponent {...this.props} sidePanelPropsUpdateRef={sidePanelPropsUpdateRef} presetComponentsStore={presetComponentsStore} />;
      }
    }

    UIPresetsStoreHOC.displayName = `UIPresetsStoreConnect('${InnerComponent.displayName}')`;
    return UIPresetsStoreHOC;
  };
};

export {UIPresetsProvider, connectToUIPresetsStore};
