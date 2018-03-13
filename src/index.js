// @flow
import UIManager from './ui-manager'

declare var __VERSION__: string;
declare var __NAME__: string;

export {h} from 'preact';

// ui presets
export * as presets from './ui-presets';
// components
export * as components from './components'

export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
