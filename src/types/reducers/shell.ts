export type LayoutStyles = {
  sidePanels: {
    top: any,
    bottom: any,
    left: any,
    right: any
  },
  video: any,
  gui: any
};

export type PresetSettings = {
  allowSidePanels: boolean,
  allowPlayerArea: boolean
};

export interface ShellState {
  playerClasses: string[];
  isMobile?: boolean;
  playerSize?: string;
  isSmallSize?: boolean;
  guiClientRect: any; // Consider defining a more specific type
  playerClientRect: any; // Consider defining a more specific type
  videoClientRect: any; // Consider defining a more specific type
  layoutStyles: LayoutStyles;
  playerHover: boolean;
  playerNav: boolean;
  smartContainerOpen: boolean;
  activePresetName: string;
  sidePanelsModes: {[key: string]: string};
  sidePanelsSizes: {[key: string]: any}; // Consider defining a more specific type
  presetSettings: PresetSettings;
  documentWidth?: number;
}
