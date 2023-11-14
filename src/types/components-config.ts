import {FullscreenConfig} from './fullscreen-config';
import {LogoConfig} from './logo-config';
import {VrStereoConfig} from './vr-stereo-config';
import {SidePanelsConfig} from './side-panels-config';
import {WatermarkConfig} from './watermark-config';

export type ComponentsConfig = {
  seekbar?: any,
  watermark?: WatermarkConfig,
  sidePanels?: SidePanelsConfig,
  vrStereo?: VrStereoConfig,
  logo?: LogoConfig,
  fullscreen?: FullscreenConfig
};
