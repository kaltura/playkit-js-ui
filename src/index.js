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

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';
export {preact};
export {redux};


export {Reducers, Presets, Components, Utils};
export {EventType};
export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
