// eslint-disable-next-line require-jsdoc
export function filterControlsByPriority(
  currentMinBreakPointWidth: number,
  currentBarWidth: number,
  currentControlWidth: number,
  lowerPriorityControls: string[][]
): string[] {
  const numOfOverflowControls = Math.ceil((currentMinBreakPointWidth - currentBarWidth) / currentControlWidth) || 1;
  const controlsToRemove = lowerPriorityControls.flat().slice(0, numOfOverflowControls);
  const priorityPair: string[] = [...lowerPriorityControls].reverse().find(p => p.length > 1)!;
  if (controlsToRemove[controlsToRemove.length - 1] === priorityPair?.[0]) {
    controlsToRemove.push(priorityPair[1]);
  }
  return controlsToRemove;
}
