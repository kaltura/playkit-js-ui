//@flow
export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PLAYER_SIZE: 'shell/UPDATE_PLAYER_SIZE',
  UPDATE_PRESET_CLIENT_RECT: 'shell/UPDATE_PRESET_CLIENT_RECT',
  UPDATE_PLAYER_CLIENT_RECT: 'shell/UPDATE_PLAYER_CLIENT_RECT',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE',
  UPDATE_PLAYER_NAV_STATE: 'shell/UPDATE_PLAYER_NAV_STATE',
  UPDATE_BOTTOM_BAR_HOVER_ACTIVE: 'shell/UPDATE_BOTTOM_BAR_HOVER_ACTIVE',
  UPDATE_SMART_CONTAINER_OPEN: 'shell/UPDATE_SMART_CONTAINER_OPEN',
  UPDATE_ACTIVE_PRESET_NAME: 'shell/UPDATE_ACTIVE_PRESET_NAME',
  UPDATE_SIDE_PANEL_MODE: 'shell/UPDATE_SIDE_PANEL_MODE',
  UPDATE_SIDE_PANEL_SIZE: 'shell/UPDATE_SIDE_PANEL_SIZE',
  UPDATE_PRESET_SETTINGS: 'shell/UPDATE_PRESET_SETTINGS'
};

type PresetSettings = {|
  allowSidePanels: boolean
|};

export const SidePanelOrientation = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL'
};

export const SidePanelPositions = {
  LEFT: 'LEFT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT'
};

export const SidePanelModes = {
  ALONG_SIDE_THE_VIDEO: 'ALONG_SIDE_THE_VIDEO',
  HIDDEN: 'HIDDEN',
  OVER_THE_VIDEO: 'OVER_THE_VIDEO'
};

function createDefaultPresetSettings(): PresetSettings {
  return {
    allowSidePanels: false,
    allowPlayerArea: false,
    allowVideoArea: false
  };
}

export const initialState = {
  playerClasses: [],
  presetClientRect: {width: 0, height: 0}, // todo sakal oren decide if this is relevant
  playerClientRect: {width: 0, height: 0},
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

export default (state: Object = initialState, action: Object) => {
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

    case types.UPDATE_PRESET_CLIENT_RECT:
      return {
        ...state,
        presetClientRect: action.presetClientRect
      };

    case types.UPDATE_PLAYER_CLIENT_RECT:
      return {
        ...state,
        playerClientRect: action.playerClientRect
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

    case types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE:
      return {
        ...state,
        bottomBarHoverActive: action.active
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
      console.log('sakal UPDATE_PRESET_SETTINGS', action.presetSettings);
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
  updatePresetClientRect: (presetClientRect: Object) => ({type: types.UPDATE_PRESET_CLIENT_RECT, presetClientRect}),
  updatePlayerClientRect: (playerClientRect: Object) => ({type: types.UPDATE_PLAYER_CLIENT_RECT, playerClientRect}),
  updateDocumentWidth: (documentWidth: number) => ({type: types.UPDATE_DOCUMENT_WIDTH, documentWidth}),
  updatePlayerHoverState: (hover: boolean) => ({type: types.UPDATE_PLAYER_HOVER_STATE, hover}),
  updatePlayerNavState: (nav: boolean) => ({type: types.UPDATE_PLAYER_NAV_STATE, nav}),
  updateBottomBarHoverActive: (active: boolean) => ({type: types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE, active}),
  updateSmartContainerOpen: (open: boolean) => ({type: types.UPDATE_SMART_CONTAINER_OPEN, open}),
  updateActivePresetName: (activePresetName: string) => ({type: types.UPDATE_ACTIVE_PRESET_NAME, activePresetName}),
  updateSidePanelMode: (position: SidePanelPositions, sidePanelMode: SidePanelModes) => ({
    type: types.UPDATE_SIDE_PANEL_MODE,
    position,
    sidePanelMode
  }),
  updateSidePanelSize: (orientation: SidePanelOrientation, options) => ({
    type: types.UPDATE_SIDE_PANEL_SIZE,
    orientation,
    options
  }),
  updatePresetSettings: (presetSettings: PresetSettings) => ({type: types.UPDATE_PRESET_SETTINGS, presetSettings})
};
