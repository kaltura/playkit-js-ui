import {SidePanelModes, SidePanelPositions} from '../reducers/shell';

const sidePanelRatio = 0.33;
const minimumVideoWidth = 100; // TODO sakal get actual width from Oren
//const minimumVideoHeight = 100; // TODO sakal get actual width from Oren

/**
 * Calculate dimensions of video based on vertical side panels
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object, isVideo: boolean}} options player state
 * @return {Object} dimensions
 */
function calculateVerticalDimensions(options) {
  const {minSidePanelWidth, maxSidePanelWidth, sidePanels, playerClientRect, isVideo} = options;
  const playerWidth = playerClientRect.width;
  let sidePanelSize = Math.max(minSidePanelWidth, Math.min(maxSidePanelWidth, playerWidth * sidePanelRatio));

  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];
  let verticalPanelCount;
  if (isVideo) {
    verticalPanelCount = leftSidePanelMode === SidePanelModes.EXPANDED && rightSidePanelMode === SidePanelModes.EXPANDED ? 2 : 1;
  } else {
    verticalPanelCount = leftSidePanelMode !== SidePanelModes.COLLAPSED && rightSidePanelMode !== SidePanelModes.COLLAPSED ? 2 : 1;
  }

  let videoWidth = playerWidth - verticalPanelCount * sidePanelSize;

  if (videoWidth < minimumVideoWidth) {
    videoWidth = minimumVideoWidth;
    sidePanelSize = (playerWidth - videoWidth) / verticalPanelCount;
  }

  // eslint-disable-next-line no-console
  console.log(`sakal calculateVerticalDimensions`, {options, sidePanelSize, videoWidth, verticalPanelCount});
  return {sidePanelSize, videoWidth, verticalPanelCount};
}

/**
 * Calculate dimensions of video based on horizontal side panels
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object, isVideo: boolean}} options player state
 * @return {Object} dimensions
 */
// function calculateHorizontalDimensions(options) {
//   // TODO sakal from args
//   const horizontalMinHeight = 144;
//   // const isFullScreen = false; // TODO sakal what to do with full screen (DANA)
//   const {sidePanels, playerClientRect, isVideo} = options;
//   const playerHeight = playerClientRect.height;
//   let horizontalPanelHeight = Math.max(horizontalMinHeight, playerHeight * sidePanelRatio);
//
//   const topSidePanelMode = sidePanels[SidePanelPositions.TOP];
//   const bottomSidePanelMode = sidePanels[SidePanelPositions.BOTTOM];
//   let horizontalPanelCount;
//   if (isVideo) {
//     horizontalPanelCount = topSidePanelMode === SidePanelModes.EXPANDED && bottomSidePanelMode === SidePanelModes.EXPANDED ? 2 : 1;
//   } else {
//     horizontalPanelCount = topSidePanelMode !== SidePanelModes.COLLAPSED && bottomSidePanelMode !== SidePanelModes.COLLAPSED ? 2 : 1;
//   }
//
//   let videoHeight = playerHeight - horizontalPanelCount * horizontalPanelHeight;
//
//   if (videoHeight < minimumVideoHeight) {
//     videoHeight = minimumVideoHeight;
//     horizontalPanelHeight = (playerHeight - videoHeight) / horizontalPanelCount;
//   }
//
//   return {horizontalPanelHeight, videoHeight, horizontalPanelCount};
// }

/**
 * Calculate styles of video element based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculateVideoStyles(options) {
  const {sidePanels} = options;
  const result = {};
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];

  if (leftSidePanelMode === SidePanelModes.EXPANDED || rightSidePanelMode === SidePanelModes.EXPANDED) {
    const {sidePanelSize, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

    result['left'] = leftSidePanelMode === SidePanelModes.EXPANDED ? sidePanelSize : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.EXPANDED ? sidePanelSize : 0;
    result['width'] = videoWidth;
  }

  // eslint-disable-next-line no-console
  console.log(`sakal calculateVideoStyles`, {options, result});
  return result;
}

/**
 * Calculate styles of preset based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number,  playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculatePresetStyles(options) {
  // TODO sakal decide if needed!!
  const {sidePanels} = options;
  const result = {};
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];

  if (leftSidePanelMode === SidePanelModes.EXPANDED || rightSidePanelMode === SidePanelModes.EXPANDED) {
    const {sidePanelSize, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

    result['left'] = leftSidePanelMode === SidePanelModes.EXPANDED ? sidePanelSize : 0;
    result['right'] = rightSidePanelMode === SidePanelModes.EXPANDED ? sidePanelSize : 0;
    result['width'] = videoWidth;
    result['height'] = '100%';
  }

  // eslint-disable-next-line no-console
  console.log(`sakal calculateVideoStyles`, {options, result});
  return result;
}

/**
 * Calculate styles of bar element based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number,  playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculateBarStyles(options) {
  const {sidePanels} = options;
  const result = {};
  const leftSidePanelMode = sidePanels[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanels[SidePanelPositions.RIGHT];

  if (leftSidePanelMode !== SidePanelModes.COLLAPSED || rightSidePanelMode !== SidePanelModes.COLLAPSED) {
    const {sidePanelSize, videoWidth} = calculateVerticalDimensions({...options, isVideo: false});

    result['left'] = leftSidePanelMode !== SidePanelModes.COLLAPSED ? sidePanelSize : 0;
    result['right'] = rightSidePanelMode !== SidePanelModes.COLLAPSED ? sidePanelSize : 0;
    result['width'] = videoWidth;

    // eslint-disable-next-line no-console
    console.log(`sakal calculateBarStyles`, {options, result, sidePanelSize, videoWidth});
  }

  return result;
}

/**
 * Calculate styles of vertical side panel element based on side panels mode
 *
 * @param {{minSidePanelWidth: number, maxSidePanelWidth: number, position: SidePanelPositions, playerClientRect: Object}} options player state
 * @return {Object} styles as hashtable
 */
export function calculateVerticalSidePanelStyles(options) {
  const {position} = options;
  const result = {};

  const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;

  const {sidePanelSize} = calculateVerticalDimensions({...options, isVideo: false});

  if (isVertical) {
    result['left'] = position === SidePanelPositions.LEFT ? 0 : 'auto';
    result['right'] = position === SidePanelPositions.RIGHT ? 0 : 'auto';
    result['width'] = sidePanelSize;
  } else {
    result['top'] = position === SidePanelPositions.TOP ? 0 : 'auto';
    result['bottom'] = position === SidePanelPositions.BOTTOM ? 0 : 'auto';
  }

  // eslint-disable-next-line no-console
  console.log(`sakal calculateVerticalSidePanelStyles`, {options, result});
  return result;
}
