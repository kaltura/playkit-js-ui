// @flow
import UIManager from './ui-manager'
import * as preact from 'preact';

declare var __VERSION__: string;
declare var __NAME__: string;

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

export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
