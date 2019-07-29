import {SidePanelModes, SidePanelPositions} from '../reducers/shell';

const sidePanelRatio = 0.33;
const minimumVideoWidth = 100; // TODO sakal get actual width from Oren
const minimumVideoHeight = 100; // TODO sakal get actual width from Oren

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
    verticalPanelCount = leftSidePanelMode === SidePanelModes.EXPANDED && rightSidePanelMode === SidePanelModes.EXPANDED ? 2 : 1;
  } else {
    verticalPanelCount = leftSidePanelMode !== SidePanelModes.COLLAPSED && rightSidePanelMode !== SidePanelModes.COLLAPSED ? 2 : 1;
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
    horizontalPanelCount = topSidePanelMode === SidePanelModes.EXPANDED && bottomSidePanelMode === SidePanelModes.EXPANDED ? 2 : 1;
  } else {
    horizontalPanelCount = topSidePanelMode !== SidePanelModes.COLLAPSED && bottomSidePanelMode !== SidePanelModes.COLLAPSED ? 2 : 1;
  }

  let videoHeight = playerHeight - horizontalPanelCount * horizontalPanelHeight;

  if (videoHeight < minimumVideoHeight) {
    videoHeight = minimumVideoHeight;
    horizontalPanelHeight = (playerHeight - videoHeight) / horizontalPanelCount;
  }

  return {horizontalPanelHeight, videoHeight, horizontalPanelCount};
}

/**
 * Calculate styles of video elements based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object, isVideo: boolean}} options player state
 * @return {Object} styles as hashtable
 */
export function calculateVideoStyles(options) {
  // Video element cares only for side panels that are side to video

  const {sidePanels} = options;
  const result = {};
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

  if (leftSidePanelMode === SidePanelModes.EXPANDED || rightSidePanelMode === SidePanelModes.EXPANDED) {
    const {verticalPanelWidth, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

    result['left'] = leftSidePanelMode === SidePanelModes.EXPANDED ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.EXPANDED ? verticalPanelWidth : 0;
    result['width'] = videoWidth;
  }

  if (topSidePanelMode === SidePanelModes.EXPANDED || bottomSidePanelMode === SidePanelModes.EXPANDED) {
    const {horizontalPanelHeight, videoHeight} = calculateHorizontalDimensions({...options, isVideo: true});

    result['top'] = topSidePanelMode === SidePanelModes.EXPANDED ? horizontalPanelHeight : 0;
    result['bottom'] = bottomSidePanelMode === SidePanelModes.EXPANDED ? horizontalPanelHeight : 0;
    result['height'] = videoHeight;
  }
  return result;
}

/**
 * Calculate styles of preset element based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculatePresetChildStyles(options) {
  // Preset children care only for side panels that are are on top of video, otherwise they are handled as part of the preset itself.

  const {sidePanels, anchor} = options;
  const result = {};
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

  if (leftSidePanelMode === SidePanelModes.PARTIAL || rightSidePanelMode === SidePanelModes.PARTIAL) {
    const {verticalPanelWidth} = calculateVerticalDimensions(options);

    result['left'] = leftSidePanelMode === SidePanelModes.PARTIAL ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.PARTIAL ? verticalPanelWidth : 0;
    result['width'] = 'auto';
  }

  if (topSidePanelMode === SidePanelModes.PARTIAL || bottomSidePanelMode === SidePanelModes.PARTIAL) {
    const {horizontalPanelHeight} = calculateHorizontalDimensions(options);

    if (anchor === 'TOP') {
      result['top'] = topSidePanelMode === SidePanelModes.PARTIAL ? horizontalPanelHeight : 0;
    }

    if (anchor === 'BOTTOM') {
      result['bottom'] = bottomSidePanelMode === SidePanelModes.PARTIAL ? horizontalPanelHeight : 0;
    }
  }
  return result;
}

/**
 * Calculate styles of vertical side panel element based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, position: SidePanelPositions, playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculateSidePanelStyles(options) {
  const {position, sidePanels} = options;
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];

  const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;

  if (isVertical) {
    if (leftSidePanelMode === SidePanelModes.COLLAPSED && rightSidePanelMode === SidePanelModes.COLLAPSED) {
      return {};
    }

    const {verticalPanelWidth} = calculateVerticalDimensions(options);
    const result = {};
    result['left'] = position === SidePanelPositions.LEFT ? 0 : 'auto';
    result['right'] = position === SidePanelPositions.RIGHT ? 0 : 'auto';
    result['width'] = verticalPanelWidth;
    return result;
  }

  if (topSidePanelMode === SidePanelModes.COLLAPSED && bottomSidePanelMode === SidePanelModes.COLLAPSED) {
    return {};
  }

  const {horizontalPanelHeight} = calculateHorizontalDimensions(options);
  const {verticalPanelWidth} = calculateVerticalDimensions(options);
  const result = {};
  result['top'] = position === SidePanelPositions.TOP ? 0 : 'auto';
  result['bottom'] = position === SidePanelPositions.BOTTOM ? 0 : 'auto';
  result['height'] = horizontalPanelHeight;
  result['left'] = leftSidePanelMode !== SidePanelModes.COLLAPSED ? verticalPanelWidth : 0;
  result['right'] = rightSidePanelMode !== SidePanelModes.COLLAPSED ? verticalPanelWidth : 0;
  return result;
}
