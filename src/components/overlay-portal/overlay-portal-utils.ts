import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

const OVERLAY_PORTAL_SELECTOR = '.overlay-portal';

export const getOverlayPortalElement = (player: KalturaPlayer): Element | null => {
  const targetOverlayEl: HTMLDivElement | Document = (document.getElementById(player.config.targetId) as HTMLDivElement) || document;
  return targetOverlayEl.querySelector(OVERLAY_PORTAL_SELECTOR);
}
