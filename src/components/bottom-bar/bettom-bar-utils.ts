import {PlaybackControls, PLAYER_BREAK_POINTS} from '../../components';

const SPATIAL_CONTROLS = {TimeDisplayPlaybackContainer: 107};

// eslint-disable-next-line require-jsdoc
export function calculateControlsSize(controls: string[], currentControlWidth: number, playerWidth: number, isPlaylist: boolean): number {
  let totalWidth = 0;
  let controlWidth = 0;
  for (const control of controls) {
    if (control in SPATIAL_CONTROLS) {
      controlWidth = SPATIAL_CONTROLS[control];
    } else if (control === PlaybackControls.displayName) {
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
  lowerPriorityControls: string[][]
): string[] {
  const numOfOverflowControls = Math.ceil((currentMinBreakPointWidth - currentBarWidth) / currentControlWidth);
  const controlsToRemove = lowerPriorityControls.flat().slice(0, numOfOverflowControls);
  const priorityPair: string[] = [...lowerPriorityControls].reverse().find(p => p.length > 1)!;
  if (controlsToRemove[controlsToRemove.length - 1] === priorityPair?.[0]) controlsToRemove.push(priorityPair[1]);
  return controlsToRemove;
}
