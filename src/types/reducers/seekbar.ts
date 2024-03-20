export interface SeekbarSegment {
  id: string;
  isHovered?: boolean;
  endTime?: number;
}

export interface SeekbarClientRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SeekbarState {
  currentTime: number;
  virtualTime: number;
  draggingActive: boolean;
  hoverActive: boolean;
  previewHoverActive: boolean;
  clientRect: SeekbarClientRect;
  hidePreview: boolean;
  hideTimeBubble: boolean;
  segments: SeekbarSegment[];
  seekbarClasses: string[];
  isPreventSeek: boolean;
}
