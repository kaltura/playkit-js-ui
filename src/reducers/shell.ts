/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import isEqual from '../utils/is-equal';
import {LayoutStyles, PresetSettings, ShellState} from '../types/reducers/shell';

export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PLAYER_SIZE: 'shell/UPDATE_PLAYER_SIZE',
  UPDATE_IS_SMALL_SIZE: 'shell/UPDATE_IS_SMALL_SIZE',
  UPDATE_GUI_CLIENT_RECT: 'shell/UPDATE_GUI_CLIENT_RECT',
  UPDATE_PLAYER_CLIENT_RECT: 'shell/UPDATE_PLAYER_CLIENT_RECT',
  UPDATE_VIDEO_CLIENT_RECT: 'shell/UPDATE_VIDEO_CLIENT_RECT',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE',
  UPDATE_PLAYER_NAV_STATE: 'shell/UPDATE_PLAYER_NAV_STATE',
  UPDATE_SMART_CONTAINER_OPEN: 'shell/UPDATE_SMART_CONTAINER_OPEN',
  UPDATE_ACTIVE_PRESET_NAME: 'shell/UPDATE_ACTIVE_PRESET_NAME',
  UPDATE_SIDE_PANEL_MODE: 'shell/UPDATE_SIDE_PANEL_MODE',
  UPDATE_SIDE_PANEL_SIZE: 'shell/UPDATE_SIDE_PANEL_SIZE',
  UPDATE_PRESET_SETTINGS: 'shell/UPDATE_PRESET_SETTINGS',
  UPDATE_LAYOUT_STYLES: 'shell/UPDATE_LAYOUT_STYLES'
};

export const SidePanelOrientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const SidePanelPositions = {
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom',
  RIGHT: 'right'
} as const;

export const SidePanelModes = {
  ALONGSIDE: 'alongside',
  HIDDEN: 'hidden',
  OVER: 'over'
};

export const ReservedPresetNames = {
  Playback: 'Playback',
  Live: 'Live',
  Ads: 'Ads',
  Error: 'Error',
  Idle: 'Idle',
  Img: 'Img'
};

export const ReservedPresetAreas = {
  PlayerArea: 'PlayerArea',
  PresetArea: 'PresetArea',
  InteractiveArea: 'InteractiveArea',
  VideoArea: 'VideoArea',
  GuiArea: 'GuiArea',
  TopBar: 'TopBar',
  BottomBar: 'BottomBar',
  PresetFloating: 'PresetFloating',
  TopBarLeftControls: 'TopBarLeftControls',
  TopBarRightControls: 'TopBarRightControls',
  BottomBarLeftControls: 'BottomBarLeftControls',
  BottomBarRightControls: 'BottomBarRightControls',
  SidePanelTop: 'SidePanelTop',
  SidePanelLeft: 'SidePanelLeft',
  SidePanelRight: 'SidePanelRight',
  SidePanelBottom: 'SidePanelBottom',
  SeekBar: 'SeekBar',
  LoadingSpinner: 'LoadingSpinner'
};

/**
 * @return {Object} - preset settings
 */
function createDefaultPresetSettings(): PresetSettings {
  return {
    allowSidePanels: false,
    allowPlayerArea: false
  };
}

const initialRect = {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0};
const initialLayoutStyle = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};

export const initialState = {
  playerClasses: [],
  guiClientRect: initialRect,
  playerClientRect: initialRect,
  videoClientRect: initialRect,
  layoutStyles: {
    video: initialLayoutStyle,
    gui: initialLayoutStyle,
    sidePanels: {
      [SidePanelPositions.LEFT]: {} as any,
      [SidePanelPositions.RIGHT]: {} as any,
      [SidePanelPositions.TOP]: {} as any,
      [SidePanelPositions.BOTTOM]: {} as any
    }
  },
  playerHover: false,
  playerNav: false,
  smartContainerOpen: false,
  activePresetName: '',
  sidePanelsModes: {
    [SidePanelPositions.LEFT]: SidePanelModes.HIDDEN,
    [SidePanelPositions.RIGHT]: SidePanelModes.HIDDEN,
    [SidePanelPositions.TOP]: SidePanelModes.HIDDEN,
    [SidePanelPositions.BOTTOM]: SidePanelModes.HIDDEN
  },
  sidePanelsSizes: {
    [SidePanelOrientation.VERTICAL]: {min: 240, max: 480, ratio: 0.33},
    [SidePanelOrientation.HORIZONTAL]: {min: 144, max: 288, ratio: 0.33}
  },
  presetSettings: createDefaultPresetSettings()
};

export default (state: ShellState = initialState, action: any) => {
  switch (action.type) {
  case types.ADD_PLAYER_CLASS:
    if (state.playerClasses.includes(action.className)) return state;
    return {
      ...state,
      playerClasses: [...state.playerClasses, action.className]
    };

  case types.REMOVE_PLAYER_CLASS:
    return {
      ...state,
      playerClasses: state.playerClasses.filter(c => c !== action.className)
    };

  case types.UPDATE_IS_MOBILE:
    return {
      ...state,
      isMobile: action.isMobile
    };

  case types.UPDATE_PLAYER_SIZE:
    return {
      ...state,
      playerSize: action.playerSize
    };

  case types.UPDATE_IS_SMALL_SIZE:
    return {
      ...state,
      isSmallSize: action.isSmallSize
    };

  case types.UPDATE_GUI_CLIENT_RECT:
    return {
      ...state,
      guiClientRect: action.guiClientRect
    };

  case types.UPDATE_PLAYER_CLIENT_RECT:
    return {
      ...state,
      playerClientRect: action.playerClientRect
    };

  case types.UPDATE_LAYOUT_STYLES: {
    const {sidePanels: currentSidePanelsStyle, video: currentVideoStyle, gui: currentGuiStyle} = state.layoutStyles;
    const {sidePanels: nextSidePanelsStyle, video: nextVideoStyle, gui: nextGuiStyle} = action.layoutStyles;
    return {
      ...state,
      layoutStyles: {
        sidePanels: {
          [SidePanelPositions.LEFT]: isEqual(currentSidePanelsStyle[SidePanelPositions.LEFT], nextSidePanelsStyle[SidePanelPositions.LEFT])
            ? currentSidePanelsStyle[SidePanelPositions.LEFT]
            : nextSidePanelsStyle[SidePanelPositions.LEFT],
          [SidePanelPositions.RIGHT]: isEqual(currentSidePanelsStyle[SidePanelPositions.RIGHT], nextSidePanelsStyle[SidePanelPositions.RIGHT])
            ? currentSidePanelsStyle[SidePanelPositions.RIGHT]
            : nextSidePanelsStyle[SidePanelPositions.RIGHT],
          [SidePanelPositions.TOP]: isEqual(currentSidePanelsStyle[SidePanelPositions.TOP], nextSidePanelsStyle[SidePanelPositions.TOP])
            ? currentSidePanelsStyle[SidePanelPositions.TOP]
            : nextSidePanelsStyle[SidePanelPositions.TOP],
          [SidePanelPositions.BOTTOM]: isEqual(currentSidePanelsStyle[SidePanelPositions.BOTTOM], nextSidePanelsStyle[SidePanelPositions.BOTTOM])
            ? currentSidePanelsStyle[SidePanelPositions.BOTTOM]
            : nextSidePanelsStyle[SidePanelPositions.BOTTOM]
        },
        video: isEqual(currentVideoStyle, nextVideoStyle) ? currentVideoStyle : nextVideoStyle,
        gui: isEqual(currentGuiStyle, nextGuiStyle) ? currentGuiStyle : nextGuiStyle
      }
    };
  }

  case types.UPDATE_VIDEO_CLIENT_RECT:
    return {
      ...state,
      videoClientRect: action.videoClientRect
    };

  case types.UPDATE_DOCUMENT_WIDTH:
    return {
      ...state,
      documentWidth: action.documentWidth
    };

  case types.UPDATE_PLAYER_HOVER_STATE:
    return {
      ...state,
      playerHover: action.hover
    };

  case types.UPDATE_PLAYER_NAV_STATE:
    return {
      ...state,
      playerNav: action.nav
    };

  case types.UPDATE_SMART_CONTAINER_OPEN:
    return {
      ...state,
      smartContainerOpen: action.open
    };

  case types.UPDATE_ACTIVE_PRESET_NAME:
    return {
      ...state,
      activePresetName: action.activePresetName
    };

  case types.UPDATE_SIDE_PANEL_MODE:
    return {
      ...state,
      sidePanelsModes: {
        ...state.sidePanelsModes,
        [action.position]: action.sidePanelMode
      }
    };

  case types.UPDATE_SIDE_PANEL_SIZE: {
    const {ratio, min, max} = action.options;
    const prevValues = state.sidePanelsSizes[action.orientation];
    const newSizes = {
      ratio: typeof ratio === 'number' && ratio <= 1 ? ratio : prevValues.ratio,
      min: typeof min === 'number' ? min : prevValues.min,
      max: typeof max === 'number' ? max : prevValues.max
    };
    return {
      ...state,
      sidePanelsSizes: {
        ...state.sidePanelsSizes,
        [action.orientation]: newSizes
      }
    };
  }

  case types.UPDATE_PRESET_SETTINGS:
    return {
      ...state,
      presetSettings: {
        ...createDefaultPresetSettings(),
        ...(action.presetSettings || {})
      }
    };

  default:
    return state;
  }
};

export const actions = {
  addPlayerClass: (className: string) => ({type: types.ADD_PLAYER_CLASS, className}),
  removePlayerClass: (className: string) => ({type: types.REMOVE_PLAYER_CLASS, className}),
  updateIsMobile: (isMobile: boolean) => ({type: types.UPDATE_IS_MOBILE, isMobile}),
  updatePlayerSize: (playerSize: string) => ({type: types.UPDATE_PLAYER_SIZE, playerSize}),
  updateIsSmallSize: (isSmallSize: boolean) => ({type: types.UPDATE_IS_SMALL_SIZE, isSmallSize}),
  updateGuiClientRect: (guiClientRect: any) => ({type: types.UPDATE_GUI_CLIENT_RECT, guiClientRect}),
  updatePlayerClientRect: (playerClientRect: any) => ({type: types.UPDATE_PLAYER_CLIENT_RECT, playerClientRect}),
  updateVideoClientRect: (videoClientRect: any) => ({type: types.UPDATE_VIDEO_CLIENT_RECT, videoClientRect}),
  updateDocumentWidth: (documentWidth: number) => ({type: types.UPDATE_DOCUMENT_WIDTH, documentWidth}),
  updatePlayerHoverState: (hover: boolean) => ({type: types.UPDATE_PLAYER_HOVER_STATE, hover}),
  updatePlayerNavState: (nav: boolean) => ({type: types.UPDATE_PLAYER_NAV_STATE, nav}),
  updateSmartContainerOpen: (open: boolean) => ({type: types.UPDATE_SMART_CONTAINER_OPEN, open}),
  updateActivePresetName: (activePresetName: string) => ({type: types.UPDATE_ACTIVE_PRESET_NAME, activePresetName}),
  updateSidePanelMode: (position: string, sidePanelMode: string) => ({
    type: types.UPDATE_SIDE_PANEL_MODE,
    position,
    sidePanelMode
  }),
  updateSidePanelSize: (orientation: string, options: any) => ({
    type: types.UPDATE_SIDE_PANEL_SIZE,
    orientation,
    options
  }),
  updatePresetSettings: (presetSettings: PresetSettings) => ({type: types.UPDATE_PRESET_SETTINGS, presetSettings}),
  updateLayoutStyles: (layoutStyles: LayoutStyles) => ({
    type: types.UPDATE_LAYOUT_STYLES,
    layoutStyles
  })
};
