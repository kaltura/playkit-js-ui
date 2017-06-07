// @flow

import {playkit} from 'playkit-js';
import sourcesConfig from '../test/src/configs/sources.json'

let config = sourcesConfig.mp4_none_hls_dash;
config.target = "video-element";
let player = playkit(config);
player.load();

import UIManager from './ui-manager'
let playerUIManager = new UIManager(player);
playerUIManager.buildDefaultUI();
