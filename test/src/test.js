//@flow
import playkit from 'playkit-js';
import UIManager from '../../src/ui-manager';
import sourcesConfig from './configs/sources.json'

let config = sourcesConfig.mp4_none_hls_dash;
config.target = "video-element";

let player = playkit(config);
player.load();

let playerUIManager = new UIManager(player);
playerUIManager.buildDefaultUI();
