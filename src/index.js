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

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {VERSION, NAME};

export {h} from 'preact';
export {preact};
export {redux};

export {style};
export {Reducers, Presets, Components, Utils};
export {EventType};
export {UIManager};


