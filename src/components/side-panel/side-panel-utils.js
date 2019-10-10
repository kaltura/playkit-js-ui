import {SidePanelModes, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';

const minimumVideoWidth = 150; // TODO sakal get actual width from Oren
const minimumVideoHeight = 150; // TODO sakal get actual width from Oren

/**
 * Calculate dimensions of video based on vertical side panels
 *
 * @param {*} options player state
 * @return {Object} dimensions
 */
function calculateVerticalDimensions(options) {
  const {sidePanelsSizes, sidePanelsModes, playerClientRect, isVideo} = options;
  const sizes = sidePanelsSizes[SidePanelOrientation.VERTICAL];
  const playerWidth = playerClientRect.width;
  let verticalPanelWidth = Math.max(sizes.min, Math.min(sizes.max, playerWidth * sizes.ratio));

  const leftSidePanelMode = sidePanelsModes[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanelsModes[SidePanelPositions.RIGHT];
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
 * @param {*} options player state
 * @return {Object} dimensions
 */
function calculateHorizontalDimensions(options) {
  const {sidePanelsSizes, sidePanelsModes, playerClientRect, isVideo} = options;
  const sizes = sidePanelsSizes[SidePanelOrientation.HORIZONTAL];
  const playerHeight = playerClientRect.height;
  let horizontalPanelHeight = Math.max(sizes.min, Math.min(sizes.max, playerHeight * sizes.ratio));

  const topSidePanelMode = sidePanelsModes[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanelsModes[SidePanelPositions.BOTTOM];
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
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculateVideoStyles(options) {
  // Video element cares only for side panels that are side to video

  const {sidePanelsModes} = options;
  const result = {};
  const leftSidePanelMode = sidePanelsModes[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanelsModes[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanelsModes[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanelsModes[SidePanelPositions.BOTTOM];

  if (leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
    const {verticalPanelWidth, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

    result['left'] = leftSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? verticalPanelWidth : 0;
    result['width'] = videoWidth;
    result['position'] = 'absolute';
  }

  if (topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO || bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO) {
    const {horizontalPanelHeight, videoHeight} = calculateHorizontalDimensions({...options, isVideo: true});

    result['top'] = topSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
    result['bottom'] = bottomSidePanelMode === SidePanelModes.ALONG_SIDE_THE_VIDEO ? horizontalPanelHeight : 0;
    result['height'] = videoHeight;
    result['position'] = 'absolute';
  }
  return result;
}

/**
 * Calculate styles of preset element based on side panels mode
 *
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculatePresetAreaStyles(options) {
  // TODO sakal method rename
  const {sidePanelsModes, playerClientRect} = options;
  const areaStyle = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};
  let areaWidth = playerClientRect.width;
  let areaHeight = playerClientRect.height;
  const leftSidePanelMode = sidePanelsModes[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanelsModes[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanelsModes[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanelsModes[SidePanelPositions.BOTTOM];

  if (leftSidePanelMode !== SidePanelModes.HIDDEN || rightSidePanelMode !== SidePanelModes.HIDDEN) {
    const {verticalPanelWidth} = calculateVerticalDimensions(options);

    if (leftSidePanelMode !== SidePanelModes.HIDDEN) {
      areaStyle['left'] = verticalPanelWidth;
    }
    if (rightSidePanelMode !== SidePanelModes.HIDDEN) {
      areaStyle['right'] = verticalPanelWidth;
    }
  }

  if (topSidePanelMode !== SidePanelModes.HIDDEN || bottomSidePanelMode !== SidePanelModes.HIDDEN) {
    const {horizontalPanelHeight} = calculateHorizontalDimensions(options);

    if (topSidePanelMode !== SidePanelModes.HIDDEN) {
      areaStyle['top'] = horizontalPanelHeight;
    }
    if (bottomSidePanelMode !== SidePanelModes.HIDDEN) {
      areaStyle['bottom'] = horizontalPanelHeight;
    }
  }

  areaWidth = areaWidth - areaStyle['right'] - areaStyle['left'];
  areaHeight = areaHeight - areaStyle['top'] - areaStyle['bottom'];
  return {style: areaStyle, height: areaHeight, width: areaWidth};
}

/**
 * Calculate styles of vertical side panel element based on side panels mode
 *
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculateSidePanelStyles(options) {
  const {position, sidePanelsModes} = options;
  const leftSidePanelMode = sidePanelsModes[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanelsModes[SidePanelPositions.RIGHT];
  const topSidePanelMode = sidePanelsModes[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanelsModes[SidePanelPositions.BOTTOM];

  const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;

  if (isVertical) {
    const result = {};
    const {verticalPanelWidth} = calculateVerticalDimensions(options);
    result['width'] = verticalPanelWidth;

    if (position === SidePanelPositions.RIGHT) {
      if (rightSidePanelMode === SidePanelModes.HIDDEN) {
        result['right'] = -verticalPanelWidth;
        result['opacity'] = 0;
      } else {
        result['right'] = 0;
        result['opacity'] = 1;
      }
      return result;
    }

    if (leftSidePanelMode === SidePanelModes.HIDDEN) {
      result['left'] = -verticalPanelWidth;
      result['opacity'] = 0;
    } else {
      result['left'] = 0;
      result['opacity'] = 1;
    }

    return result;
  }

  const result = {};
  const {horizontalPanelHeight} = calculateHorizontalDimensions(options);
  const {verticalPanelWidth} = calculateVerticalDimensions(options);

  result['height'] = horizontalPanelHeight;

  if (position === SidePanelPositions.TOP) {
    if (topSidePanelMode === SidePanelModes.HIDDEN) {
      result['top'] = -horizontalPanelHeight;
      result['opacity'] = 0;
    } else {
      result['top'] = 0;
      result['opacity'] = 1;
    }
    return result;
  }

  if (bottomSidePanelMode === SidePanelModes.HIDDEN) {
    result['bottom'] = -verticalPanelWidth;
    result['opacity'] = 0;
  } else {
    result['bottom'] = 0;
    result['opacity'] = 1;
  }

  return result;
}
