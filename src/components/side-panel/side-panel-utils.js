import {SidePanelModes, SidePanelPositions} from '../../reducers/shell';

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

  if (leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
    const {verticalPanelWidth, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

    result['left'] = leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
    result['width'] = videoWidth;
  }

  if (topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
    const {horizontalPanelHeight, videoHeight} = calculateHorizontalDimensions({...options, isVideo: true});

    result['top'] = topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
    result['bottom'] = bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
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

  if (leftSidePanelMode === SidePanelModes.OVER_THE_VIDEO || rightSidePanelMode === SidePanelModes.OVER_THE_VIDEO) {
    const {verticalPanelWidth} = calculateVerticalDimensions(options);

    result['left'] = leftSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? verticalPanelWidth : 0;
    result['width'] = 'auto';
  }

  if (topSidePanelMode === SidePanelModes.OVER_THE_VIDEO || bottomSidePanelMode === SidePanelModes.OVER_THE_VIDEO) {
    const {horizontalPanelHeight} = calculateHorizontalDimensions(options);

    if (anchor === 'TOP') {
      result['top'] = topSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? horizontalPanelHeight : 0;
    }

    if (anchor === 'BOTTOM') {
      result['bottom'] = bottomSidePanelMode === SidePanelModes.OVER_THE_VIDEO ? horizontalPanelHeight : 0;
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
    if (leftSidePanelMode === SidePanelModes.HIDDEN && rightSidePanelMode === SidePanelModes.HIDDEN) {
      return {};
    }

    const {verticalPanelWidth} = calculateVerticalDimensions(options);
    const result = {};
    result['width'] = verticalPanelWidth;
    return result;
  }

  if (topSidePanelMode === SidePanelModes.HIDDEN && bottomSidePanelMode === SidePanelModes.HIDDEN) {
    return {};
  }

  const {horizontalPanelHeight} = calculateHorizontalDimensions(options);
  const {verticalPanelWidth} = calculateVerticalDimensions(options);
  const result = {};
  result['height'] = horizontalPanelHeight;
  result['left'] = leftSidePanelMode !== SidePanelModes.HIDDEN ? verticalPanelWidth : 0;
  result['right'] = rightSidePanelMode !== SidePanelModes.HIDDEN ? verticalPanelWidth : 0;
  return result;
}
