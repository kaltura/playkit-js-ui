// @flow
import {UIManager} from './ui-manager';
import * as preact from 'preact';
import {EventType} from './event/event-type';
import * as redux from 'react-redux';
import * as preacti18n from 'preact-i18n';
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

export {h} from 'preact';
export {preact};
export {redux};
export {preacti18n};

export {style};

export {Reducers, Presets, Components, Utils};

export {Reducers as reducers, Presets as presets, Components as components, Utils as utils};
export {EventType};
export {UIManager};
export {__VERSION__ as VERSION, __NAME__ as NAME};
