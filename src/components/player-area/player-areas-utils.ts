import {SidePanelModes, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';
import {PLAYER_BREAK_POINTS} from '../../components/shell/shell';

/**
 * Calculate dimensions of video based on vertical side panels
 *
 * @param {*} options player state
 * @return {Object} dimensions
 */
function calculateVerticalDimensions(options): any {
  const {sidePanelsSizes, sidePanelsModes, playerClientRect, isVideo} = options;
  const sizes = sidePanelsSizes[SidePanelOrientation.VERTICAL];
  const playerWidth = playerClientRect.width;
  let verticalPanelWidth = Math.max(sizes.min, Math.min(sizes.max, playerWidth * sizes.ratio));

  const leftSidePanelMode = sidePanelsModes[SidePanelPositions.LEFT];
  const rightSidePanelMode = sidePanelsModes[SidePanelPositions.RIGHT];
  let verticalPanelCount;
  if (isVideo) {
    verticalPanelCount = leftSidePanelMode === SidePanelModes.ALONGSIDE && rightSidePanelMode === SidePanelModes.ALONGSIDE ? 2 : 1;
  } else {
    verticalPanelCount = leftSidePanelMode !== SidePanelModes.HIDDEN && rightSidePanelMode !== SidePanelModes.HIDDEN ? 2 : 1;
  }

  let videoWidth = playerWidth - verticalPanelCount * verticalPanelWidth;

  if (playerWidth < PLAYER_BREAK_POINTS.SMALL) {
    videoWidth = playerWidth;
    verticalPanelWidth = playerWidth;
  }

  return {verticalPanelWidth, videoWidth, verticalPanelCount};
}

/**
 * Calculate dimensions of video based on horizontal side panels
 *
 * @param {*} options player state
 * @return {Object} dimensions
 */
function calculateHorizontalDimensions(options: any): any {
  const {sidePanelsSizes, sidePanelsModes, playerClientRect, isVideo} = options;
  const sizes = sidePanelsSizes[SidePanelOrientation.HORIZONTAL];
  const playerHeight = playerClientRect.height;
  let horizontalPanelHeight = Math.max(sizes.min, Math.min(sizes.max, playerHeight * sizes.ratio));

  const topSidePanelMode = sidePanelsModes[SidePanelPositions.TOP];
  const bottomSidePanelMode = sidePanelsModes[SidePanelPositions.BOTTOM];
  let horizontalPanelCount;
  if (isVideo) {
    horizontalPanelCount = topSidePanelMode === SidePanelModes.ALONGSIDE && bottomSidePanelMode === SidePanelModes.ALONGSIDE ? 2 : 1;
  } else {
    horizontalPanelCount = topSidePanelMode !== SidePanelModes.HIDDEN && bottomSidePanelMode !== SidePanelModes.HIDDEN ? 2 : 1;
  }

  let videoHeight = playerHeight - horizontalPanelCount * horizontalPanelHeight;

  if (playerClientRect.width < PLAYER_BREAK_POINTS.SMALL) {
    videoHeight = playerHeight;
    horizontalPanelHeight = playerHeight;
  }

  return {horizontalPanelHeight, videoHeight, horizontalPanelCount};
}

/**
 * Calculate styles of video elements based on side panels mode
 *
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculateVideoContainerStyles(options: any): any {
  // Video element cares only for side panels that are side to video

  const {sidePanelsModes, allowSidePanels} = options;
  const result = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};
  const leftSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.LEFT] : SidePanelModes.HIDDEN;
  const rightSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.RIGHT] : SidePanelModes.HIDDEN;
  const topSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.TOP] : SidePanelModes.HIDDEN;
  const bottomSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.BOTTOM] : SidePanelModes.HIDDEN;
  const {playerClientRect} = options;
  if (playerClientRect.width > PLAYER_BREAK_POINTS.SMALL) {
    if (leftSidePanelMode === SidePanelModes.ALONGSIDE || rightSidePanelMode === SidePanelModes.ALONGSIDE) {
      const {verticalPanelWidth, videoWidth} = calculateVerticalDimensions({...options, isVideo: true});

      result['left'] = leftSidePanelMode === SidePanelModes.ALONGSIDE ? verticalPanelWidth : 0;
      result['right'] = rightSidePanelMode === SidePanelModes.ALONGSIDE ? verticalPanelWidth : 0;
      result['width'] = videoWidth;
      result['position'] = 'absolute';
    }

    if (topSidePanelMode === SidePanelModes.ALONGSIDE || bottomSidePanelMode === SidePanelModes.ALONGSIDE) {
      const {horizontalPanelHeight, videoHeight} = calculateHorizontalDimensions({...options, isVideo: true});

      result['top'] = topSidePanelMode === SidePanelModes.ALONGSIDE ? horizontalPanelHeight : 0;
      result['bottom'] = bottomSidePanelMode === SidePanelModes.ALONGSIDE ? horizontalPanelHeight : 0;
      result['height'] = videoHeight;
      result['position'] = 'absolute';
    }
  }
  return result;
}

/**
 * Calculate styles of gui element based on side panels mode
 *
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculateGuiContainerStyles(options: any): any {
  const {sidePanelsModes, playerClientRect, allowSidePanels} = options;
  const areaStyle = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};
  let areaWidth = playerClientRect.width;
  let areaHeight = playerClientRect.height;
  const leftSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.LEFT] : SidePanelModes.HIDDEN;
  const rightSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.RIGHT] : SidePanelModes.HIDDEN;
  const topSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.TOP] : SidePanelModes.HIDDEN;
  const bottomSidePanelMode = allowSidePanels ? sidePanelsModes[SidePanelPositions.BOTTOM] : SidePanelModes.HIDDEN;

  if (playerClientRect.width > PLAYER_BREAK_POINTS.SMALL) {
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
  }

  const left = playerClientRect.left + (leftSidePanelMode !== SidePanelModes.HIDDEN ? areaStyle['left'] : 0);
  const top = playerClientRect.top + (topSidePanelMode !== SidePanelModes.HIDDEN ? areaStyle['top'] : 0);
  return {
    style: areaStyle,
    rect: {
      x: left,
      y: top,
      width: areaWidth,
      height: areaHeight,
      top,
      right: playerClientRect.right + (rightSidePanelMode !== SidePanelModes.HIDDEN ? areaStyle['right'] : 0),
      bottom: playerClientRect.bottom + (bottomSidePanelMode !== SidePanelModes.HIDDEN ? areaStyle['bottom'] : 0),
      left
    }
  };
}

/**
 * Calculate styles of vertical side panel element based on side panels mode
 *
 * @param {*} options player state
 * @return {Object} styles as hashtable
 */
export function calculateSidePanelStyles(options: any): any {
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

  if (leftSidePanelMode !== SidePanelModes.HIDDEN) {
    result['left'] = verticalPanelWidth;
  }

  if (rightSidePanelMode !== SidePanelModes.HIDDEN) {
    result['right'] = verticalPanelWidth;
  }

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
    result['bottom'] = -horizontalPanelHeight;
    result['opacity'] = 0;
  } else {
    result['bottom'] = 0;
    result['opacity'] = 1;
  }

  return result;
}
