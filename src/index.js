// @flow
import UIManager from './ui-manager'
import * as preact from 'preact';
import {EventType} from './event/event-type'

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {VERSION, NAME};

export {h} from 'preact';
export {preact};
import * as redux from 'preact-redux';
export {redux}

// ui presets
import * as Presets from './ui-presets';
// components
import * as Components from './components'
//Utils
import * as Utils from './utils'

export {Presets, Components, Utils}
export {EventType};
export {UIManager};


