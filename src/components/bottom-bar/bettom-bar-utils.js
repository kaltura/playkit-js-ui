//@flow

import {PLAYER_BREAK_POINTS} from 'components';

const SPATIAL_CONTROLS = {TimeDisplayPlaybackContainer: 107};

// eslint-disable-next-line require-jsdoc
export function calculateControlsSize(controls: string[], currentControlWidth: number, playerWidth: number, isPlaylist: boolean): number {
  let totalWidth = 0;
  let controlWidth = 0;
  for (let control of controls) {
    if (control in SPATIAL_CONTROLS) {
      controlWidth = SPATIAL_CONTROLS[control];
    } else if (control === 'PlaybackControls') {
      if (playerWidth > PLAYER_BREAK_POINTS.SMALL) {
        controlWidth = isPlaylist ? currentControlWidth * 3 : currentControlWidth;
      }
    } else {
      controlWidth = currentControlWidth;
    }
    totalWidth += controlWidth;
  }
  return totalWidth;
}

// eslint-disable-next-line require-jsdoc
export function filterControlsByPriority(
  currentMinBreakPointWidth: number,
  currentBarWidth: number,
  currentControlWidth: number,
  lowerPriorityControls: string[]
): number {
  let controlsToRemove = [];
  let newWidth = currentMinBreakPointWidth;
  let index = 0;
  while (newWidth >= currentBarWidth && index < lowerPriorityControls.length) {
    let reducedWidth = 0;
    lowerPriorityControls[index].forEach((control, subIndex) => {
      controlsToRemove.push(control);
      reducedWidth += currentControlWidth;
      if (subIndex > 0) {
        let restoredControl = controlsToRemove[index - subIndex];
        if (typeof restoredControl === 'string') {
          reducedWidth -= currentControlWidth;
          controlsToRemove.splice(index - subIndex, 1);
          lowerPriorityControls.splice(index + 1, 0, [restoredControl]);
        }
      }
    });
    newWidth -= reducedWidth;
    index++;
  }
  return controlsToRemove;
}
