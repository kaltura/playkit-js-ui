import {UIManager} from './ui-manager';
import * as preact from 'preact';
import * as redux from 'react-redux';
import * as preacti18n from 'preact-i18n';
import * as preactHooks from 'preact/hooks';
// ui reducers
import * as Reducers from './reducers';
// ui presets
import * as Presets from './ui-presets';
// components
import * as Components from './components';
//Utils
import * as Utils from './utils';
import style from './styles/style.scss';
//Enums
import {SidePanelPositions, SidePanelModes, ReservedPresetNames, ReservedPresetAreas} from './reducers/shell';
// Event
import * as Event from './event';
export { Event };
export {EventType as UIEventType} from './event/event-type';

declare const __VERSION__: string;
declare const __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {h} from 'preact';
export {createPortal} from 'preact/compat';
export {preact};
export {redux};
export {preacti18n};
export {preactHooks};

export {style};

export {Reducers, Presets, Components, Utils};

export {Reducers as reducers, Presets as presets, Components as components, Utils as utils};
export {UIManager};
export {VERSION, NAME};

export {SidePanelPositions, SidePanelModes, ReservedPresetNames, ReservedPresetAreas};
export * from './types'
