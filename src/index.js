// @flow
import UIManager from './ui-manager'
import * as preact from 'preact';

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';
export {preact};

// ui presets
export * as presets from './ui-presets';
// components
export * as components from './components'

export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
