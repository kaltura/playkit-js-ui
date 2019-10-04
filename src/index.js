// @flow
import {UIManager} from './ui-manager';
import * as preact from 'preact';
import {EventType} from './event/event-type';
import * as redux from 'preact-redux';
// ui reducers
import * as Reducers from './reducers';
// ui presets
import * as Presets from './ui-presets';
// components
import * as Components from './components';
//Utils
import * as Utils from './utils';
import style from './styles/style.scss';
import Portal from 'preact-portal';

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';
export {preact};
export {redux};
export {Portal};

export {style};

export {Reducers, Presets, Components, Utils};

export {Reducers as reducers, Presets as presets, Components as components, Utils as utils};
export {EventType};
export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
